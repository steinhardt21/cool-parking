'use client'

import { useEffect, useState } from "react"
import { useInterval } from "../hooks/use-interval"

export function RefreshCache({ refresh }: { refresh: () => Promise<void> }) {
  const [shouldRun, setShouldRun] = useState<boolean>(
    typeof document !== 'undefined' && document.hasFocus()
  )
 
  useEffect(() => {
    const onFocus = () => {
      refresh()
      setShouldRun(true)
    }
    const onBlur = () => setShouldRun(false)

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  })

  useInterval(refresh, shouldRun ? 3000 : null)
  return null
}