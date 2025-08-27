import { 
  cn, 
  formatDate, 
  formatDuration, 
  slugify, 
  truncate,
  getInitials,
  isValidUrl,
  generatePaginationPages
} from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500', 'text-green-500')
      expect(result).toBe('bg-blue-500 text-green-500')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'conditional', 'always')
      expect(result).toBe('base always')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15')
      const result = formatDate(date)
      expect(result).toContain('January')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })
  })

  describe('formatDuration', () => {
    it('should format minutes to hours and minutes', () => {
      expect(formatDuration(30)).toBe('30m')
      expect(formatDuration(60)).toBe('1h')
      expect(formatDuration(90)).toBe('1h 30m')
      expect(formatDuration(120)).toBe('2h')
    })
  })

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Test 123!')).toBe('test-123')
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
    })
  })

  describe('truncate', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs to be truncated'
      expect(truncate(text, 20)).toBe('This is a very long...')
      expect(truncate('Short', 20)).toBe('Short')
    })
  })

  describe('getInitials', () => {
    it('should get initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD')
      expect(getInitials('Alice')).toBe('A')
      expect(getInitials('Bob Smith Jones')).toBe('BS')
    })
  })

  describe('isValidUrl', () => {
    it('should validate URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://localhost:3000')).toBe(true)
      expect(isValidUrl('not a url')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
    })
  })

  describe('generatePaginationPages', () => {
    it('should generate pagination pages', () => {
      expect(generatePaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5])
      expect(generatePaginationPages(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
      expect(generatePaginationPages(1, 10)).toEqual([1, 2, 3, 4, '...', 10])
      expect(generatePaginationPages(10, 10)).toEqual([1, '...', 7, 8, 9, 10])
    })
  })
})