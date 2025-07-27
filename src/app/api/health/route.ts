// src/app/api/health/route.ts
import {  NextResponse } from "next/server";

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  environment: string | undefined;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
}

export async function GET(): Promise<NextResponse<HealthData>> {
  const healthData: HealthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "1.0.0",
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Type": "application/json",
    },
  });
}
