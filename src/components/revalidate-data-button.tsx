'use client'
import { useState } from 'react'
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"

export function RevalidateDataButton({ refresh }: { refresh: () => Promise<void> }) {
  const [isDisabled, setIsDisabled] = useState(false)

  const refreshClick = async () => {
    setIsDisabled(true)
    await refresh()

    toast({
      description: 'Data are refreshing...',
      variant: "default"
    })

    setTimeout(() => setIsDisabled(false), 5000)
  }

  return (
    <Button className='cursor-pointer' disabled={isDisabled} onClick={refreshClick}>
      Refresh data
    </Button>
  )
}