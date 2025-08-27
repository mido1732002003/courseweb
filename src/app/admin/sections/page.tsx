import { getAllSectionsAction } from '@/actions/admin.actions'
import DataTable from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminSectionsPage() {
  const sections = await getAllSectionsAction()

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'order', label: 'Order' },
    { key: '_count.courses', label: 'Courses' },
    { key: '_count.roadmapItems', label: 'Roadmap Items' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Sections</h2>
        <Button asChild>
          <Link href="/admin/sections/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Link>
        </Button>
      </div>

      <DataTable
        data={sections}
        columns={columns}
        searchKey="title"
        editPath="/admin/sections"
      />
    </div>
  )
}