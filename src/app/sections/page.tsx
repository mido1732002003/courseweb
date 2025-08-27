import { getSectionsAction } from '@/actions/section.actions'
import SectionCard from '@/components/section/section-card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Sections',
  description: 'Explore our comprehensive learning paths across different domains',
}

export default async function SectionsPage() {
  const sections = await getSectionsAction()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Learning Sections</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Choose your path and start mastering new skills with structured roadmaps
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}