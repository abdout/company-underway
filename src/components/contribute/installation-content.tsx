'use client';
import { CopyButton } from './copy-button'

export function InstallationContent() {
  return (
    <div className="space-y-12 px-8 md:px-16 lg:px-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Installation Guide</h1>
        <p className="text-muted-foreground">
          Follow these steps to set up the project for local development.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Prerequisites</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Node.js 18.x or later</li>
          <li>pnpm 8.x or later</li>
          <li>Git</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Installation Steps</h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Running the Project</h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Content Development</h2>
        <p className="mb-2">This project uses Contentlayer for MDX content management. To work with content:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Content files are located in the <code className="bg-muted px-1 rounded">content</code> directory</li>
          <li>Use MDX for content files (e.g., <code className="bg-muted px-1 rounded">.mdx</code> extension)</li>
          <li>Content is automatically processed and available in your components</li>
          <li>Run <code className="bg-muted px-1 rounded">pnpm build:docs</code> to build content separately</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold pb-2 border-b">Common Issues</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>If you encounter any issues with dependencies, try <code className="bg-muted px-1 rounded">pnpm clean</code> followed by <code className="bg-muted px-1 rounded">pnpm install</code></li>
          <li>For content-related issues, ensure you've run <code className="bg-muted px-1 rounded">pnpm build:docs</code></li>
          <li>Check the <code className="bg-muted px-1 rounded">.env.local</code> file for any missing environment variables</li>
        </ul>
      </section>
    </div>
  )
} 