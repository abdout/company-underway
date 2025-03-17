"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Define the equipment form schema
const equipmentFormSchema = z.object({
  name: z.string().min(1, "Equipment name is required"),
  model: z.string().min(1, "Model number is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  calibrationDate: z.date({
    required_error: "Calibration date is required",
  }),
})

type EquipmentFormValues = z.infer<typeof equipmentFormSchema>

interface EquipmentFormProps {
  equipment: Array<{ 
    name: string
    model: string
    serialNumber: string
    calibrationDate: string
  }>
  setEquipment: React.Dispatch<React.SetStateAction<Array<{ 
    name: string
    model: string
    serialNumber: string
    calibrationDate: string
  }>>>
  onNext: () => void
  onPrevious: () => void
}

export function EquipmentForm({
  equipment,
  setEquipment,
  onNext,
  onPrevious,
}: EquipmentFormProps) {
  // Default values for the form
  const defaultValues: Partial<EquipmentFormValues> = {
    name: "",
    model: "",
    serialNumber: "",
    calibrationDate: new Date(),
  }
  
  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentFormSchema),
    defaultValues,
  })
  
  function onSubmit(data: EquipmentFormValues) {
    try {
      // Format the date to string
      const formattedData = {
        ...data,
        calibrationDate: format(data.calibrationDate, "yyyy-MM-dd")
      }
      
      // Add to equipment list
      setEquipment([...equipment, formattedData])
      
      // Reset form
      form.reset()
      
      toast.success("Equipment added", {
        description: "Test equipment has been added to your report."
      })
      
    } catch (error) {
      console.error("Error adding equipment:", error)
      toast.error("Error", {
        description: "There was an error adding the equipment. Please try again."
      })
    }
  }
  
  // Delete equipment at index
  const handleDeleteEquipment = (index: number) => {
    const newEquipment = [...equipment]
    newEquipment.splice(index, 1)
    setEquipment(newEquipment)
    
    toast.success("Equipment removed", {
      description: "Test equipment has been removed from your report."
    })
  }
  
  // Common test equipment presets for quick addition
  const equipmentPresets = [
    {
      name: "Multimeter",
      model: "Fluke 87V",
      serialNumber: "MM-",
      calibrationDate: new Date()
    },
    {
      name: "Relay Test Set",
      model: "Omicron CMC 356",
      serialNumber: "RTS-",
      calibrationDate: new Date()
    },
    {
      name: "Power Quality Analyzer",
      model: "Fluke 435 Series II",
      serialNumber: "PQA-",
      calibrationDate: new Date()
    },
    {
      name: "Insulation Tester",
      model: "Megger MIT1025",
      serialNumber: "IT-",
      calibrationDate: new Date()
    }
  ]
  
  // Apply a preset to the form
  const applyPreset = (preset: typeof equipmentPresets[0]) => {
    form.setValue("name", preset.name)
    form.setValue("model", preset.model)
    form.setValue("serialNumber", preset.serialNumber)
    form.setValue("calibrationDate", preset.calibrationDate)
    
    // Focus the serial number field for completion
    document.getElementById("serialNumber")?.focus()
  }
  
  const validateAndProceed = () => {
    if (equipment.length === 0) {
      toast.error("No test equipment added", {
        description: "Please add at least one piece of test equipment before proceeding."
      })
      return
    }
    
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Test Equipment</h3>
        <p className="text-muted-foreground mb-6">
          Add the test equipment used for this testing activity. All test equipment must have valid calibration certificates.
        </p>
        
        {/* Quick presets */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Common Equipment Presets:</h4>
          <div className="flex flex-wrap gap-2">
            {equipmentPresets.map((preset, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Equipment name" {...field} />
                    </FormControl>
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
                      <Input placeholder="Model number" {...field} />
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
                      <Input id="serialNumber" placeholder="Serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="calibrationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Calibration Due Date</FormLabel>
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
            
            <Button type="submit">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Equipment Table */}
      <div>
        <h3 className="text-lg font-medium mb-4">Added Equipment</h3>
        {equipment.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Calibration Due</TableHead>
                <TableHead className="w-[50px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.calibrationDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEquipment(index)}
                    >
                      <Trash2Icon className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 border rounded-md bg-muted/10">
            <p className="text-muted-foreground">
              No equipment added yet. Add at least one piece of test equipment.
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
        >
          Previous
        </Button>
        
        <Button 
          type="button" 
          onClick={validateAndProceed}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 