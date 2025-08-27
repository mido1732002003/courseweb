import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SECTIONS } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function SectionsGrid() {
  return (
    <section className="container py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Learning Paths
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Choose your journey and start mastering new skills today
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map((section) => (
            <Link key={section.slug} href={`/sections/${section.slug}`}>
              <Card className="group h-full transition-all hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="mb-2 text-4xl">{section.icon}</div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {section.description}
                  </CardDescription>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Explore Path
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/sections">View All Sections</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}