import { PrismaClient, CourseLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'SecureAdminPassword123', 10)
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create sections
  const sections = [
    {
      slug: 'ai',
      title: 'Artificial Intelligence',
      description: 'Learn AI fundamentals, machine learning, and neural networks',
      icon: '🤖',
      order: 1,
    },
    {
      slug: 'frontend',
      title: 'Frontend Development',
      description: 'Master HTML, CSS, JavaScript, React, and modern web frameworks',
      icon: '🎨',
      order: 2,
    },
    {
      slug: 'backend',
      title: 'Backend Development',
      description: 'Build scalable APIs, databases, and server-side applications',
      icon: '⚙️',
      order: 3,
    },
    {
      slug: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Create beautiful, user-friendly interfaces and experiences',
      icon: '✨',
      order: 4,
    },
    {
      slug: 'graphic-design',
      title: 'Graphic Design',
      description: 'Design stunning visuals, logos, and brand identities',
      icon: '🎯',
      order: 5,
    },
    {
      slug: 'machine-learning',
      title: 'Machine Learning',
      description: 'Explore algorithms, data science, and predictive modeling',
      icon: '🧠',
      order: 6,
    },
    {
      slug: 'deep-learning',
      title: 'Deep Learning',
      description: 'Dive into neural networks, computer vision, and NLP',
      icon: '🔬',
      order: 7,
    },
  ]

  const createdSections = []
  for (const section of sections) {
    const created = await prisma.section.upsert({
      where: { slug: section.slug },
      update: section,
      create: section,
    })
    createdSections.push(created)
    console.log('Created section:', created.title)
  }

  // Create sample roadmap items
  const roadmapItems = [
    // AI Roadmap
    {
      sectionId: createdSections[0].id,
      title: 'Introduction to AI',
      description: 'Understanding the basics of artificial intelligence',
      order: 1,
      url: 'https://example.com/ai-intro',
    },
    {
      sectionId: createdSections[0].id,
      title: 'Machine Learning Fundamentals',
      description: 'Core concepts of ML algorithms',
      order: 2,
    },
    {
      sectionId: createdSections[0].id,
      title: 'Neural Networks',
      description: 'Building your first neural network',
      order: 3,
    },
    // Frontend Roadmap
    {
      sectionId: createdSections[1].id,
      title: 'HTML & CSS Basics',
      description: 'Foundation of web development',
      order: 1,
    },
    {
      sectionId: createdSections[1].id,
      title: 'JavaScript Essentials',
      description: 'Programming for the web',
      order: 2,
    },
    {
      sectionId: createdSections[1].id,
      title: 'React Framework',
      description: 'Modern UI development with React',
      order: 3,
    },
  ]

  for (const item of roadmapItems) {
    await prisma.roadmapItem.create({ data: item })
  }
  console.log('Created roadmap items')

  // Create sample courses
  const courses = [
    {
      sectionId: createdSections[0].id,
      title: 'AI Fundamentals: A Complete Introduction',
      slug: 'ai-fundamentals-complete-introduction',
      description: 'Learn the core concepts of artificial intelligence from scratch. This comprehensive course covers everything from basic principles to practical applications.',
      level: CourseLevel.BEGINNER,
      duration: 180,
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      isPublished: true,
    },
    {
      sectionId: createdSections[0].id,
      title: 'Advanced Machine Learning Techniques',
      slug: 'advanced-machine-learning-techniques',
      description: 'Deep dive into advanced ML algorithms and their real-world applications.',
      level: CourseLevel.ADVANCED,
      duration: 240,
      thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
      videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
      isPublished: true,
    },
    {
      sectionId: createdSections[1].id,
      title: 'React.js Complete Guide',
      slug: 'reactjs-complete-guide',
      description: 'Master React.js from basics to advanced concepts including hooks, context, and performance optimization.',
      level: CourseLevel.INTERMEDIATE,
      duration: 360,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      isPublished: true,
    },
    {
      sectionId: createdSections[1].id,
      title: 'CSS Mastery: Modern Layouts',
      slug: 'css-mastery-modern-layouts',
      description: 'Learn modern CSS techniques including Grid, Flexbox, and responsive design.',
      level: CourseLevel.BEGINNER,
      duration: 150,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      isPublished: true,
    },
    {
      sectionId: createdSections[2].id,
      title: 'Node.js and Express API Development',
      slug: 'nodejs-express-api-development',
      description: 'Build robust REST APIs with Node.js, Express, and MongoDB.',
      level: CourseLevel.INTERMEDIATE,
      duration: 300,
      thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
      videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
      isPublished: true,
    },
    {
      sectionId: createdSections[3].id,
      title: 'UI/UX Design Principles',
      slug: 'ui-ux-design-principles',
      description: 'Essential design principles for creating user-friendly interfaces.',
      level: CourseLevel.BEGINNER,
      duration: 120,
      thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      isPublished: true,
    },
  ]

  for (const course of courses) {
    await prisma.course.create({ data: course })
  }
  console.log('Created sample courses')

  // Create a test user
  const userPassword = await bcrypt.hash('TestUser123!', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      passwordHash: userPassword,
      name: 'Test User',
      role: 'USER',
    },
  })
  console.log('Created test user:', testUser.email)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })