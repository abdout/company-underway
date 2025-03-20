'use client';
import { Card } from '@/components/ui/card'
import { CopyButton } from './copy-button'
import { VisualGuide } from './visual-guide'

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
        <h2 className="text-2xl font-semibold pb-2 border-b">Project Structure</h2>
        <p>
          Our project follows a Next.js App Router structure with a clear separation of concerns. Here's how the project is organized:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          {`src/
├── app/                      # Next.js App Router pages
│   └── task/                 # Example: Task feature pages
│       └── page.tsx          # Page component
└── components/               # Reusable components
    └── task/                 # Example: Task feature components
        ├── constant.ts       # Constants and arrays
        ├── type.ts           # TypeScript types and interfaces
        ├── form.tsx          # Form components
        ├── action.ts         # Server actions
        ├── valid.ts          # Validation schemas
        ├── model.ts          # Database schemas
        └── card.tsx          # Card components`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Component Directory Structure</h2>
        <p>Each feature/route in the application follows a consistent structure:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><code className="bg-muted px-1 rounded">constant.ts</code>: Contains arrays and constants used throughout the feature</li>
          <li><code className="bg-muted px-1 rounded">type.ts</code>: Contains TypeScript types and interfaces specific to the feature</li>
          <li><code className="bg-muted px-1 rounded">form.tsx</code>: Form components using:
            <ul className="list-disc pl-6 mt-2">
              <li>Zod for validation</li>
              <li>React Hook Form for form handling</li>
              <li>useActionState for form state management</li>
              <li>Server Actions for form submission</li>
            </ul>
          </li>
          <li><code className="bg-muted px-1 rounded">action.ts</code>: Server actions and API endpoints</li>
          <li><code className="bg-muted px-1 rounded">valid.ts</code>: Validation schemas and utilities</li>
          <li><code className="bg-muted px-1 rounded">model.ts</code>: Database schemas and models</li>
          <li><code className="bg-muted px-1 rounded">card.tsx</code>: Card components and layouts</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Development Guidelines</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Naming Conventions</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Directories</strong>: Use lowercase with hyphens (e.g., <code className="bg-muted px-1 rounded">user-profile/</code>)</li>
              <li><strong>Files</strong>: Use lowercase with hyphens (e.g., <code className="bg-muted px-1 rounded">user-profile-card.tsx</code>)</li>
              <li><strong>Components</strong>: Use PascalCase (e.g., <code className="bg-muted px-1 rounded">UserProfile</code>)</li>
              <li><strong>Functions</strong>: Use PascalCase (e.g., <code className="bg-muted px-1 rounded">HandleSubmit</code>)</li>
              <li><strong>Variables</strong>: Use camelCase (e.g., <code className="bg-muted px-1 rounded">userData</code>)</li>
              <li><strong>CSS Classes</strong>: Use lowercase with hyphens (e.g., <code className="bg-muted px-1 rounded">user-card</code>)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Code Style</h3>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Imports Order:</h4>
              <pre className="overflow-x-auto">
                {`// 1. React and Next.js imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. External library imports
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internal component imports
import { Button } from '@/components/ui/button'

// 4. Type imports
import type { User } from '@/types'`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Getting Started</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Fork the repository</li>
          <li>Create your feature branch (<code className="bg-muted px-1 rounded">git checkout -b feature/amazing-feature</code>)</li>
          <li>Commit your changes using conventional commits</li>
          <li>Push to the branch (<code className="bg-muted px-1 rounded">git push origin feature/amazing-feature</code>)</li>
          <li>Open a Pull Request</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Local Development Setup</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Prerequisites</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js 18.x or later</li>
              <li>pnpm 8.x or later</li>
              <li>Git</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Installation</h3>
            <div className="space-y-4">
              <p>1. Clone the repository:</p>
              <div className="relative">
                <CopyButton text="git clone https://github.com/abdout/company-underway.git\ncd company-underway" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`git clone https://github.com/abdout/company-underway.git
cd company-underway`}
                </pre>
              </div>

              <p>2. Install dependencies:</p>
              <div className="relative">
                <CopyButton text="pnpm install" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`pnpm install`}
                </pre>
              </div>

              <p>3. Set up environment variables:</p>
              <div className="relative">
                <CopyButton text="cp .env.example .env.local" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`cp .env.example .env.local`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground">Update the variables in <code className="bg-muted px-1 rounded">.env.local</code> with your own values.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Running the Project</h3>
            <div className="space-y-4">
              <p>1. Start the development server:</p>
              <div className="relative">
                <CopyButton text="pnpm dev" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`pnpm dev`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground">This will start the development server at <code className="bg-muted px-1 rounded">http://localhost:3000</code></p>

              <p>2. Build the project:</p>
              <div className="relative">
                <CopyButton text="pnpm build" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`pnpm build`}
                </pre>
              </div>

              <p>3. Start the production server:</p>
              <div className="relative">
                <CopyButton text="pnpm start" />
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                  {`pnpm start`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Content Development</h3>
            <p className="mb-2">This project uses Contentlayer for MDX content management. To work with content:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content files are located in the <code className="bg-muted px-1 rounded">content</code> directory</li>
              <li>Use MDX for content files (e.g., <code className="bg-muted px-1 rounded">.mdx</code> extension)</li>
              <li>Content is automatically processed and available in your components</li>
              <li>Run <code className="bg-muted px-1 rounded">pnpm build:docs</code> to build content separately</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Common Issues</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>If you encounter any issues with dependencies, try <code className="bg-muted px-1 rounded">pnpm clean</code> followed by <code className="bg-muted px-1 rounded">pnpm install</code></li>
              <li>For content-related issues, ensure you've run <code className="bg-muted px-1 rounded">pnpm build:docs</code></li>
              <li>Check the <code className="bg-muted px-1 rounded">.env.local</code> file for any missing environment variables</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Commit Messages</h2>
        <p>We follow conventional commits format:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          {`type(scope): description

[optional body]

[optional footer]`}
        </pre>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Types:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><code className="bg-muted px-1 rounded">feat</code>: New feature</li>
            <li><code className="bg-muted px-1 rounded">fix</code>: Bug fix</li>
            <li><code className="bg-muted px-1 rounded">docs</code>: Documentation changes</li>
            <li><code className="bg-muted px-1 rounded">style</code>: Code style changes</li>
            <li><code className="bg-muted px-1 rounded">refactor</code>: Code refactoring</li>
            <li><code className="bg-muted px-1 rounded">test</code>: Adding or updating tests</li>
            <li><code className="bg-muted px-1 rounded">chore</code>: Maintenance tasks</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Questions?</h2>
        <p>If you have any questions, please feel free to open an issue or contact the maintainers.</p>
      </section>

      <VisualGuide />
    </div>
  )
} 