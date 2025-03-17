"use client"

import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormDescription } from "@/components/ui/form"
import { Undo2Icon, XIcon } from "lucide-react"

interface SignatureAreaProps {
  signature: string | null
  setSignature: (signature: string | null) => void
  label?: string
  description?: string
  readOnly?: boolean
}

export function SignatureArea({
  signature,
  setSignature,
  label = "Signature",
  description = "Use mouse or touch to sign",
  readOnly = false,
}: SignatureAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  
  // Initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Set canvas styling
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw existing signature if available
    if (signature) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        setHasSignature(true)
      }
      img.src = signature
    }
  }, [signature])
  
  // Event handlers for drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (readOnly) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    setIsDrawing(true)
    setHasSignature(true)
    
    // Get coordinates
    let x: number, y: number
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Get coordinates
    let x: number, y: number
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  
  const stopDrawing = () => {
    if (!isDrawing || readOnly) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.closePath()
    setIsDrawing(false)
    
    // Save the signature
    const dataUrl = canvas.toDataURL('image/png')
    setSignature(dataUrl)
  }
  
  const clearSignature = () => {
    if (readOnly) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setSignature(null)
    
    toast.info("Signature cleared", {
      description: "The signature has been cleared."
    })
  }
  
  // Prevent scrolling when drawing on touch devices
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault()
      }
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isDrawing])

  return (
    <div className="flex flex-col">
      {label && <span className="text-sm font-medium mb-1">{label}</span>}
      {description && <FormDescription className="mb-1">{description}</FormDescription>}
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          className={`w-full h-32 border border-input rounded-md ${readOnly ? 'cursor-not-allowed bg-muted/20' : 'cursor-crosshair'}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {!readOnly && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-7 w-7 rounded-full bg-white"
              onClick={clearSignature}
              disabled={!hasSignature}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {readOnly && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
            <span className="text-muted-foreground text-sm px-2 py-1 bg-background/80 rounded">
              Signature will be captured when generating the report
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 