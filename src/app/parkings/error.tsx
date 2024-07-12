'use client' // Error components must be Client Components
 
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Shell } from '@/components/shell'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <Shell>
      <h1 className="font-heading text-3xl md:text-4xl">Parkings</h1>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Shell>
  )
}