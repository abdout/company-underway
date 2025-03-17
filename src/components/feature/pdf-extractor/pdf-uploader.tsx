"use client"

import { useState, useRef, useCallback } from "react"
import { toast } from "sonner"
import { FileIcon, UploadIcon, XIcon, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PDFUploaderProps {
  onExtractedData: (data: any) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function PDFUploader({ 
  onExtractedData,
  isLoading,
  setIsLoading
}: PDFUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [validationWarnings, setValidationWarnings] = useState<string[]>([])
  const [requestAbortController, setRequestAbortController] = useState<AbortController | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Handle file change with memoized validation
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    
    if (!selectedFile) {
      return
    }
    
    // Reset warnings
    setValidationWarnings([])
    
    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF file"
      })
      return
    }
    
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload a file smaller than 10MB"
      })
      return
    }
    
    // Show warnings for potential issues
    if (selectedFile.size < 50 * 1024) {
      setValidationWarnings(prev => [...prev, "The PDF file is very small, it may not contain enough content for extraction"])
    }
    
    if (!selectedFile.name.toLowerCase().includes("relay") && 
        !selectedFile.name.toLowerCase().includes("settings") &&
        !selectedFile.name.toLowerCase().includes("protection")) {
      setValidationWarnings(prev => [...prev, "Filename doesn't appear to be a relay settings document"])
    }
    
    setFile(selectedFile)
    setProgress(0)
  }, [])
  
  // Handle file removal
  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])
  
  // Cancel ongoing request
  const cancelRequest = useCallback(() => {
    if (requestAbortController) {
      requestAbortController.abort()
      setRequestAbortController(null)
      setIsLoading(false)
      toast.info("Processing cancelled")
    }
  }, [requestAbortController, setIsLoading])
  
  // Process the file and extract data
  const handleProcessFile = useCallback(async () => {
    if (!file) {
      toast.error("No file selected", {
        description: "Please select a PDF file to process"
      })
      return
    }
    
    // Cancel any existing requests
    if (requestAbortController) {
      requestAbortController.abort()
    }
    
    // Create new abort controller
    const abortController = new AbortController()
    setRequestAbortController(abortController)
    
    setIsLoading(true)
    setValidationWarnings([]) // Clear warnings when starting process
    
    try {
      // Simulate progress with more detailed steps
      const progressSteps = [
        { progress: 10, message: "Initializing PDF processing..." },
        { progress: 25, message: "Analyzing document structure..." },
        { progress: 40, message: "Extracting text content..." },
        { progress: 60, message: "Identifying relay parameters..." },
        { progress: 75, message: "Processing settings values..." },
        { progress: 90, message: "Finalizing extraction..." },
      ]
      
      let stepIndex = 0
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          const step = progressSteps[stepIndex]
          setProgress(step.progress)
          toast.info(step.message, { duration: 2000 })
          stepIndex++
        } else {
          clearInterval(progressInterval)
        }
      }, 1500)
      
      // Create form data for file upload
      const formData = new FormData()
      formData.append('file', file)
      
      // Send the file to our API endpoint with abort signal
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
        signal: abortController.signal
      })
      
      clearInterval(progressInterval)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to extract data from PDF')
      }
      
      // Complete the progress
      setProgress(100)
      
      // Get the response data
      const data = await response.json()
      
      // Additional validation on extracted data
      if (Object.keys(data.settings || {}).length < 3) {
        setValidationWarnings(["Few settings were detected. The file may not be a relay settings document or the format is not recognized."])
      }
      
      // Callback with the extracted data
      onExtractedData(data)
      
      toast.success("PDF processed successfully", {
        description: `Extracted ${Object.keys(data.settings || {}).length} settings from the document`
      })
    } catch (error: any) {
      console.error('Error processing PDF:', error)
      
      // Don't show error for aborted requests
      if (error.name !== 'AbortError') {
        toast.error("Processing failed", { 
          description: error instanceof Error ? error.message : "Failed to extract data from PDF"
        })
      }
    } finally {
      setIsLoading(false)
      setRequestAbortController(null)
    }
  }, [file, setIsLoading, onExtractedData, requestAbortController])
  
  // Drag and drop handling
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      
      // Manually trigger validation by creating a mock event object
      handleFileChange({ target: { files: e.dataTransfer.files } } as any)
    }
  }, [handleFileChange])
  
  return (
    <div className="space-y-6">
      {validationWarnings.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2">
              {validationWarnings.map((warning, index) => (
                <li key={index} className="text-sm">{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <div 
        className="border border-dashed border-input rounded-lg p-8 text-center transition-colors hover:bg-muted/40" 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <FileIcon className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Drag and drop your PDF file here</p>
              <p className="text-xs text-muted-foreground">
                Supports PDF files up to 10MB
              </p>
            </div>
            <Label 
              htmlFor="pdf-upload" 
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              Select PDF
            </Label>
            <Input
              id="pdf-upload"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileIcon className="h-6 w-6 text-blue-500" />
                <div className="text-left">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRemoveFile}
                disabled={isLoading}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Extracting data...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              {isLoading && (
                <Button
                  variant="outline"
                  onClick={cancelRequest}
                >
                  Cancel
                </Button>
              )}
              
              <Button
                onClick={handleProcessFile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Process PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported relay types:</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>Distance Protection Relays</li>
          <li>Differential Protection Relays</li>
          <li>Overcurrent Protection Relays</li>
          <li>Earth Fault Relays</li>
          <li>Motor Protection Relays</li>
        </ul>
      </div>
    </div>
  )
} 