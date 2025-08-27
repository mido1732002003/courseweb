'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { SECTIONS, COURSE_LEVELS } from '@/lib/constants'
import { X } from 'lucide-react'

export default function CourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentSection = searchParams.get('section') || ''
  const currentLevel = searchParams.get('level') || ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/courses?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/courses')
  }

  const hasFilters = currentSection || currentLevel

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Section</Label>
          <RadioGroup
            value={currentSection}
            onValueChange={(value) => updateFilter('section', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-sections" />
                <Label htmlFor="all-sections" className="font-normal cursor-pointer">
                  All Sections
                </Label>
              </div>
              {SECTIONS.map((section) => (
                <div key={section.slug} className="flex items-center space-x-2">
                  <RadioGroupItem value={section.slug} id={section.slug} />
                  <Label htmlFor={section.slug} className="font-normal cursor-pointer">
                    {section.title}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-medium mb-3 block">Level</Label>
          <RadioGroup
            value={currentLevel}
            onValueChange={(value) => updateFilter('level', value)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-levels" />
                <Label htmlFor="all-levels" className="font-normal cursor-pointer">
                  All Levels
                </Label>
              </div>
              {COURSE_LEVELS.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <Label htmlFor={level.value} className="font-normal cursor-pointer">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}