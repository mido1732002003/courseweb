'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, PlayCircle, BookOpen } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function HeroSection() {
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BookOpen className="mr-2 h-4 w-4" />
            100% Free Learning Platform
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Master{' '}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Modern Skills
            </span>{' '}
            at Your Own Pace
          </h1>
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Access high-quality courses in AI, Development, Design, and more.
            Learn from expert-curated content with video lessons and PDF resources.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                <PlayCircle className="mr-2 h-5 w-5" />
                Browse Courses
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Free Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Learning Paths</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </section>
  )
}