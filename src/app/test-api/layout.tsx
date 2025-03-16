'use client';

import { PostProjectProvider } from "@/provider/post";

export default function TestApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostProjectProvider>
      {children}
    </PostProjectProvider>
  );
} 