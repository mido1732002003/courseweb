import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import type { Section } from '@/types'

interface SectionCardProps {
  section: Section & {
    _count?: {
      courses: number
    }
  }
}

export default function SectionCard({ section }: SectionCardProps) {
  return (
    <Link href={`/sections/${section.slug}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:scale-105">
        <CardHeader>
          <div className="mb-2 text-4xl">{section.icon}</div>
          <CardTitle className="text-xl">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {section.description}
          </CardDescription>
          {section._count && (
            <Badge variant="secondary" className="mb-3">
              {section._count.courses} Courses
            </Badge>
          )}
          <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
            Explore Section
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}