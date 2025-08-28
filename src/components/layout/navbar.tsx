'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { MobileNav } from '@/components/layout/mobile-nav'
import { SearchBar } from '@/components/shared/search-bar'
import { useAuth } from '@/hooks/use-auth'
import { BookOpen, User } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/sections', label: 'Sections' },
    { href: '/courses', label: 'Courses' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 overflow-x-hidden">
        <div className="mr-4 flex items-center space-x-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">{APP_NAME}</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden sm:block w-full sm:w-48 md:w-64">
            <SearchBar />
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </>
            )}
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}