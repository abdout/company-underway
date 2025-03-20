'use client';
import Image from 'next/image'
import { CopyButton } from './copy-button'

export function VisualGuide() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold pb-2 border-b">Installation</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">1. Fork the Repository</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2">Go to <a href="https://github.com/abdout/company-underway" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">github.com/abdout/company-underway</a> and click the "Fork" button in the top-right corner:</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/fork.png"
                  alt="Fork repository button on GitHub"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div>
              <p className="mb-2">Click "Create Fork" to create your copy of the repository:</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/create-fork.png"
                  alt="Create fork confirmation on GitHub"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">2. Clone in Cursor</h3>
          <div className="space-y-6">
            <div>
              <p className="mb-2">1. Open Cursor</p>
              <p className="mb-2">2. Click "File" → "Clone Git Repository":</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/clone.png"
                  alt="Clone Git Repository in Cursor"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div>
              <p className="mb-2">3. Select "Clone from GitHub":</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/clone-github.png"
                  alt="Clone from GitHub option"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div>
              <p className="mb-2">4. Select your forked repository:</p>
              <p className="text-sm text-muted-foreground mb-2">Look for your username in the repository list (e.g., "yourusername/company-underway")</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/select-repo.png"
                  alt="Select repository to clone"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div>
              <p className="mb-2">5. Choose a destination folder:</p>
              <p className="text-sm text-muted-foreground mb-2">Select where you want to save the project on your computer. This is where all the project files will be downloaded.</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/select-folder.png"
                  alt="Select destination folder"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div>
              <p className="mb-2">6. Click "Open" to open the project in the same window:</p>
              <div className="relative aspect-video w-full max-w-3xl mx-auto">
                <Image
                  src="/contribute/open.png"
                  alt="Open project in same window"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">3. Install Dependencies</h3>
          <div className="space-y-4">
            <p>1. Open the integrated terminal in Cursor (View → Terminal or Ctrl+`)</p>
            <p>2. Run the following command:</p>
            <div className="relative">
              <CopyButton text="pnpm install" />
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                {`pnpm install`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">4. Start Development</h3>
          <div className="space-y-4">
            <p>1. In the terminal, run:</p>
            <div className="relative">
              <CopyButton text="pnpm dev" />
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto pl-12">
                {`pnpm dev`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">Your development server will start at <code className="bg-muted px-1 rounded">http://localhost:3000</code></p>
          </div>
        </div>
      </div>
    </section>
  )
} 