"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface InvoiceExtractorProps {
  imageFile: File
  onExtracted: (data: any) => void
  onError: (error: string) => void
}

interface ExtractedData {
  invoiceNumber?: string
  vendorName?: string
  totalAmount?: string
  date?: string
  confidence: {
    invoiceNumber: number
    vendorName: number
    totalAmount: number
    date: number
  }
}

export function InvoiceExtractor({ 
  imageFile, 
  onExtracted, 
  onError 
}: InvoiceExtractorProps) {
  const [isProcessing, setIsProcessing] = useState(true)
  const [status, setStatus] = useState("Initializing OCR processing...")
  
  useEffect(() => {
    // Process the image file
    processInvoiceImage(imageFile)
      .then(data => {
        onExtracted(data)
      })
      .catch(error => {
        console.error("Error extracting invoice data:", error)
        onError(error.message || "Failed to extract data from the invoice image")
      })
  }, [imageFile, onExtracted, onError])
  
  // Process invoice image using our API
  const processInvoiceImage = async (file: File): Promise<ExtractedData> => {
    try {
      // Validate image size
      setStatus("Validating image...")
      await simulateDelay(300) // Small delay for better UX
      
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("Image file is too large. Maximum size is 10MB.")
      }
      
      // Prepare form data for API call
      const formData = new FormData()
      formData.append('image', file)
      
      // Send to OCR API
      setStatus("Sending to OCR service...")
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })
      
      // Check for errors
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process image')
      }
      
      // Process successful response
      setStatus("Processing extracted data...")
      const result = await response.json()
      
      // Complete processing
      setStatus("OCR processing complete")
      setIsProcessing(false)
      
      if (!result.success) {
        throw new Error("OCR processing failed")
      }
      
      return result.data
    } catch (error: any) {
      console.error('Error in OCR processing:', error)
      throw error
    }
  }
  
  function simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
    </div>
  )
} 