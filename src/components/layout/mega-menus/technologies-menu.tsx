// src/components/layout/mega-menus/technologies-menu.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { MenuProps } from '@/types/mega-menu'
import { menuData } from '@/data/menu-data'
import { MenuContainer } from './components/menu-container'
import { MenuCard } from './components/menu-item'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Code2, Cpu, Server } from 'lucide-react'

export const TechnologiesMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <MenuContainer isOpen={isOpen} onClose={onClose}>
      <div className="w-full py-8">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Technology Stack - Left Column */}
            <div className="col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Technology Stack
                  </h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Updated 2024
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {menuData.technologies.map((item, index) => (
                  <div key={item.href} className="space-y-4">
                    <MenuCard
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      icon={item.icon}
                      index={index}
                    />
                    {item.subtitle && (
                      <div className="ml-11 flex flex-wrap gap-2">
                        {item.subtitle.split('•').map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-accent/50"
                          >
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Resources & Updates */}
            <div className="col-span-4 space-y-8">
              {/* Latest Updates */}
              <div className="space-y-6 rounded-lg border bg-accent/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-medium">Latest Updates</h4>
                  </div>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    New
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="group space-y-1">
                    <Badge variant="outline" className="mb-1">
                      Release
                    </Badge>
                    <h5 className="font-medium group-hover:text-primary">
                      Next.js 14 Integration Complete
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Faster builds, better DX, improved performance
                    </p>
                  </div>

                  <div className="group space-y-1">
                    <Badge variant="outline" className="mb-1">
                      Update
                    </Badge>
                    <h5 className="font-medium group-hover:text-primary">
                      AI Development Tools
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      New AI capabilities in our development workflow
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-accent/50 p-4 text-center">
                  <Cpu className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime SLA</p>
                </div>
                <div className="rounded-lg border bg-accent/50 p-4 text-center">
                  <Server className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold">5M+</p>
                  <p className="text-sm text-muted-foreground">API Calls/Day</p>
                </div>
              </div>

              {/* Documentation Link */}
              <Link
                href="/docs"
                className="group flex items-center justify-between rounded-lg border bg-accent/50 p-4"
              >
                <div className="space-y-1">
                  <h4 className="font-medium group-hover:text-primary">
                    Technical Documentation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Explore our detailed tech guides
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MenuContainer>
  )
}
