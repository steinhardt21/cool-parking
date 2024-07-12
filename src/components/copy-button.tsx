'use client'

import { Copy } from "lucide-react"
import { toast } from "./ui/use-toast"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"

type CopyButtonProps = {
  children?: React.ReactNode,
  text: string,
  toastMessage: string,
  className?: string
}

export function CopyButton({ text, children, className, toastMessage }: CopyButtonProps) {
  async function copyText() {
    await navigator.clipboard.writeText(text)

    toast({
      description: toastMessage,
      variant: "default"
    })
  }

  return (
    <Button className={cn(buttonVariants({ variant: "default" }), className, 'flex flex-row gap-3 w-fit')} onClick={copyText}>
      {children}
      <Copy size={20} />
    </Button>
  )
}