"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, CameraIcon, UploadIcon, SaveIcon } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { InvoiceExtractor } from "./invoice-extractor"

// Define the form schema using zod
const invoiceFormSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  invoiceNumber: z.string({
    required_error: "Invoice number is required",
  }).min(3, "Invoice number must be at least 3 characters"),
  vendorName: z.string({
    required_error: "Vendor name is required",
  }).min(2, "Vendor name must be at least 2 characters"),
  totalAmount: z.string({
    required_error: "Total amount is required",
  }).refine((val) => !isNaN(parseFloat(val)), {
    message: "Total amount must be a valid number",
  }),
  purpose: z.string().optional(),
  invoiceImage: z.string().optional(),
})

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

// Default values for the form
const defaultValues: Partial<InvoiceFormValues> = {
  date: new Date(),
  purpose: "",
  invoiceImage: "",
}

export function InvoiceForm({ 
  engineerName = "Current User",
  engineerId = "ENG001" 
}: { 
  engineerName?: string,
  engineerId?: string
}) {
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null)
  const [invoicePreview, setInvoicePreview] = useState<string | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)
  
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  })

  function onSubmit(data: InvoiceFormValues) {
    try {
      // Process form submission
      console.log(data)
      // Here you would typically send the data to your backend
      // api.submitPettyCash(data).then(() => {
      //   toast.success("Petty cash request submitted", {
      //     description: "Your petty cash request has been submitted for approval.",
      //   })
      //   form.reset(defaultValues)
      //   setInvoicePreview(null)
      //   setInvoiceFile(null)
      // })
      
      // Mock successful submission
      toast.success("Petty cash request submitted", {
        description: "Your petty cash request has been submitted for approval.",
      })
      form.reset(defaultValues)
      setInvoicePreview(null)
      setInvoiceFile(null)
    } catch (error) {
      console.error("Error submitting petty cash request:", error)
      toast.error("Error", {
        description: "There was an error submitting your petty cash request. Please try again.",
      })
    }
  }

  // Handle image upload or camera capture
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file)
      setInvoicePreview(imageUrl)
      setInvoiceFile(file)
      setIsExtracting(true)
    }
  }

  // Handle camera capture
  const handleCameraCapture = () => {
    // In a real implementation, this would open the device camera
    // For now, just trigger the file upload input
    document.getElementById("invoice-image-upload")?.click()
  }
  
  // Handle extracted data from OCR
  const handleExtractedData = (data: any) => {
    setIsExtracting(false)
    
    if (data.invoiceNumber) {
      form.setValue("invoiceNumber", data.invoiceNumber)
    }
    
    if (data.vendorName) {
      form.setValue("vendorName", data.vendorName)
    }
    
    if (data.totalAmount) {
      form.setValue("totalAmount", data.totalAmount)
    }
    
    if (data.date) {
      try {
        form.setValue("date", new Date(data.date))
      } catch (e) {
        console.error("Invalid date format:", e)
      }
    }
    
    toast.success("Invoice data extracted", {
      description: "Invoice data has been automatically extracted. Please verify and adjust if needed.",
    })
  }
  
  // Handle extraction error
  const handleExtractionError = (error: string) => {
    setIsExtracting(false)
    toast.error("Extraction error", {
      description: error,
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Petty Cash Form</CardTitle>
        <CardDescription>Submit invoice details for petty cash reimbursement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">Engineer Details</h3>
              <p className="text-sm text-muted-foreground">Name: {engineerName}</p>
              <p className="text-sm text-muted-foreground">ID: {engineerId}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleCameraCapture}
              >
                <CameraIcon className="mr-2 h-4 w-4" />
                Capture Invoice
              </Button>
              <div className="relative">
                <Button 
                  type="button" 
                  variant="outline"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Invoice
                  <input
                    id="invoice-image-upload"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </Button>
              </div>
            </div>
          </div>

          {invoicePreview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Invoice Preview</h3>
              <div className="border rounded-md overflow-hidden">
                <img 
                  src={invoicePreview} 
                  alt="Invoice Preview" 
                  className="max-h-64 max-w-full mx-auto object-contain"
                />
              </div>
            </div>
          )}
          
          {isExtracting && invoiceFile && (
            <InvoiceExtractor 
              imageFile={invoiceFile}
              onExtracted={handleExtractedData}
              onError={handleExtractionError}
            />
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Invoice Date</FormLabel>
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

                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input placeholder="INV-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vendorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Vendor Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose/Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the purpose of this expense" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                <SaveIcon className="mr-2 h-4 w-4" />
                Submit Petty Cash Request
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
} 