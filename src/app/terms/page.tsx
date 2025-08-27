import { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our platform',
}

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Effective date: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using {APP_NAME}, you accept and agree to be bound by the terms 
          and provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access the materials (courses, videos, PDFs) 
          on {APP_NAME} for personal, non-commercial transitory viewing only.
        </p>
        <p>Under this license you may not:</p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for commercial purposes</li>
          <li>Attempt to reverse engineer any software</li>
          <li>Remove any copyright or proprietary notations</li>
        </ul>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features, you must register for an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your password</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>

        <h2>4. Course Content</h2>
        <p>
          All course content is provided "as is" for educational purposes. While we strive 
          for accuracy, we make no warranties about the completeness, reliability, or 
          accuracy of this information.
        </p>

        <h2>5. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Violate any laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Transmit malicious code or viruses</li>
          <li>Harass or harm other users</li>
          <li>Attempt to gain unauthorized access</li>
          <li>Use automated systems to access the platform</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on {APP_NAME} including text, graphics, logos, images, audio clips, 
          and software, is the property of {APP_NAME} or its content suppliers and is 
          protected by international copyright laws.
        </p>

        <h2>7. Certificates</h2>
        <p>
          Certificates of completion are awarded based on course completion criteria. 
          These certificates are for personal use and do not constitute professional 
          certification or accreditation.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your use of our platform is also governed by our Privacy Policy. Please review 
          our <a href="/privacy">Privacy Policy</a>, which also governs the site and 
          informs users of our data collection practices.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the platform 
          immediately, without prior notice or liability, under our sole discretion, 
          for any reason whatsoever.
        </p>

        <h2>10. Disclaimer</h2>
        <p>
          The materials on {APP_NAME} are provided on an 'as is' basis. {APP_NAME} makes 
          no warranties, expressed or implied, and hereby disclaims and negates all other 
          warranties including, without limitation, implied warranties or conditions of 
          merchantability, fitness for a particular purpose, or non-infringement.
        </p>

        <h2>11. Limitation of Liability</h2>
        <p>
          In no event shall {APP_NAME} or its suppliers be liable for any damages arising 
          out of the use or inability to use the materials on {APP_NAME}, even if {APP_NAME} 
          or an authorized representative has been notified orally or in writing of the 
          possibility of such damage.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of 
          any changes by posting the new Terms of Service on this page.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the 
          laws of the jurisdiction in which {APP_NAME} operates.
        </p>

        <h2>14. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
          <br />
          Email: legal@example.com
          <br />
          Or visit our <a href="/contact">Contact Page</a>
        </p>
      </div>
    </div>
  )
}