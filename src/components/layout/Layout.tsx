import { ReactNode } from 'react'
import { TableOfContents } from './ToC.tsx'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Header />
      <main className="flex-1 flex">
        <LeftSidebar />
        <div className="flex-1 px-6 py-8 max-w-3xl mx-auto">
          {children}
        </div>
        <RightSidebar />
      </main>
      <Footer />
    </div>
  )
}

// Simple header with title for Walla Walla neighborhood
function Header() {
  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg font-mono font-medium">Walla Walla Neighborhood Observation</h1>
      </div>
    </header>
  )
}

// Left sidebar with sticky content
function LeftSidebar() {
  return (
    <aside className="w-20 md:w-40 hidden md:block shrink-0">
      <div className="sticky top-4 p-4">
        <TableOfContents />
      </div>
    </aside>
  )
}

// Right sidebar with sticky content
function RightSidebar() {
  return (
    <aside className="w-20 md:w-40 hidden md:block shrink-0">
      <div className="sticky top-4 p-4">
        {/* You can add sidebar content here later */}
      </div>
    </aside>
  )
}

// Simple footer
function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} - Neighborhood Observation Assignment</p>
      </div>
    </footer>
  )
}