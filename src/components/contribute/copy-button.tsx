'use client';
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute left-2 top-2 h-8 w-8"
      onClick={copyToClipboard}
    >
      <Copy className="h-4 w-4" />
      {copied && (
        <span className="absolute -top-8 left-0 bg-muted px-2 py-1 rounded text-xs">
          Copied!
        </span>
      )}
    </Button>
  )
} 