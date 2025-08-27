import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our mission to democratize education',
}

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">About {APP_NAME}</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground">
            We believe that quality education should be accessible to everyone, everywhere.
          </p>

          <Card className="my-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                To provide free, high-quality educational content that empowers individuals 
                to learn new skills, advance their careers, and achieve their goals without 
                financial barriers.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="space-y-2">
            <li>Comprehensive courses in technology, design, and data science</li>
            <li>Video lessons and downloadable PDF materials</li>
            <li>Structured learning paths with roadmaps</li>
            <li>Progress tracking to monitor your learning journey</li>
            <li>Certificate of completion for finished courses</li>
            <li>Community support and discussion forums</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <div className="grid gap-4 sm:grid-cols-2 my-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">🌍 Accessibility</h3>
                <p className="text-sm">Education without borders or barriers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">✨ Quality</h3>
                <p className="text-sm">Expert-curated content that matters</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">🚀 Innovation</h3>
                <p className="text-sm">Modern learning for modern skills</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">👥 Community</h3>
                <p className="text-sm">Learn together, grow together</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Journey</h2>
          <p>
            Whether you're starting your career, switching fields, or simply curious to learn 
            something new, we're here to support your educational journey. Join thousands of 
            learners who are already transforming their lives through free education.
          </p>

          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}