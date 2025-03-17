"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Paperclip, FileTextIcon, SaveIcon, DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { sidebarData } from "@/components/template/sidebar/constant"
import { EquipmentForm } from "./equipment-form"
import { WitnessForm } from "./witness-form"
import { SignatureArea } from "./signature-area"
import { generateAndSaveReport } from "@/lib/docx-generator"

// Define the form schema
const reportFormSchema = z.object({
  // Report info
  client: z.string().min(1, "Client name is required"),
  contractor: z.string().min(1, "Contractor name is required"),
  consultant: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  
  // Equipment info
  tag: z.string().min(1, "Equipment tag is required"),
  panel: z.string().min(1, "Panel ID is required"),
  
  // Test details
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  activity: z.string().min(1, "Activity is required"),
  
  // Additional info
  location: z.string().min(1, "Location is required"),
  notes: z.string().optional()
})

type ReportFormValues = z.infer<typeof reportFormSchema>

interface ReportFormProps {
  engineerName?: string
  engineerId?: string
}

export function ReportForm({
  engineerName = "Current User",
  engineerId = "ENG001",
}: ReportFormProps) {
  const [clientLogo, setClientLogo] = useState<string | null>(null)
  const [contractorLogo, setContractorLogo] = useState<string | null>(null)
  const [consultantLogo, setConsultantLogo] = useState<string | null>(null)
  
  const [equipment, setEquipment] = useState<Array<{ name: string; model: string; serialNumber: string; calibrationDate: string }>>([])
  
  const [witnesses, setWitnesses] = useState<Array<{ name: string; company: string; role: string; signature: string | null }>>([])
  
  const [activeTab, setActiveTab] = useState("basic")
  
  // Get the categories, subcategories and activities from the sidebar data
  const categories = sidebarData.map(item => item.item)
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  
  // Default values for the form
  const defaultValues: Partial<ReportFormValues> = {
    client: "",
    contractor: "Your Company Name",
    consultant: "",
    date: new Date(),
    tag: "",
    panel: "",
    category: "",
    subcategory: "",
    activity: "",
    location: "",
    notes: ""
  }
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
  })
  
  // Watch category and subcategory to update the dependent dropdowns
  const watchCategory = form.watch("category")
  const watchSubcategory = form.watch("subcategory")
  
  // Update subcategories when category changes
  React.useEffect(() => {
    if (watchCategory) {
      const categoryData = sidebarData.find(item => item.item === watchCategory)
      if (categoryData) {
        const subCats = categoryData.subitems.map(subitem => subitem.name)
        setSubcategories(subCats)
        form.setValue("subcategory", "")
        form.setValue("activity", "")
        setActivities([])
      }
    }
  }, [watchCategory, form])
  
  // Update activities when subcategory changes
  React.useEffect(() => {
    if (watchCategory && watchSubcategory) {
      const categoryData = sidebarData.find(item => item.item === watchCategory)
      if (categoryData) {
        const subcategoryData = categoryData.subitems.find(subitem => subitem.name === watchSubcategory)
        if (subcategoryData) {
          setActivities(subcategoryData.activities)
          form.setValue("activity", "")
        }
      }
    }
  }, [watchCategory, watchSubcategory, form])
  
  // Handle logo uploads
  const handleLogoUpload = (type: 'client' | 'contractor' | 'consultant', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    if (!file.type.includes('image/')) {
      toast.error("Invalid file type", {
        description: "Please upload an image file."
      })
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      if (type === 'client') setClientLogo(e.target?.result as string)
      else if (type === 'contractor') setContractorLogo(e.target?.result as string)
      else if (type === 'consultant') setConsultantLogo(e.target?.result as string)
      
      toast.success("Logo uploaded", {
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} logo has been uploaded.`
      })
    }
    reader.readAsDataURL(file)
  }
  
  function onSubmit(data: ReportFormValues) {
    try {
      // Process form submission with all the collected data
      const reportData = {
        ...data,
        clientLogo,
        contractorLogo,
        consultantLogo,
        equipment,
        witnesses,
        engineer: {
          name: engineerName,
          id: engineerId
        }
      }
      
      console.log(reportData)
      
      // In a real app, you would generate the report here
      // Either by sending the data to a backend API or
      // generating it client-side with a library like docx and file-saver
      
      toast.success("Report data ready", {
        description: "Your report data has been prepared. Ready to generate the report."
      })
      
      // Proceed to the preview tab
      setActiveTab("preview")
      
    } catch (error) {
      console.error("Error submitting report data:", error)
      toast.error("Error", {
        description: "There was an error preparing your report data. Please try again."
      })
    }
  }
  
  // Generate the report (in a real app, this would create a document)
  const handleGenerateReport = () => {
    // Get the form data
    const data = form.getValues()
    
    try {
      // Process form submission with all the collected data
      const reportData = {
        ...data,
        clientLogo,
        contractorLogo,
        consultantLogo,
        equipment,
        witnesses,
        engineer: {
          name: engineerName,
          id: engineerId
        }
      }
      
      toast.loading("Generating report...", {
        id: "generate-report"
      })
      
      // Generate filename based on tag, activity and date
      const date = format(data.date, "yyyyMMdd")
      const filename = `${data.tag}-${data.activity.replace(/\s+/g, '_')}-${date}.docx`
      
      // Generate and save the report
      generateAndSaveReport(reportData, filename).then(success => {
        if (success) {
          toast.success("Report generated", {
            id: "generate-report",
            description: "Your report has been generated and is ready for download."
          })
        } else {
          toast.error("Failed to generate report", {
            id: "generate-report",
            description: "There was an error generating your report. Please try again."
          })
        }
      })
    } catch (error) {
      console.error("Error generating report:", error)
      toast.error("Error", {
        id: "generate-report",
        description: "There was an error generating your report. Please try again."
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Test Report Generator</CardTitle>
        <CardDescription>
          Create professional testing and commissioning reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
            <TabsTrigger value="preview">Preview & Generate</TabsTrigger>
          </TabsList>
          
          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Form {...form}>
              <form className="space-y-6">
                {/* Company Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Client */}
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <Input placeholder="Client name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Client Logo</FormLabel>
                        <div className="mt-1 flex items-center gap-x-3">
                          {clientLogo ? (
                            <div className="relative h-16 w-40">
                              <img 
                                src={clientLogo} 
                                className="object-contain h-full w-full" 
                                alt="Client logo" 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm" 
                                className="absolute top-0 right-0"
                                onClick={() => setClientLogo(null)}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="relative"
                                size="sm"
                              >
                                <Paperclip className="h-4 w-4 mr-2" />
                                Upload Logo
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => handleLogoUpload('client', e)}
                                  accept="image/*"
                                />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Contractor */}
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="contractor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contractor</FormLabel>
                            <FormControl>
                              <Input placeholder="Contractor name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Contractor Logo</FormLabel>
                        <div className="mt-1 flex items-center gap-x-3">
                          {contractorLogo ? (
                            <div className="relative h-16 w-40">
                              <img 
                                src={contractorLogo} 
                                className="object-contain h-full w-full" 
                                alt="Contractor logo" 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm" 
                                className="absolute top-0 right-0"
                                onClick={() => setContractorLogo(null)}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="relative"
                                size="sm"
                              >
                                <Paperclip className="h-4 w-4 mr-2" />
                                Upload Logo
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => handleLogoUpload('contractor', e)}
                                  accept="image/*"
                                />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Consultant */}
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="consultant"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Consultant</FormLabel>
                            <FormControl>
                              <Input placeholder="Consultant name (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Consultant Logo</FormLabel>
                        <div className="mt-1 flex items-center gap-x-3">
                          {consultantLogo ? (
                            <div className="relative h-16 w-40">
                              <img 
                                src={consultantLogo} 
                                className="object-contain h-full w-full" 
                                alt="Consultant logo" 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm" 
                                className="absolute top-0 right-0"
                                onClick={() => setConsultantLogo(null)}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="relative"
                                size="sm"
                              >
                                <Paperclip className="h-4 w-4 mr-2" />
                                Upload Logo
                                <input
                                  type="file"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => handleLogoUpload('consultant', e)}
                                  accept="image/*"
                                />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Equipment/Panel Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Equipment/Panel Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment Tag</FormLabel>
                          <FormControl>
                            <Input placeholder="Equipment tag/ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="panel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Panel/Location ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Panel ID" {...field} />
                          </FormControl>
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
                            <Input placeholder="e.g. Substation A, Control Room" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Test Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
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
                  </div>
                </div>
                
                {/* Test Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Test Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={subcategories.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subcategories.map(subcategory => (
                                <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="activity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity/Test</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={activities.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activities.map(activity => (
                                <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter any additional notes about the test"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("equipment")}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          {/* Equipment Tab */}
          <TabsContent value="equipment">
            <EquipmentForm 
              equipment={equipment}
              setEquipment={setEquipment}
              onNext={() => setActiveTab("witnesses")}
              onPrevious={() => setActiveTab("basic")}
            />
          </TabsContent>
          
          {/* Witnesses Tab */}
          <TabsContent value="witnesses">
            <WitnessForm
              engineerName={engineerName}
              engineerId={engineerId}
              witnesses={witnesses}
              setWitnesses={setWitnesses}
              onNext={() => {
                // Validate form before proceeding
                const formState = form.getValues()
                const requiredFields = ["client", "contractor", "date", "tag", "panel", "category", "subcategory", "activity", "location"]
                
                for (const field of requiredFields) {
                  if (!formState[field as keyof ReportFormValues]) {
                    toast.error("Missing required fields", {
                      description: `Please complete all required fields in the Basic Info tab.`
                    })
                    // Go back to basic tab
                    setActiveTab("basic")
                    return
                  }
                }
                
                // Check if equipment is added
                if (equipment.length === 0) {
                  toast.error("No test equipment added", {
                    description: "Please add at least one piece of test equipment in the Equipment tab."
                  })
                  setActiveTab("equipment")
                  return
                }
                
                // If validation passes, trigger submit
                onSubmit(formState)
              }}
              onPrevious={() => setActiveTab("equipment")}
            />
          </TabsContent>
          
          {/* Preview Tab */}
          <TabsContent value="preview">
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Report Preview</h3>
                
                <div className="bg-white p-6 rounded border shadow-sm">
                  {/* Header with logos */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div className="space-y-1 flex-1 text-center">
                      {clientLogo && (
                        <div className="h-12 flex justify-center">
                          <img src={clientLogo} alt="Client Logo" className="h-full object-contain" />
                        </div>
                      )}
                      <p className="font-medium">{form.getValues("client") || "Client"}</p>
                    </div>
                    
                    <div className="space-y-1 flex-1 text-center">
                      {contractorLogo && (
                        <div className="h-12 flex justify-center">
                          <img src={contractorLogo} alt="Contractor Logo" className="h-full object-contain" />
                        </div>
                      )}
                      <p className="font-medium">{form.getValues("contractor") || "Contractor"}</p>
                    </div>
                    
                    {form.getValues("consultant") && (
                      <div className="space-y-1 flex-1 text-center">
                        {consultantLogo && (
                          <div className="h-12 flex justify-center">
                            <img src={consultantLogo} alt="Consultant Logo" className="h-full object-contain" />
                          </div>
                        )}
                        <p className="font-medium">{form.getValues("consultant")}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Report Title */}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Test Report</h1>
                    <h2 className="text-xl">
                      {form.getValues("activity") || "Activity"} - {form.getValues("subcategory") || "Subcategory"}
                    </h2>
                    <p className="text-muted-foreground">
                      {format(form.getValues("date") || new Date(), "PPP")}
                    </p>
                  </div>
                  
                  {/* Equipment Details */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Equipment Details</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Tag:</span> {form.getValues("tag") || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Panel:</span> {form.getValues("panel") || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {form.getValues("location") || "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Test Equipment */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Test Equipment</h3>
                    <table className="min-w-full border">
                      <thead className="bg-muted/20">
                        <tr>
                          <th className="border px-4 py-2 text-left">Equipment</th>
                          <th className="border px-4 py-2 text-left">Model</th>
                          <th className="border px-4 py-2 text-left">Serial No.</th>
                          <th className="border px-4 py-2 text-left">Calibration Due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {equipment.map((item, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.model}</td>
                            <td className="border px-4 py-2">{item.serialNumber}</td>
                            <td className="border px-4 py-2">{item.calibrationDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Test Data Section (placeholder) */}
                  <div className="mb-6 border p-4 rounded">
                    <h3 className="font-semibold mb-2">Test Data</h3>
                    <p className="text-muted-foreground">
                      This section will contain the relevant test data according to the activity selected.
                    </p>
                    <p className="text-muted-foreground">
                      In a real implementation, different test data tables would be shown based on the selected activity.
                    </p>
                  </div>
                  
                  {/* Notes */}
                  {form.getValues("notes") && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Notes</h3>
                      <p className="whitespace-pre-wrap border p-2 rounded">
                        {form.getValues("notes")}
                      </p>
                    </div>
                  )}
                  
                  {/* Signatures */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Approvals</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Engineer */}
                      <div className="border p-4 rounded">
                        <p className="font-medium">Engineer</p>
                        <p>{engineerName}</p>
                        <div className="h-20 border-b my-2"></div>
                        <p className="text-xs text-muted-foreground">Signature & Date</p>
                      </div>
                      
                      {/* Client Witness */}
                      <div className="border p-4 rounded">
                        <p className="font-medium">Client Witness</p>
                        <p>{witnesses.find(w => w.company === "Client")?.name || "[Name]"}</p>
                        <div className="h-20 border-b my-2"></div>
                        <p className="text-xs text-muted-foreground">Signature & Date</p>
                      </div>
                      
                      {/* Consultant Witness */}
                      <div className="border p-4 rounded">
                        <p className="font-medium">Consultant Witness</p>
                        <p>{witnesses.find(w => w.company === "Consultant")?.name || "[Name]"}</p>
                        <div className="h-20 border-b my-2"></div>
                        <p className="text-xs text-muted-foreground">Signature & Date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("witnesses")}
                >
                  Previous
                </Button>
                
                <Button 
                  type="button" 
                  onClick={handleGenerateReport}
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 