// src/components/layout/mega-menus/what-we-do-menu.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { MenuProps } from '@/types/mega-menu'
import { menuData } from '@/data/menu-data'
import { MenuContainer } from './components/menu-container'
import { MenuCard } from './components/menu-item'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Trophy, Users, Clock } from 'lucide-react'

export const WhatWeDoMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <MenuContainer isOpen={isOpen} onClose={onClose}>
      <div className="w-full py-8">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Services */}
            <div className="col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Our Services
                </h3>
                <Badge variant="secondary" className="text-xs">
                  Enterprise Ready
                </Badge>
              </div>

              <div className="grid gap-4">
                {menuData.whatWeDo.services.map((service, index) => (
                  <MenuCard
                    key={service.href}
                    title={service.title}
                    description={service.description}
                    href={service.href}
                    icon={service.icon}
                    index={index}
                  />
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border bg-accent/50 p-4">
                <div className="text-center">
                  <Users className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-sm font-medium">500+ Clients</p>
                </div>
                <div className="text-center">
                  <Trophy className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-sm font-medium">98% Success</p>
                </div>
                <div className="text-center">
                  <Clock className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-sm font-medium">24/7 Support</p>
                </div>
              </div>
            </div>

            {/* Right Column - Platform & Featured */}
            <div className="col-span-7 space-y-8">
              {/* Platform Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Platform Expertise
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {menuData.whatWeDo.expertise.map((item, index) => (
                    <MenuCard
                      key={item.href}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      icon={item.icon}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Case Study */}
              <div className="rounded-lg border bg-accent/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-medium">Featured Case Study</h4>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    New
                  </Badge>
                </div>
                <p className="text-lg font-medium leading-tight">
                  How we helped TechCorp achieve 300% growth in 6 months
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learn how our strategic consulting and custom development
                  solutions transformed TechCorp&apos;s digital presence.
                </p>
                <Link
                  href="/case-studies/techcorp"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Read Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MenuContainer>
  )
}
