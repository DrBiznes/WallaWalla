// src/App.tsx
import { Layout } from './components/layout/Layout'
import { Suspense } from 'react'
import './App.css'

// Import the MDX file - make sure this path is correct
import MainContent from './content/main.mdx'

function App() {
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