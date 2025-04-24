// src/components/layout/Layout.tsx
import { ReactNode } from 'react'
import { TableOfContents } from './ToC.tsx'
import { ChevronUp, Github } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row w-full overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 px-4 sm:px-6 py-8 w-full mx-auto max-w-3xl">
          {children}
          <Footer />
        </div>
        <RightSidebar />
      </main>
    </div>
  )
}

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Redesigned header with two lines, date, and GitHub button
function Header() {
  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <span className="text-lg font-serif font-semibold text-primary">
            Walla Walla, WA
          </span>
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground font-mono">
              Apr 23, 2025
            </span>
            <a 
              href="https://github.com/DrBiznes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-1"
              aria-label="James Femino's GitHub"
            >
              <span className="hidden sm:inline">James Femino</span>
              <Github size={14} />
            </a>
          </div>
        </div>
        <h1 className="text-lg font-mono font-medium">Neighborhood Observation</h1>     
      </div>
    </header>
  )
}

// Left sidebar with sticky content
function LeftSidebar() {
  return (
    <aside className="w-0 md:w-40 hidden md:block shrink-0">
      <div className="sticky top-4 p-4">
        <TableOfContents />
      </div>
    </aside>
  )
}

// Right sidebar with sticky content
function RightSidebar() {
  return (
    <aside className="w-0 md:w-40 hidden md:block shrink-0">
      <div className="sticky top-4 p-4">
        {/* Sidebar content can be added here */}
      </div>
    </aside>
  )
}

// Redesigned footer with scroll-to-top button and library attributions
function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-10 text-center">
      {/* Large scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="flex items-center justify-center gap-2 mx-auto mb-6 px-4 py-2 text-primary bg-accent rounded-md hover:bg-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
        <span className="font-medium">Back to Top</span>
      </button>
      
      {/* Copyright notice */}
      <p className="font-mono text-sm text-muted-foreground mb-4">
        © {new Date().getFullYear()}  
        <a href="https://www.jamino.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary"> James Femino</a>
      </p>
      
      {/* Library attributions */}
      <div className="text-xs text-muted-foreground">
        <p className="mb-2">Built with:</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">shadcn/ui</a>
          <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Leaflet</a>
          <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Recharts</a>
          <a href="https://mdxjs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">MDX</a>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">React</a>
        </div>
      </div>
    </footer>
  )
}