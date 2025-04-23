// src/App.tsx
import { Layout } from './components/layout/Layout'
import { MDXContent } from './components/mdx/MDXProvider'
import { lazy, Suspense } from 'react'
import './App.css'

// Import the single MDX file for the whole site
const MainContent = lazy(() => import('./content/main.mdx'))

function App() {
  return (
    <Layout>
      <MDXContent>
        <Suspense fallback={<div>Loading content...</div>}>
          <MainContent />
        </Suspense>
      </MDXContent>
    </Layout>
  )
}

export default App