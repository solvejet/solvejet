// src/components/layout/mega-menus/company-menu.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { MenuProps } from '@/types/mega-menu'
import { menuData } from '@/data/menu-data'
import { MenuContainer } from './components/menu-container'
import { MenuCard } from './components/menu-item'
import { Badge } from '@/components/ui/badge'
import {
  Building,
  ArrowRight,
  Mail,
  Users,
  GraduationCap,
  Award,
  Globe,
  BarChart3,
  BookOpen,
  Calendar,
} from 'lucide-react'

const CompanyHighlight = () => (
  <div className="rounded-lg border bg-accent/50 p-6">
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Award className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-medium">Company Highlights</h4>
      </div>
      <Badge className="bg-primary/10 text-primary">2024</Badge>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">Global Presence</p>
        </div>
        <p className="text-2xl font-bold text-primary">20+</p>
        <p className="text-sm text-muted-foreground">Countries</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">Team Size</p>
        </div>
        <p className="text-2xl font-bold text-primary">500+</p>
        <p className="text-sm text-muted-foreground">Employees</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">Growth</p>
        </div>
        <p className="text-2xl font-bold text-primary">127%</p>
        <p className="text-sm text-muted-foreground">YoY Revenue</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium">Learning</p>
        </div>
        <p className="text-2xl font-bold text-primary">50+</p>
        <p className="text-sm text-muted-foreground">Training Programs</p>
      </div>
    </div>
  </div>
)

const LatestNews = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-medium">Latest News</h4>
      </div>
      <Link
        href="/news"
        className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        View All
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
    <div className="space-y-4">
      <div className="group space-y-2 rounded-lg border p-4 transition-colors hover:bg-accent/50">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Press Release</Badge>
          <span className="text-xs text-muted-foreground">2 days ago</span>
        </div>
        <h5 className="font-medium group-hover:text-primary">
          SolveJet Expands Operations to Singapore
        </h5>
        <p className="text-sm text-muted-foreground">
          Strengthening our presence in the APAC region
        </p>
      </div>
      <div className="group space-y-2 rounded-lg border p-4 transition-colors hover:bg-accent/50">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Award</Badge>
          <span className="text-xs text-muted-foreground">1 week ago</span>
        </div>
        <h5 className="font-medium group-hover:text-primary">
          Recognized as Top Tech Consultancy 2024
        </h5>
        <p className="text-sm text-muted-foreground">
          Leading industry recognition for excellence
        </p>
      </div>
    </div>
  </div>
)

const QuickLinks = () => (
  <div className="grid grid-cols-2 gap-4">
    <Link
      href="/careers"
      className="group flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50"
    >
      <Calendar className="h-5 w-5 text-primary" />
      <div>
        <p className="font-medium group-hover:text-primary">Careers Fair</p>
        <p className="text-sm text-muted-foreground">Join our next event</p>
      </div>
    </Link>
    <Link
      href="/contact"
      className="group flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50"
    >
      <Mail className="h-5 w-5 text-primary" />
      <div>
        <p className="font-medium group-hover:text-primary">Contact Us</p>
        <p className="text-sm text-muted-foreground">Get in touch</p>
      </div>
    </Link>
  </div>
)

export const CompanyMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <MenuContainer isOpen={isOpen} onClose={onClose}>
      <div className="w-full py-8">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Main Links */}
            <div className="col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  About Us
                </h3>
              </div>

              <div className="grid gap-4">
                {menuData.company.map((item, index) => (
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

              <QuickLinks />
            </div>

            {/* Right Column - Company Info & News */}
            <div className="col-span-7 space-y-6">
              <CompanyHighlight />
              <LatestNews />
            </div>
          </div>
        </div>
      </div>
    </MenuContainer>
  )
}
