'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import type { RoadmapItem } from '@/types'
import { cn } from '@/lib/utils'

interface RoadmapListProps {
  items: RoadmapItem[]
}

export default function RoadmapList({ items }: RoadmapListProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(item.id)
        
        return (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className="flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex-shrink-0 pt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.description && !isExpanded && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpand(item.id)
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-4 pb-4 pl-16">
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                  )}
                  {item.content && (
                    <div className="prose prose-sm dark:prose-invert max-w-none mb-3">
                      {item.content}
                    </div>
                  )}
                  {item.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      asChild
                    >
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Learn More
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}