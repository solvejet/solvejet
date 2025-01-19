// src/components/layout/mega-menus/industries-menu.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { MenuProps } from '@/types/mega-menu'
import { menuData } from '@/data/menu-data'
import { MenuContainer } from './components/menu-container'
import { MenuCard } from './components/menu-item'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Building2,
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Award,
} from 'lucide-react'

const FeaturedProject = () => (
  <div className="relative overflow-hidden rounded-lg border">
    <div className="p-6">
      <Badge className="mb-4 bg-primary/10 text-primary">
        Featured Project
      </Badge>
      <h4 className="text-lg font-medium">Real Estate Platform</h4>
      <p className="mt-2 text-sm text-muted-foreground">
        AI-powered property matching platform serving 100K+ users
      </p>
      <div className="mt-4 flex gap-4">
        <div>
          <p className="text-2xl font-bold text-primary">2.5M</p>
          <p className="text-sm text-muted-foreground">Properties Listed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">98%</p>
          <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
        </div>
      </div>
      <Button variant="outline" className="mt-4">
        View Case Study
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
)

export const IndustriesMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <MenuContainer isOpen={isOpen} onClose={onClose}>
      <div className="w-full py-8">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Industries */}
            <div className="col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Industries We Serve
                  </h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  5+ Years Experience
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {menuData.industries.map((item, index) => (
                  <div key={item.href} className="group space-y-2">
                    <MenuCard
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      icon={item.icon}
                      index={index}
                    />
                    {item.stats && (
                      <div className="ml-11 grid grid-cols-2 gap-4 rounded-lg bg-accent/50 p-3">
                        {item.stats.map((stat) => (
                          <div key={stat.label}>
                            <p className="text-sm font-medium text-primary">
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Featured & Stats */}
            <div className="col-span-5 space-y-6">
              <FeaturedProject />

              {/* Industry Recognition */}
              <div className="rounded-lg border bg-accent/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium">Industry Recognition</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Market Leader</p>
                      <p className="text-sm text-muted-foreground">
                        Gartner Magic Quadrant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">500+ Enterprises</p>
                      <p className="text-sm text-muted-foreground">
                        Trust Our Solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Presence */}
              <Link
                href="/about/global-presence"
                className="group flex items-center justify-between rounded-lg border bg-accent/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium group-hover:text-primary">
                      Global Presence
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Operating in 20+ countries
                    </p>
                  </div>
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
