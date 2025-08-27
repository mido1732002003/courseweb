import { getAllRoadmapsAction } from '@/actions/admin.actions'
import DataTable from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function AdminRoadmapsPage() {
  const roadmaps = await getAllRoadmapsAction()

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'section.title', label: 'Section' },
    { key: 'order', label: 'Order' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Roadmaps</h2>
        <Button asChild>
          <Link href="/admin/roadmaps/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Roadmap Item
          </Link>
        </Button>
      </div>

      <DataTable
        data={roadmaps}
        columns={columns}
        searchKey="title"
        editPath="/admin/roadmaps"
      />
    </div>
  )
}