import { getAllCoursesAction } from '@/actions/admin.actions'
import DataTable from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAction()

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'section.title', label: 'Section' },
    { key: 'level', label: 'Level' },
    { key: 'isPublished', label: 'Published' },
    { key: '_count.favorites', label: 'Favorites' },
    { key: 'viewCount', label: 'Views' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <DataTable
        data={courses}
        columns={columns}
        searchKey="title"
        editPath="/admin/courses"
      />
    </div>
  )
}