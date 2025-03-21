import { Metadata } from 'next'
import { InstallationContent } from '@/components/contribute/installation-content'

export const metadata: Metadata = {
  title: 'Installation Guide | Company Underway',
  description: 'Learn how to set up the project for local development.',
}

export default function InstallationPage() {
  return (
    <div className="container mx-auto py-8">
      <InstallationContent />
    </div>
  )
}
