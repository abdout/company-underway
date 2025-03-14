'use client';
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/layout/header";
import { MainProvider } from "@/provider/main";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const NoLayout = [, '/error', '/password', '/verification', '/join', '/reset']
  if (NoLayout.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <MainProvider>
      <html lang="en">
        <body className={`${inter.className} overflow-x-hidden`}>
          <Header />
          
          <main className="w-full pt-16 px-4 md:px-6">
            {children}
          </main>
        </body>
      </html>
    </MainProvider>
  );
}