"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { SaveIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExtractedRelayData } from "./pdf-extractor"

// Define the form schema
const settingsFormSchema = z.object({
  // Relay information
  relayType: z.string().min(1, "Relay type is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  firmwareVersion: z.string().optional(),
  
  // System parameters
  nominalFrequency: z.string().min(1, "Nominal frequency is required"),
  nominalCurrent: z.string().min(1, "Nominal current is required"),
  ctRatio: z.string().min(1, "CT ratio is required"),
  ptRatio: z.string().optional(),
  
  // Settings depend on relay type, using a dynamic approach
  setting1Name: z.string().min(1, "Setting name is required"),
  setting1Value: z.string().min(1, "Setting value is required"),
  setting2Name: z.string().min(1, "Setting name is required"),
  setting2Value: z.string().min(1, "Setting value is required"),
  setting3Name: z.string().min(1, "Setting name is required"),
  setting3Value: z.string().min(1, "Setting value is required"),
  setting4Name: z.string().optional(),
  setting4Value: z.string().optional(),
  setting5Name: z.string().optional(),
  setting5Value: z.string().optional(),
  
  // Notes
  notes: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

interface SettingsFormProps {
  engineerName?: string
  engineerId?: string
  extractedData: ExtractedRelayData | null
}

export function SettingsForm({
  engineerName = "Current User",
  engineerId = "ENG001",
  extractedData
}: SettingsFormProps) {
  
  // Default values for the form
  const defaultValues: Partial<SettingsFormValues> = {
    relayType: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    firmwareVersion: "",
    nominalFrequency: "50 Hz",
    nominalCurrent: "1 A",
    ctRatio: "100/1",
    ptRatio: "11000/110",
    setting1Name: "",
    setting1Value: "",
    setting2Name: "",
    setting2Value: "",
    setting3Name: "",
    setting3Value: "",
    setting4Name: "",
    setting4Value: "",
    setting5Name: "",
    setting5Value: "",
    notes: "",
  }
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })
  
  // Update form values when extractedData changes
  useEffect(() => {
    if (extractedData) {
      // Update relay info
      form.setValue('relayType', extractedData.relayType || "")
      form.setValue('manufacturer', extractedData.manufacturer || "")
      form.setValue('model', extractedData.model || "")
      form.setValue('serialNumber', extractedData.serialNumber || "")
      form.setValue('firmwareVersion', extractedData.firmwareVersion || "")
      
      // Update system parameters
      form.setValue('nominalFrequency', extractedData.nominalFrequency || "50 Hz")
      form.setValue('nominalCurrent', extractedData.nominalCurrent || "1 A")
      form.setValue('ctRatio', extractedData.ctRatio || "100/1")
      form.setValue('ptRatio', extractedData.ptRatio || "")
      
      // Update settings
      const settings = Object.entries(extractedData.settings)
      settings.slice(0, 5).forEach((setting, index) => {
        const [name, data] = setting
        form.setValue(`setting${index + 1}Name` as any, name)
        form.setValue(`setting${index + 1}Value` as any, data.value)
      })
      
      toast.success("Form updated with extracted data", {
        description: "The form has been pre-filled with the extracted values."
      })
    }
  }, [extractedData, form])
  
  function onSubmit(data: SettingsFormValues) {
    try {
      // Process form submission
      console.log(data)
      // Here you would typically send the data to your backend
      
      // Mock successful submission
      toast.success("Settings saved successfully", {
        description: "Your relay settings have been saved."
      })
    } catch (error) {
      console.error("Error submitting settings:", error)
      toast.error("Error", {
        description: "There was an error saving your settings. Please try again."
      })
    }
  }
  
  const relayTypes = [
    "Overcurrent", 
    "Differential", 
    "Distance", 
    "Earth Fault", 
    "Motor Protection",
    "Generator Protection",
    "Transformer Protection",
    "Bus Protection",
    "Line Protection",
    "Recloser",
    "Voltage"
  ]
  
  const manufacturers = [
    "ABB", 
    "Siemens", 
    "GE", 
    "Schneider Electric", 
    "SEL", 
    "Alstom", 
    "Mitsubishi",
    "Basler",
    "Beckwith",
    "Eaton",
    "Other"
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Relay Settings Form</CardTitle>
        <CardDescription>Enter relay settings for testing and commissioning report</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Engineer Details */}
            <div>
              <h3 className="text-lg font-medium mb-2">Engineer Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name: {engineerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID: {engineerId}</p>
                </div>
              </div>
            </div>
            
            {/* Relay Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Relay Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="relayType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relay Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relay type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {relayTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manufacturer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {manufacturers.map(manufacturer => (
                            <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. REF615" {...field} />
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
                        <Input placeholder="e.g. AB-12345" {...field} />
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
                        <Input placeholder="e.g. 1.2.3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* System Parameters */}
            <div>
              <h3 className="text-lg font-medium mb-4">System Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nominalFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Frequency</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="50 Hz">50 Hz</SelectItem>
                          <SelectItem value="60 Hz">60 Hz</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nominalCurrent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Current</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 A">1 A</SelectItem>
                          <SelectItem value="5 A">5 A</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="e.g. 100/1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Format: Primary/Secondary
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ptRatio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PT Ratio</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 11000/110" {...field} />
                      </FormControl>
                      <FormDescription>
                        Format: Primary/Secondary
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Relay Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4">Relay Settings</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`setting${index}Name` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setting {index} Name</FormLabel>
                          <FormControl>
                            <Input placeholder={`e.g. Pickup Current`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`setting${index}Value` as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setting {index} Value</FormLabel>
                          <FormControl>
                            <Input placeholder={`e.g. 1.2 In`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional notes about the relay settings"
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
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 