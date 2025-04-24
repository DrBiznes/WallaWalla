import { Layout } from './components/layout/Layout'
import { Suspense, useEffect } from 'react'
import './App.css'

// Import the MDX file - make sure this path is correct
import MainContent from './content/main.mdx'

function App() {
  // Add IDs to headings after the content is rendered
  useEffect(() => {
    const addHeadingIds = () => {
      const headings = document.querySelectorAll('.mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6')
      
      headings.forEach((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || ''
          heading.id = text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-') || `heading-${index}`
        }
      })
    }

    // Run once after initial render
    addHeadingIds()

    // Re-run if content changes
    const observer = new MutationObserver(addHeadingIds)
    const mdxContent = document.querySelector('.mdx-content')
    if (mdxContent) {
      observer.observe(mdxContent, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Layout>
      <div className="mdx-content">
        <Suspense fallback={<div>Loading observation data...</div>}>
          <MainContent />
        </Suspense>
      </div>
    </Layout>
  )
}

export default App