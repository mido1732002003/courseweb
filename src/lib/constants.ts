export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Modern Courses Platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const APP_DESCRIPTION = 'Free, modern courses platform with video and PDF content for AI, Frontend, Backend, UI/UX, and more.'

export const SECTIONS = [
  {
    id: 'ai',
    slug: 'ai',
    title: 'Artificial Intelligence',
    icon: '🤖',
    description: 'Learn AI fundamentals, machine learning, and neural networks',
    color: 'from-purple-600 to-blue-600',
  },
  {
    id: 'frontend',
    slug: 'frontend',
    title: 'Frontend Development',
    icon: '🎨',
    description: 'Master HTML, CSS, JavaScript, React, and modern web frameworks',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'backend',
    slug: 'backend',
    title: 'Backend Development',
    icon: '⚙️',
    description: 'Build scalable APIs, databases, and server-side applications',
    color: 'from-green-600 to-emerald-600',
  },
  {
    id: 'uiux',
    slug: 'ui-ux',
    title: 'UI/UX Design',
    icon: '✨',
    description: 'Create beautiful, user-friendly interfaces and experiences',
    color: 'from-pink-600 to-rose-600',
  },
  {
    id: 'graphic',
    slug: 'graphic-design',
    title: 'Graphic Design',
    icon: '🎯',
    description: 'Design stunning visuals, logos, and brand identities',
    color: 'from-orange-600 to-red-600',
  },
  {
    id: 'ml',
    slug: 'machine-learning',
    title: 'Machine Learning',
    icon: '🧠',
    description: 'Explore algorithms, data science, and predictive modeling',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'dl',
    slug: 'deep-learning',
    title: 'Deep Learning',
    icon: '🔬',
    description: 'Dive into neural networks, computer vision, and NLP',
    color: 'from-violet-600 to-indigo-600',
  },
] as const

export const COURSE_LEVELS = [
  { value: 'BEGINNER', label: 'Beginner', color: 'bg-green-500' },
  { value: 'INTERMEDIATE', label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 'ADVANCED', label: 'Advanced', color: 'bg-red-500' },
] as const

export const ITEMS_PER_PAGE = 12
export const INFINITE_SCROLL_THRESHOLD = 0.8

export const WHY_CHOOSE_US = [
  {
    icon: '🎓',
    title: 'Expert-Curated Content',
    description: 'Learn from industry professionals and experienced educators',
  },
  {
    icon: '💰',
    title: '100% Free Forever',
    description: 'No hidden fees, subscriptions, or paywalls - ever',
  },
  {
    icon: '📱',
    title: 'Learn Anywhere',
    description: 'Access courses on any device, anytime, anywhere',
  },
  {
    icon: '🚀',
    title: 'Career-Focused',
    description: 'Practical skills that employers actually want',
  },
  {
    icon: '👥',
    title: 'Community Support',
    description: 'Join thousands of learners on the same journey',
  },
  {
    icon: '📈',
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics',
  },
]

export const KEY_FEATURES = [
  {
    icon: '📹',
    title: 'HD Video Content',
    description: 'High-quality video lessons with clear explanations',
  },
  {
    icon: '📄',
    title: 'PDF Resources',
    description: 'Downloadable materials for offline learning',
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmaps',
    description: 'Structured paths to guide your learning journey',
  },
  {
    icon: '⭐',
    title: 'Save Favorites',
    description: 'Bookmark courses for quick access later',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'See how far you have come in each course',
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    description: 'Find exactly what you need with powerful filters',
  },
]