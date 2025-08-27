import { Suspense } from 'react'
import HeroSection from '@/components/home/hero-section'
import SectionsGrid from '@/components/home/sections-grid'
import WhyChooseUs from '@/components/home/why-choose-us'
import KeyFeatures from '@/components/home/key-features'
import CoursesFeed from '@/components/home/courses-feed'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <SectionsGrid />
      <WhyChooseUs />
      <KeyFeatures />
      <section className="container py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Courses
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Start learning from our newest additions
            </p>
          </div>
          <Suspense fallback={<CourseFeedSkeleton />}>
            <CoursesFeed />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

function CourseFeedSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" />
      ))}
    </div>
  )
}