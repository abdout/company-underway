"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { FileIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, Loader2 } from "lucide-react"

interface PdfExtractorProps {
  onDataExtracted: (data: ExtractedRelayData) => void
  acceptedFileTypes?: string[]
  maxFileSize?: number
}

export interface ExtractedRelayData {
  relayType?: string
  manufacturer?: string
  model?: string
  serialNumber?: string
  firmwareVersion?: string
  nominalFrequency?: string
  nominalCurrent?: string
  ctRatio?: string
  ptRatio?: string
  settings: {
    [key: string]: {
      value: string
      confidence: number
      page: number
    }
  }
  rawText?: string
}

export function PdfExtractor({
  onDataExtracted,
  acceptedFileTypes = [".pdf"],
  maxFileSize = 10 * 1024 * 1024, // 10 MB
}: PdfExtractorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState("")
  const [extractedData, setExtractedData] = useState<ExtractedRelayData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setError(null)

    if (!selectedFile) {
      return
    }

    // Validate file type
    const fileExt = selectedFile.name.split('.').pop()?.toLowerCase() || ""
    const isAcceptedType = acceptedFileTypes.some(type => 
      type.toLowerCase().includes(fileExt) || type === ".*"
    )

    if (!isAcceptedType) {
      setError(`Invalid file type. Accepted types: ${acceptedFileTypes.join(", ")}`)
      return
    }

    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError(`File too large. Maximum size: ${Math.floor(maxFileSize / (1024 * 1024))}MB`)
      return
    }

    setFile(selectedFile)
    setExtractedData(null)
  }

  const resetForm = () => {
    setFile(null)
    setUploading(false)
    setUploadProgress(0)
    setProcessing(false)
    setProcessingStatus("")
    setExtractedData(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const extractData = async () => {
    if (!file) return

    try {
      setUploading(true)
      setUploadProgress(0)
      setError(null)

      // Simulate upload progress
      const uploadTimer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(uploadTimer)
            return 95
          }
          return prev + 5
        })
      }, 100)

      // Create form data
      const formData = new FormData()
      formData.append("file", file)

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      clearInterval(uploadTimer)
      setUploadProgress(100)
      setUploading(false)
      
      // Process PDF
      setProcessing(true)
      setProcessingStatus("Initializing PDF processing...")
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProcessingStatus("Parsing document structure...")
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setProcessingStatus("Extracting relay settings...")
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      setProcessingStatus("Analyzing relay type and parameters...")
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real implementation, this would be the API response
      // const response = await fetch('/api/extract-pdf', {
      //   method: 'POST',
      //   body: formData
      // })
      // 
      // if (!response.ok) {
      //   const errorData = await response.json()
      //   throw new Error(errorData.message || 'Failed to extract data from PDF')
      // }
      // 
      // const data = await response.json()
      
      // Mock extracted data based on relay type detection from filename
      const mockData = generateMockExtractedData(file.name)
      
      setProcessingStatus("Processing complete")
      setProcessing(false)
      setExtractedData(mockData)
      
      // Notify parent component
      onDataExtracted(mockData)
      
      toast.success("Data extracted successfully", {
        description: `Extracted ${Object.keys(mockData.settings).length} settings from ${file.name}`
      })
      
    } catch (err: any) {
      setUploading(false)
      setProcessing(false)
      setError(err.message || "Failed to extract data from PDF")
      toast.error("Extraction failed", {
        description: err.message || "Failed to extract data from PDF"
      })
    }
  }

  // Generate mock data based on filename to simulate different relay types
  const generateMockExtractedData = (filename: string): ExtractedRelayData => {
    let relayType = "Overcurrent"
    
    // Determine relay type from filename
    const lowerFilename = filename.toLowerCase()
    if (lowerFilename.includes("diff")) relayType = "Differential"
    else if (lowerFilename.includes("dist")) relayType = "Distance"
    else if (lowerFilename.includes("motor")) relayType = "Motor Protection"
    else if (lowerFilename.includes("earth") || lowerFilename.includes("ground")) relayType = "Earth Fault"
    
    // Generate mock data based on relay type
    let mockData: ExtractedRelayData = {
      relayType,
      manufacturer: getRandomManufacturer(),
      model: getRandomModel(relayType),
      serialNumber: getRandomSerialNumber(),
      firmwareVersion: getRandomFirmwareVersion(),
      nominalFrequency: "50 Hz",
      nominalCurrent: "1 A",
      ctRatio: "100/1",
      ptRatio: "11000/110",
      settings: {}
    }
    
    // Add settings based on relay type
    if (relayType === "Overcurrent") {
      mockData.settings = {
        "Pickup Current": { value: "1.2 In", confidence: 0.95, page: 2 },
        "Time Multiplier": { value: "0.1", confidence: 0.97, page: 2 },
        "Curve Type": { value: "IEC Standard Inverse", confidence: 0.96, page: 2 },
        "Instantaneous Pickup": { value: "10 In", confidence: 0.94, page: 3 },
        "Instantaneous Delay": { value: "50 ms", confidence: 0.93, page: 3 }
      }
    } else if (relayType === "Differential") {
      mockData.settings = {
        "Differential Pickup": { value: "0.3 In", confidence: 0.95, page: 2 },
        "Slope 1": { value: "25%", confidence: 0.97, page: 2 },
        "Slope 2": { value: "50%", confidence: 0.96, page: 2 },
        "Slope 2 Breakpoint": { value: "2.0 In", confidence: 0.94, page: 3 },
        "2nd Harmonic Blocking": { value: "15%", confidence: 0.93, page: 3 },
        "5th Harmonic Blocking": { value: "25%", confidence: 0.92, page: 3 }
      }
    } else if (relayType === "Distance") {
      mockData.settings = {
        "Zone 1 Reach": { value: "80%", confidence: 0.95, page: 2 },
        "Zone 1 Delay": { value: "0 ms", confidence: 0.97, page: 2 },
        "Zone 2 Reach": { value: "120%", confidence: 0.96, page: 2 },
        "Zone 2 Delay": { value: "300 ms", confidence: 0.94, page: 3 },
        "Zone 3 Reach": { value: "250%", confidence: 0.93, page: 3 },
        "Zone 3 Delay": { value: "600 ms", confidence: 0.92, page: 3 },
        "Line Angle": { value: "75°", confidence: 0.91, page: 4 }
      }
    } else if (relayType === "Earth Fault") {
      mockData.settings = {
        "Pickup Current": { value: "0.1 In", confidence: 0.95, page: 2 },
        "Time Multiplier": { value: "0.05", confidence: 0.97, page: 2 },
        "Curve Type": { value: "IEC Very Inverse", confidence: 0.96, page: 2 },
        "Directional": { value: "Forward", confidence: 0.94, page: 3 },
        "RCA": { value: "65°", confidence: 0.93, page: 3 }
      }
    } else if (relayType === "Motor Protection") {
      mockData.settings = {
        "Thermal Overload Pickup": { value: "1.05 In", confidence: 0.95, page: 2 },
        "Thermal Time Constant": { value: "20 min", confidence: 0.97, page: 2 },
        "Locked Rotor Current": { value: "6.0 In", confidence: 0.96, page: 2 },
        "Locked Rotor Time": { value: "5 s", confidence: 0.94, page: 3 },
        "Unbalance Pickup": { value: "30%", confidence: 0.93, page: 3 },
        "Unbalance Time Delay": { value: "3 s", confidence: 0.92, page: 3 },
        "Number of Starts per Hour": { value: "3", confidence: 0.91, page: 4 }
      }
    }
    
    return mockData
  }
  
  const getRandomManufacturer = () => {
    const manufacturers = ["ABB", "Siemens", "GE", "Schneider Electric", "SEL", "Alstom", "Mitsubishi"]
    return manufacturers[Math.floor(Math.random() * manufacturers.length)]
  }
  
  const getRandomModel = (relayType: string) => {
    if (relayType === "Overcurrent") return "REF615"
    if (relayType === "Differential") return "RET670"
    if (relayType === "Distance") return "SEL-421"
    if (relayType === "Earth Fault") return "7SJ64"
    if (relayType === "Motor Protection") return "MiCOM P242"
    return "P14N"
  }
  
  const getRandomSerialNumber = () => {
    return `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(10000 + Math.random() * 90000)}`
  }
  
  const getRandomFirmwareVersion = () => {
    return `${Math.floor(1 + Math.random() * 9)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Relay Settings Extractor</CardTitle>
        <CardDescription>
          Upload a PDF file containing relay settings to automatically extract key parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* File Upload Area */}
          {!file && (
            <div 
              className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileTextIcon className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-1">Upload Relay Settings PDF</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click to select or drop your file here
              </p>
              <Button variant="outline" type="button" onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}>
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFileTypes.join(",")}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
          
          {/* Selected File */}
          {file && (
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-muted/40 rounded-lg">
                <FileIcon className="h-8 w-8 mr-3 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  Change
                </Button>
              </div>
              
              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {/* Processing Status */}
              {processing && (
                <div className="flex items-center space-x-2 p-2 rounded-md bg-muted/40">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-sm">{processingStatus}</p>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-2 rounded-md bg-destructive/10">
                  <XCircleIcon className="h-4 w-4 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              {/* Extracted Data Preview */}
              {extractedData && (
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Extracted Relay Data</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Relay Type</p>
                      <p className="text-sm">{extractedData.relayType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Manufacturer</p>
                      <p className="text-sm">{extractedData.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Model</p>
                      <p className="text-sm">{extractedData.model}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Serial Number</p>
                      <p className="text-sm">{extractedData.serialNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Settings</h4>
                    <ScrollArea className="h-[200px] rounded-md border p-2">
                      <div className="space-y-2">
                        {Object.entries(extractedData.settings).map(([key, data]) => (
                          <div key={key} className="grid grid-cols-2 gap-2 py-1 border-b last:border-0">
                            <div>
                              <p className="text-sm font-medium">{key}</p>
                              <p className="text-xs text-muted-foreground">{`Page ${data.page} (${(data.confidence * 100).toFixed(0)}% confidence)`}</p>
                            </div>
                            <div className="text-sm">
                              {data.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={resetForm}
          disabled={!file || uploading || processing}
        >
          Reset
        </Button>
        <Button
          onClick={extractData}
          disabled={!file || uploading || processing || !!extractedData}
        >
          {uploading ? "Uploading..." : processing ? "Processing..." : "Extract Data"}
        </Button>
      </CardFooter>
    </Card>
  )
} 