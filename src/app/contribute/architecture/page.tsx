import { Metadata } from 'next'
import { ArchitectureContent } from '@/components/contribute/architecture-content'

export const metadata: Metadata = {
  title: 'Project Architecture | Company Underway',
  description: 'Understand the project structure and development guidelines.',
}

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto py-8">
      <ArchitectureContent />
    </div>
  )
}
