import { DocsSidebar } from '@/components/template/sidebar/docs-sidebar';
import { SidebarProvider } from '@/components/template/sidebar/sidebar';
import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { Mdx } from '@/components/ui/mdx-components';

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

async function getDocFromParams(params: DocPageProps['params']) {
  try {
    const slug = params.slug?.join('/') || 'index';
    const doc = allDocs.find((doc) => doc._raw.flattenedPath === `docs/${slug}`);
    
    if (!doc) {
      return null;
    }

    return doc;
  } catch (error) {
    console.error('Error fetching doc:', error);
    return null;
  }
}

export default async function DocPage({ params }: DocPageProps) {
  try {
    const doc = await getDocFromParams(params);
    
    // If the doc doesn't exist, return a 404
    if (!doc) {
      // Fallback to a placeholder UI if we're still generating docs
      return (
        <SidebarProvider>
          <div className="flex">
            <DocsSidebar className="hidden lg:block" />
            <div className="container max-w-4xl py-12 px-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
                <p className="text-lg text-muted-foreground">
                  Path: {params.slug ? params.slug.join('/') : 'index'}
                </p>
              </div>
              <div className="mt-8">
                <p>The documentation system is almost ready!</p>
                <p className="mt-4">To see content here:</p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Run <code>pnpm generate-docs</code> to create MDX files</li>
                  <li>Configure ContentLayer in your project</li>
                  <li>Refresh this page</li>
                </ol>
              </div>
            </div>
          </div>
        </SidebarProvider>
      );
    }

    return (
      <SidebarProvider>
        <div className="flex">
          <DocsSidebar className="hidden lg:block" />
          <div className="container max-w-4xl py-12 px-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
              <p className="text-lg text-muted-foreground">
                {doc.description}
              </p>
            </div>
            <div className="mt-8">
              {doc.body && doc.body.code ? (
                <Mdx code={doc.body.code} />
              ) : (
                <p>No content available for this document.</p>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  } catch (error) {
    console.error('Error rendering doc page:', error);
    return (
      <SidebarProvider>
        <div className="flex">
          <DocsSidebar className="hidden lg:block" />
          <div className="container max-w-4xl py-12 px-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Error</h1>
              <p className="text-lg text-muted-foreground">
                There was an error loading this documentation page.
              </p>
            </div>
            <div className="mt-8 p-4 border border-red-300 bg-red-50 rounded-md">
              <p>An error occurred while trying to render this documentation page. Please try rebuilding the documentation with:</p>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">pnpm build:docs</pre>
              <p className="mt-4">If the issue persists, check the MDX content for any syntax errors.</p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }
} 