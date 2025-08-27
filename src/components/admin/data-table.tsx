'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Edit, Trash, Search } from 'lucide-react'

interface DataTableProps {
  data: any[]
  columns: { key: string; label: string }[]
  searchKey?: string
  editPath?: string
  onDelete?: (id: string) => void
}

export default function DataTable({
  data,
  columns,
  searchKey = 'title',
  editPath,
  onDelete,
}: DataTableProps) {
  const [search, setSearch] = useState('')

  const filteredData = data.filter((item) => {
    if (!search) return true
    const value = getNestedValue(item, searchKey)
    return value?.toString().toLowerCase().includes(search.toLowerCase())
  })

  function getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  return (
    <Card>
      <div className="p-4 border-b">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left p-4 font-medium text-muted-foreground"
                >
                  {column.label}
                </th>
              ))}
              <th className="text-left p-4 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b">
                {columns.map((column) => (
                  <td key={column.key} className="p-4">
                    {getNestedValue(item, column.key)?.toString() || '-'}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {editPath && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`${editPath}/${item.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No results found
          </div>
        )}
      </div>
    </Card>
  )
}