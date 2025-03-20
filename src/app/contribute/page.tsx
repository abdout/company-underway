import { Metadata } from 'next'
import { ContributeContent } from '@/components/contribute/content'

export const metadata: Metadata = {
  title: 'Contribute | Company Underway',
  description: 'Learn how to contribute to our project and understand our project structure.',
}

export default function ContributePage() {
  return (
    <div className="container mx-auto py-8">
      <ContributeContent />
    </div>
  )
} 