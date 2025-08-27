'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Home, Heart, Clock, BookOpen, Settings } from 'lucide-react'

const navItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: Home,
  },
  {
    href: '/dashboard/favorites',
    label: 'Favorites',
    icon: Heart,
  },
  {
    href: '/dashboard/recent',
    label: 'Recent',
    icon: Clock,
  },
  {
    href: '/courses',
    label: 'Browse Courses',
    icon: BookOpen,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export default function DashboardNav() {
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