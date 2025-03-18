"use client"

import React, { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CalendarIcon, Save, FileDown, EyeIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EquipmentForm } from "../equipment-form"
import { WitnessForm } from "../witness-form"
import { SignatureArea } from "../signature-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define relay type options
const RELAY_TYPES = [
  { label: "Distance Protection", value: "distance" },
  { label: "Differential Protection", value: "differential" },
  { label: "Overcurrent Protection", value: "overcurrent" },
  { label: "Earth Fault Protection", value: "earth-fault" },
  { label: "Motor Protection", value: "motor" },
  { label: "Generator Protection", value: "generator" },
  { label: "Transformer Protection", value: "transformer" },
  { label: "Busbar Protection", value: "busbar" },
  { label: "Line Protection", value: "line" },
] as const

// Define relay manufacturers
const RELAY_MANUFACTURERS = [
  { label: "ABB", value: "abb" },
  { label: "Siemens", value: "siemens" },
  { label: "Schneider Electric", value: "schneider" },
  { label: "GE", value: "ge" },
  { label: "SEL", value: "sel" },
  { label: "Alstom", value: "alstom" },
  { label: "Basler", value: "basler" },
  { label: "Beckwith", value: "beckwith" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Toshiba", value: "toshiba" },
] as const

// Define the form schema
const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectNumber: z.string().min(1, "Project number is required"),
  testDate: z.date({ required_error: "Test date is required" }),
  location: z.string().min(1, "Location is required"),
  
  // Relay information
  relayType: z.string().min(1, "Relay type is required"),
  relayManufacturer: z.string().min(1, "Manufacturer is required"),
  relayModel: z.string().min(1, "Model is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  firmwareVersion: z.string().optional(),
  
  // System parameters
  nominalFrequency: z.string().min(1, "Nominal frequency is required"),
  nominalCurrent: z.string().min(1, "Nominal current is required"),
  ctRatio: z.string().min(1, "CT ratio is required"),
  ptRatio: z.string().optional(),
  
  // Test results
  pickupTests: z.string().min(1, "Pickup test results are required"),
  timingTests: z.string().min(1, "Timing test results are required"),
  directionalTests: z.string().optional(),
  logicTests: z.string().min(1, "Logic test results are required"),
  communicationTests: z.string().optional(),
  
  // Conclusion
  conclusion: z.string().min(1, "Conclusion is required"),
  notes: z.string().optional(),
})

// Define type for form values
type FormValues = z.infer<typeof formSchema>

/**
 * Generate a Word document from report data
 * @param data - The form data for the report
 * @returns void - Triggers download of the generated document
 */
function generateWordDocument(data: FormValues) {
  // In a real implementation, this would use a library like docx.js
  // For this example, we'll simulate the document generation
  
  // Create a delay to simulate document generation
  setTimeout(() => {
    // Create a simulated blob that would represent our document
    const blob = new Blob(
      [`
        RELAY PROTECTION TEST REPORT
        
        PROJECT INFORMATION
        Project Name: ${data.projectName}
        Project Number: ${data.projectNumber}
        Test Date: ${format(data.testDate, "MMMM dd, yyyy")}
        Location: ${data.location}
        
        RELAY INFORMATION
        Type: ${RELAY_TYPES.find(type => type.value === data.relayType)?.label || data.relayType}
        Manufacturer: ${RELAY_MANUFACTURERS.find(m => m.value === data.relayManufacturer)?.label || data.relayManufacturer}
        Model: ${data.relayModel}
        Serial Number: ${data.serialNumber}
        Firmware Version: ${data.firmwareVersion || "N/A"}
        
        SYSTEM PARAMETERS
        Nominal Frequency: ${data.nominalFrequency}
        Nominal Current: ${data.nominalCurrent}
        CT Ratio: ${data.ctRatio}
        PT Ratio: ${data.ptRatio || "N/A"}
        
        TEST RESULTS
        Pickup/Threshold Tests:
        ${data.pickupTests}
        
        Timing Tests:
        ${data.timingTests}
        
        Directional Tests:
        ${data.directionalTests || "N/A"}
        
        Logic & Trip Tests:
        ${data.logicTests}
        
        Communication Tests:
        ${data.communicationTests || "N/A"}
        
        CONCLUSION
        ${data.conclusion}
        
        NOTES
        ${data.notes || "N/A"}
      `], 
      { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    )
    
    // Create a download link and trigger download
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${data.projectName.replace(/\s+/g, "_")}_${data.relayType}_Report.docx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.success("Report generated successfully", {
      description: "The document has been downloaded to your device"
    })
  }, 1500)
  
  toast.info("Generating report...", {
    description: "Your document is being prepared"
  })
}

export function RelayTestReport() {
  const [previewData, setPreviewData] = useState<FormValues | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectNumber: "",
      testDate: new Date(),
      location: "",
      
      relayType: "",
      relayManufacturer: "",
      relayModel: "",
      serialNumber: "",
      firmwareVersion: "",
      
      nominalFrequency: "50",
      nominalCurrent: "1",
      ctRatio: "100/1",
      ptRatio: "11000/110",
      
      pickupTests: "",
      timingTests: "",
      directionalTests: "",
      logicTests: "",
      communicationTests: "",
      
      conclusion: "",
      notes: "",
    },
  })

  // Load from local storage if available
  React.useEffect(() => {
    const savedData = localStorage.getItem("relay-test-report-draft")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Convert the ISO date string back to a Date object
        if (parsedData.testDate) {
          parsedData.testDate = new Date(parsedData.testDate)
        }
        form.reset(parsedData)
        toast.info("Draft loaded", {
          description: "Your previous report draft has been loaded"
        })
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [form])

  // Auto-save as draft
  const autoSaveDraft = React.useCallback((data: Partial<FormValues>) => {
    try {
      // Format the date as ISO string for storage
      const storageData = {
        ...data,
        testDate: data.testDate ? data.testDate.toISOString() : new Date().toISOString()
      }
      localStorage.setItem("relay-test-report-draft", JSON.stringify(storageData))
    } catch (error) {
      console.error("Error saving draft:", error)
    }
  }, [])

  // Subscribe to form changes for auto-save
  React.useEffect(() => {
    const subscription = form.watch((data) => {
      autoSaveDraft(data as Partial<FormValues>)
    })
    return () => subscription.unsubscribe()
  }, [form, autoSaveDraft])

  // Form submission handler
  function onSubmit(data: FormValues) {
    try {
      console.log("Form submitted:", data)
      // In a real app, we would send this data to an API endpoint
      
      // Save to localStorage
      localStorage.setItem("relay-test-report", JSON.stringify({
        ...data,
        testDate: data.testDate.toISOString(),
        savedAt: new Date().toISOString()
      }))
      
      toast.success("Report saved successfully", {
        description: "The relay test report has been saved"
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to save report", {
        description: "An error occurred while saving the report"
      })
    }
  }
  
  // Preview handler
  function handlePreview() {
    const values = form.getValues()
    setPreviewData(values)
    setIsPreviewOpen(true)
  }
  
  // Export handler
  function handleExport() {
    const values = form.getValues()
    const result = formSchema.safeParse(values)
    
    if (!result.success) {
      // Show errors if validation fails
      toast.error("Cannot generate report", {
        description: "Please fill in all required fields"
      })
      return
    }
    
    generateWordDocument(values)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relay Protection Test Report</h2>
          <p className="text-muted-foreground">
            Document testing and commissioning of protection relay devices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handlePreview}>
                <EyeIcon className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Report Preview</DialogTitle>
                <DialogDescription>
                  Preview of the report before saving or exporting
                </DialogDescription>
              </DialogHeader>
              {previewData && (
                <div className="mt-4 space-y-6 text-sm">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold">Project Information</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="font-medium">Project Name</p>
                        <p>{previewData.projectName}</p>
                      </div>
                      <div>
                        <p className="font-medium">Project Number</p>
                        <p>{previewData.projectNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium">Test Date</p>
                        <p>{format(previewData.testDate, "MMMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p>{previewData.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold">Relay Information</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="font-medium">Relay Type</p>
                        <p>{RELAY_TYPES.find(type => type.value === previewData.relayType)?.label || previewData.relayType}</p>
                      </div>
                      <div>
                        <p className="font-medium">Manufacturer</p>
                        <p>{RELAY_MANUFACTURERS.find(m => m.value === previewData.relayManufacturer)?.label || previewData.relayManufacturer}</p>
                      </div>
                      <div>
                        <p className="font-medium">Model</p>
                        <p>{previewData.relayModel}</p>
                      </div>
                      <div>
                        <p className="font-medium">Serial Number</p>
                        <p>{previewData.serialNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium">Firmware Version</p>
                        <p>{previewData.firmwareVersion || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold">System Parameters</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="font-medium">Nominal Frequency</p>
                        <p>{previewData.nominalFrequency}</p>
                      </div>
                      <div>
                        <p className="font-medium">Nominal Current</p>
                        <p>{previewData.nominalCurrent}</p>
                      </div>
                      <div>
                        <p className="font-medium">CT Ratio</p>
                        <p>{previewData.ctRatio}</p>
                      </div>
                      <div>
                        <p className="font-medium">PT Ratio</p>
                        <p>{previewData.ptRatio || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold">Test Results</h3>
                    
                    <div className="mt-2">
                      <p className="font-medium">Pickup/Threshold Tests</p>
                      <p className="whitespace-pre-line">{previewData.pickupTests}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-medium">Timing Tests</p>
                      <p className="whitespace-pre-line">{previewData.timingTests}</p>
                    </div>
                    
                    {previewData.directionalTests && (
                      <div className="mt-4">
                        <p className="font-medium">Directional Tests</p>
                        <p className="whitespace-pre-line">{previewData.directionalTests}</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <p className="font-medium">Logic & Trip Tests</p>
                      <p className="whitespace-pre-line">{previewData.logicTests}</p>
                    </div>
                    
                    {previewData.communicationTests && (
                      <div className="mt-4">
                        <p className="font-medium">Communication Tests</p>
                        <p className="whitespace-pre-line">{previewData.communicationTests}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold">Conclusion</h3>
                    <p className="whitespace-pre-line mt-2">{previewData.conclusion}</p>
                  </div>
                  
                  {previewData.notes && (
                    <div>
                      <h3 className="text-lg font-bold">Notes</h3>
                      <p className="whitespace-pre-line mt-2">{previewData.notes}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={handleExport}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export as Word
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="relay">Relay Information</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="testDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Test Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="w-full pl-3 text-left font-normal"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter test location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relay" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relay Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="relayType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relay Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relay type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RELAY_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="relayManufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select manufacturer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RELAY_MANUFACTURERS.map((manufacturer) => (
                              <SelectItem key={manufacturer.value} value={manufacturer.value}>
                                {manufacturer.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="relayModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter relay model" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter serial number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="firmwareVersion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firmware Version</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter firmware version (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">System Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nominalFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominal Frequency (Hz)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 50 or 60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nominalCurrent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominal Current (A)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1 or 5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ctRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CT Ratio</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 100/1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ptRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PT Ratio (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 11000/110" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="pickupTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup/Threshold Tests</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter pickup test results"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timingTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timing Tests</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter timing test results"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="directionalTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Directional Tests (if applicable)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter directional test results"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="logicTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logic & Trip Tests</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter logic and trip test results"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="communicationTests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication Tests (if applicable)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter communication test results"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="conclusion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conclusion</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter test conclusion"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter any additional notes"
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle>Test Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <EquipmentForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="witnesses">
            <Card>
              <CardHeader>
                <CardTitle>Witnesses & Signatures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <WitnessForm />
                <SignatureArea />
              </CardContent>
            </Card>
          </TabsContent>
        </Form>
      </Tabs>
    </div>
  )
} 