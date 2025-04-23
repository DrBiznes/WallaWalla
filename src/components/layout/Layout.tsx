import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Header />
      <main className="flex-1 flex">
        <LeftSidebar />
        <div className="flex-1 px-4 py-8 max-w-3xl mx-auto">
          {children}
        </div>
        <RightSidebar />
      </main>
      <Footer />
    </div>
  )
}

// Simple non-sticky header
function Header() {
  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-mono font-medium">site.txt</h1>
        <nav className="flex gap-4">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
        </nav>
      </div>
    </header>
  )
}

// Left sidebar with sticky components
function LeftSidebar() {
  return (
    <aside className="w-24 md:w-48 hidden md:block">
      <div className="sticky top-4 p-4">
        {/* Sticky left sidebar content */}
      </div>
    </aside>
  )
}

// Right sidebar with sticky components
function RightSidebar() {
  return (
    <aside className="w-24 md:w-48 hidden md:block">
      <div className="sticky top-4 p-4">
        {/* Sticky right sidebar content */}
      </div>
    </aside>
  )
}

// Simple footer
function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} · Simple Text Site</p>
      </div>
    </footer>
  )
}