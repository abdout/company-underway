import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to get the correct path for images from the public directory
 * This ensures consistent paths between development and production on Vercel
 */
export function getImagePath(path: string): string {
  // Remove leading slash if it exists
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Get the base path from environment if available
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Construct the full path
  return `${basePath}/${normalizedPath}`;
}

// Helper function to convert strings to URL-friendly format
export const toUrlPath = (str: string | undefined): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/\s+/g, '-');
};

// Gets the URL for a specific document path
export function getDocsUrl(category: string, subCategory?: string, activity?: string): string {
  const parts = [category];
  
  if (subCategory) {
    parts.push(toUrlPath(subCategory));
  }
  
  if (activity) {
    parts.push(toUrlPath(activity));
  }
  
  return `/docs/${parts.join('/')}`;
}

// Format a date string
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
