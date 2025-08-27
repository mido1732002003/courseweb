'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { debounce } from '@/lib/utils'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')

  const handleSearch = React.useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        router.push(`/courses?search=${encodeURIComponent(searchQuery)}`)
      }
    }, 500),
    [router]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/courses?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search courses..."
        className="pl-8"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          handleSearch(e.target.value)
        }}
      />
    </form>
  )
}