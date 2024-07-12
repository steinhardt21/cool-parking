'use client'

import { useEffect } from "react"

export function RefreshCache({ refresh }: { refresh: () => Promise<void> }) {
 
  useEffect(() => {
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)

    return () => window.removeEventListener('focus', onFocus)
  }, [refresh])

  return null
}