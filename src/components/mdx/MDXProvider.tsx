import React, { ReactNode } from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { Card } from '@/components/ui/card'

// Define the components that will be available in MDX files
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-serif mb-6" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-serif mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-serif mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 mb-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 mb-4" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-border pl-4 italic my-4" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono bg-muted px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4 font-mono text-sm" {...props} />
  ),
  // Custom components that can be used in MDX
  Card: Card,
  // Add a FloatingNote component for side notes
  FloatingNote: ({ children, position = 'right' }: { children: ReactNode, position?: 'left' | 'right' }) => {
    const positionClasses = position === 'left' 
      ? 'left-0 -translate-x-full pr-4' 
      : 'right-0 translate-x-full pl-4'
    
    return (
      <div className={`absolute ${positionClasses} w-48 text-sm text-muted-foreground`}>
        <div className="p-3 bg-card border border-border rounded-md shadow-sm">
          {children}
        </div>
      </div>
    )
  }
}

interface MDXContentProps {
  children: ReactNode
}

export function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="mdx-content prose prose-neutral dark:prose-invert max-w-none">
      <BaseMDXProvider components={components}>
        {children}
      </BaseMDXProvider>
    </div>
  )
}