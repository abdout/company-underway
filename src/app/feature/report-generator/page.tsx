"use client"

import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { ReportForm } from "@/components/feature/report-generator/report-form"
import { RelayTestReport } from "@/components/feature/report-generator/report-templates/relay-test-report"
import { FileTextIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportGeneratorPage() {
  // Mock engineer data - in a real app, this would come from authentication
  const [engineer, setEngineer] = useState({
    name: "John Doe",
    id: "ENG12345"
  })
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Test Report Generator</h1>
      </div>
      
      <p className="text-muted-foreground">
        Create professional test and commissioning reports with customizable templates.
        Reports are generated in DOCX format and can be easily converted to PDF.
      </p>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General Test Report</TabsTrigger>
          <TabsTrigger value="relay">Relay Test Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <ReportForm 
            engineerName={engineer.name}
            engineerId={engineer.id}
          />
        </TabsContent>
        
        <TabsContent value="relay">
          <RelayTestReport />
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
} 