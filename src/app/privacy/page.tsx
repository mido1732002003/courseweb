import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our commitment to protecting your privacy',
}

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Introduction</h2>
        <p>
          At {APP_NAME}, we take your privacy seriously. This Privacy Policy explains how we 
          collect, use, disclose, and safeguard your information when you use our platform.
        </p>

        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name and email address when you create an account</li>
          <li>Course progress and completion data</li>
          <li>Favorite courses and learning preferences</li>
        </ul>

        <h3>Usage Information</h3>
        <ul>
          <li>Pages visited and features used</li>
          <li>Time spent on courses</li>
          <li>Device and browser information</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Track your learning progress</li>
          <li>Send you updates about new courses (if opted in)</li>
          <li>Improve our platform and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect 
          your personal information against unauthorized access, alteration, disclosure, or 
          destruction.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to provide you 
          with our services and as described in this Privacy Policy.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our platform 
          and store certain information. You can instruct your browser to refuse all cookies 
          or to indicate when a cookie is being sent.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services for analytics and payment processing. These services 
          have their own privacy policies addressing how they use such information.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our platform is not intended for children under 13. We do not knowingly collect 
          personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any 
          changes by posting the new Privacy Policy on this page and updating the "Last 
          updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@example.com
          <br />
          Or visit our <a href="/contact">Contact Page</a>
        </p>
      </div>
    </div>
  )
}