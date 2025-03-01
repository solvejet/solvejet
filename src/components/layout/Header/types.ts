// src/components/layout/Header/types.ts
import type { ReactNode } from 'react';

export interface MegaMenuItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
}

export interface NavItem {
  name: string;
  href: string;
  megaMenu?: {
    title?: string;
    description?: string;
    columns: {
      title: string;
      items: MegaMenuItem[];
    }[];
  };
  current?: boolean;
}
