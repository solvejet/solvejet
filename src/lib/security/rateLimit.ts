// src/lib/security/rateLimit.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
  headers?: boolean;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
}

interface RateLimitInfo {
  limit: number;
  current: number;
  remaining: number;
  resetTime: Date;
}

interface StoreEntry {
  count: number;
  resetTime: number;
}

type RateLimitStore = Record<string, StoreEntry>;

class RateLimit {
  private store: RateLimitStore = {};
  private readonly config: Required<RateLimitConfig>;
  private cleanupInterval: NodeJS.Timeout;

  constructor(options: RateLimitConfig) {
    this.config = {
      windowMs: options.windowMs,
      max: options.max,
      message: options.message ?? 'Too many requests, please try again later.',
      statusCode: options.statusCode ?? 429,
      headers: options.headers ?? true,
      skipFailedRequests: options.skipFailedRequests ?? false,
      skipSuccessfulRequests: options.skipSuccessfulRequests ?? false,
    };

    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.config.windowMs);
  }

  private cleanup(): void {
    const now = Date.now();
    const newStore: RateLimitStore = {};

    Object.entries(this.store).forEach(([key, value]) => {
      if (value.resetTime >= now) {
        newStore[key] = value;
      }
    });

    this.store = newStore;
  }

  private getClientIp(req: NextApiRequest): string {
    let forwardedFor: string | undefined;

    const header = req.headers['x-forwarded-for'];
    if (Array.isArray(header)) {
      forwardedFor = header[0];
    } else if (typeof header === 'string') {
      forwardedFor = header.split(',')[0]?.trim();
    }

    return forwardedFor ?? req.socket.remoteAddress ?? 'unknown';
  }

  private getRequestKey(req: NextApiRequest): string {
    const components = [
      this.getClientIp(req),
      String(req.method ?? 'UNKNOWN'),
      String(req.url ?? '/'),
    ];

    return components.join(':');
  }

  private getOrCreateStoreEntry(key: string, now: number): StoreEntry {
    const existingEntry = this.store[key];

    if (!existingEntry || existingEntry.resetTime < now) {
      const newEntry: StoreEntry = {
        count: 0,
        resetTime: now + this.config.windowMs,
      };
      this.store[key] = newEntry;
      return newEntry;
    }

    return existingEntry;
  }

  private getRequestInfo(key: string): RateLimitInfo {
    const now = Date.now();
    const entry = this.getOrCreateStoreEntry(key, now);

    return {
      limit: this.config.max,
      current: entry.count,
      remaining: Math.max(0, this.config.max - entry.count),
      resetTime: new Date(now + this.config.windowMs),
    };
  }

  private setResponseHeaders(res: NextApiResponse, info: RateLimitInfo): void {
    if (!this.config.headers) {
      return;
    }

    const headers = {
      'X-RateLimit-Limit': String(info.limit),
      'X-RateLimit-Remaining': String(info.remaining),
      'X-RateLimit-Reset': String(info.resetTime.getTime()),
    };

    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
  }

  private updateCount(key: string, increment: boolean): void {
    const entry = this.store[key];
    if (!entry) {
      return;
    }

    if (increment) {
      entry.count += 1;
    } else {
      entry.count = Math.max(0, entry.count - 1);
    }
  }

  public middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ): Promise<void> => {
    const key = this.getRequestKey(req);
    const info = this.getRequestInfo(key);

    this.setResponseHeaders(res, info);

    if (info.current >= this.config.max) {
      res.status(this.config.statusCode).json({
        error: this.config.message,
        retryAfter: Math.ceil((info.resetTime.getTime() - Date.now()) / 1000),
      });
      return;
    }

    this.updateCount(key, true);

    const originalEnd = res.end.bind(res);

    res.end = ((...args: Parameters<typeof res.end>) => {
      const statusCode = res.statusCode;
      const shouldCount =
        (!this.config.skipFailedRequests || statusCode < 400) &&
        (!this.config.skipSuccessfulRequests || statusCode >= 400);

      if (!shouldCount) {
        this.updateCount(key, false);
      }

      return originalEnd(...args);
    }) as typeof res.end;

    await next();
  };

  public destroy(): void {
    clearInterval(this.cleanupInterval);
  }
}

export const defaultRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  headers: true,
});

export const createRateLimit = (config: RateLimitConfig): RateLimit => {
  return new RateLimit(config);
};

export type { RateLimitConfig, RateLimitInfo };
