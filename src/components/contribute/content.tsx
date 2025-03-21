'use client';
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function ContributeContent() {
  return (
    <div className="space-y-12 px-8 md:px-16 lg:px-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Contributing Guide</h1>
        <p className="text-muted-foreground">
          Thank you for your interest in contributing to our project! This guide will help you understand our project structure and contribution guidelines.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-md transition-all">
            <Link href="/contribute/installation" className="block space-y-2">
              <h3 className="text-xl font-semibold">Installation Guide</h3>
              <p className="text-muted-foreground">
                Learn how to set up the project for local development, including prerequisites, installation steps, and common issues.
              </p>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-md transition-all">
            <Link href="/contribute/architecture" className="block space-y-2">
              <h3 className="text-xl font-semibold">Project Architecture</h3>
              <p className="text-muted-foreground">
                Understand the project structure, component organization, and development guidelines.
              </p>
            </Link>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Contribution Process</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Fork the repository</li>
          <li>Create your feature branch (<code className="bg-muted px-1 rounded">git checkout -b feature/amazing-feature</code>)</li>
          <li>Commit your changes using conventional commits</li>
          <li>Push to the branch (<code className="bg-muted px-1 rounded">git push origin feature/amazing-feature</code>)</li>
          <li>Open a Pull Request</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Questions?</h2>
        <p>If you have any questions, please feel free to open an issue or contact the maintainers.</p>
      </section>
    </div>
  )
} 