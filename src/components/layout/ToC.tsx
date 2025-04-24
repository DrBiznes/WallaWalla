// src/components/layout/ToC.tsx
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Find all h2 headings in the MDX content (main sections only)
    const mdxContent = document.querySelector('.mdx-content')
    if (!mdxContent) return

    // Only select h2 headings to avoid component headers
    const headingElements = mdxContent.querySelectorAll('h2')
    
    // Process headings to create TOC items
    const items: TOCItem[] = []
    headingElements.forEach((el) => {
      // Skip headings without IDs
      if (!el.id) {
        // Generate an ID if one doesn't exist
        el.id = el.textContent?.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-') || `heading-${items.length}`
      }
      
      const level = parseInt(el.tagName.charAt(1))
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: level
      })
    })
    
    setHeadings(items)
    
    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66% 0px' }
    )
    
    // Observe all heading elements
    headingElements.forEach((el) => observer.observe(el))
    observerRef.current = observer
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])
  
  if (headings.length === 0) {
    return null
  }
  
  return (
    <nav className="text-sm w-full">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Contents</p>
      <ul className="font-mono space-y-1.5">
        {headings.map((heading) => (
          <li 
          key={heading.id}
          className="transition-colors duration-200"
          >
          <a
            href={`#${heading.id}`}
            className={cn(
            "block py-1 hover:text-primary transition-colors text-wrap break-words",
            activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"
            )}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: 'smooth'
            });
            }}
          >
            {heading.text}
          </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}