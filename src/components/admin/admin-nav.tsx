'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LayoutDashboard, BookOpen, Layers, Map, Users } from 'lucide-react'

const navItems = [
  {
    href: '/admin',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/courses',
    label: 'Courses',
    icon: BookOpen,
  },
  {
    href: '/admin/sections',
    label: 'Sections',
    icon: Layers,
  },
  {
    href: '/admin/roadmaps',
    label: 'Roadmaps',
    icon: Map,
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: Users,
  },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Button
            key={item.href}
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start',
              isActive && 'bg-secondary'
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}