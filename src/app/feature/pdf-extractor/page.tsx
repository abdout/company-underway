"use client"

import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { SettingsForm } from "@/components/feature/pdf-extractor/settings-form"
import { FileTextIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PDFUploader } from "@/components/feature/pdf-extractor/pdf-uploader"

export default function PDFExtractorPage() {
  // Mock extracted data - in a real app, this would come from API
  const [extractedData, setExtractedData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // Handle the extracted data from the PDF uploader component
  const handleExtractedData = (data: any) => {
    setExtractedData(data)
  }
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Relay Settings Extractor</h1>
      </div>
      
      <p className="text-muted-foreground">
        Extract relay settings from PDF files to automatically fill in reports.
        Saves time by avoiding manual data entry from manufacturer PDFs.
      </p>
      
      <Tabs defaultValue="extract" className="space-y-4">
        <TabsList>
          <TabsTrigger value="extract">Extract Data</TabsTrigger>
          <TabsTrigger value="settings" disabled={!extractedData}>Relay Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="extract" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload PDF File</CardTitle>
              <CardDescription>
                Upload a relay settings PDF to extract data automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PDFUploader 
                onExtractedData={handleExtractedData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </CardContent>
          </Card>
          
          {extractedData && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Data</CardTitle>
                <CardDescription>
                  Review the data extracted from the PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                  {JSON.stringify(extractedData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Relay Settings</CardTitle>
              <CardDescription>
                Edit extracted relay settings before saving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm extractedData={extractedData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
} 