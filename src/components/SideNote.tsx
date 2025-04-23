// src/components/SideNote.tsx
import { ReactNode } from 'react'

interface SideNoteProps {
  children: ReactNode
  position?: 'left' | 'right'
}

export function SideNote({ children, position = 'right' }: SideNoteProps) {
  const positionClasses = position === 'left' 
    ? 'left-0 -translate-x-full pr-4' 
    : 'right-0 translate-x-full pl-4'
  
  return (
    <div className={`absolute ${positionClasses} w-40 text-sm text-muted-foreground`}>
      <div className="p-2 bg-card border border-border rounded-md shadow-sm">
        {children}
      </div>
    </div>
  )
}