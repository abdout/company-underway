"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { format, getDay, addDays, startOfMonth, endOfMonth } from "date-fns"
import { CalendarIcon, PlusCircleIcon, SaveIcon, FileSpreadsheetIcon } from "lucide-react"
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { TimesheetExport } from "./timesheet-export"

// Define the form schema using zod
const timesheetEntrySchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  day: z.string(),
  month: z.string(),
  year: z.string(),
  workDescription: z.string().min(1, "Work description is required"),
  normalHours: z.coerce.number().min(0, "Hours must be positive").max(24, "Hours cannot exceed 24"),
  overtimeHours: z.coerce.number().min(0, "Hours must be positive").max(24, "Hours cannot exceed 24"),
  remarks: z.string().optional(),
})

const timesheetFormSchema = z.object({
  month: z.date({
    required_error: "Month is required",
  }),
  entries: z.array(timesheetEntrySchema),
})

type TimesheetFormValues = z.infer<typeof timesheetFormSchema>

// Helper to generate dates for the month
const generateMonthDates = (month: Date) => {
  const start = startOfMonth(month)
  const end = endOfMonth(month)
  
  const dates: Date[] = []
  let currentDate = start
  
  while (currentDate <= end) {
    // Skip Fridays (day 5) as they are holidays
    if (getDay(currentDate) !== 5) {
      dates.push(new Date(currentDate))
    }
    currentDate = addDays(currentDate, 1)
  }
  
  return dates
}

// Convert a date to day, month, year strings
const dateToComponents = (date: Date) => {
  return {
    day: date.getDate().toString(),
    month: (date.getMonth() + 1).toString(),  // Month is 0-indexed in JS
    year: date.getFullYear().toString(),
  }
}

export function TimesheetForm({
  engineerName = "Current User",
  engineerId = "ENG001"
}: {
  engineerName?: string,
  engineerId?: string
}) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  
  // Initialize the form
  const form = useForm<TimesheetFormValues>({
    resolver: zodResolver(timesheetFormSchema),
    defaultValues: {
      month: new Date(),
      entries: [],
    },
  })
  
  // Setup field array for timesheet entries
  const { fields, append, remove } = useFieldArray({
    name: "entries",
    control: form.control,
  })
  
  // Total hours calculation
  const entries = form.watch("entries")
  const [totalNormalHours, setTotalNormalHours] = useState(0)
  const [totalOvertimeHours, setTotalOvertimeHours] = useState(0)
  
  // Update totals when entries change
  useEffect(() => {
    const normalSum = entries.reduce((sum, entry) => sum + (entry.normalHours || 0), 0)
    const overtimeSum = entries.reduce((sum, entry) => sum + (entry.overtimeHours || 0), 0)
    
    setTotalNormalHours(normalSum)
    setTotalOvertimeHours(overtimeSum)
  }, [entries])
  
  // Generate or update entries when month changes
  useEffect(() => {
    // Get all workdays for the selected month
    const monthDates = generateMonthDates(selectedMonth)
    
    // Create new entries array
    const newEntries = monthDates.map(date => {
      // Default to 8 normal hours for workdays
      return {
        date,
        ...dateToComponents(date),
        workDescription: "",
        normalHours: 8,
        overtimeHours: 0,
        remarks: "",
      }
    })
    
    // Update form values
    form.setValue("month", selectedMonth)
    form.setValue("entries", newEntries)
  }, [selectedMonth, form])

  function onSubmit(data: TimesheetFormValues) {
    try {
      console.log(data)
      // Here you would typically send the data to your backend
      // api.submitTimesheet(data).then(() => {
      //   toast.success("Timesheet submitted successfully", {
      //     description: "Your timesheet has been saved and submitted for approval."
      //   })
      // })
      toast.success("Timesheet submitted successfully", {
        description: "Your timesheet has been saved and submitted for approval."
      })
    } catch (error) {
      console.error('Error submitting timesheet:', error)
      toast.error("Error submitting timesheet", {
        description: "There was a problem submitting your timesheet. Please try again."
      })
    }
  }
  
  function exportToExcel() {
    // In a real app, this would generate an Excel file with the timesheet data
    alert("Timesheet exported to Excel")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Timesheet</CardTitle>
        <CardDescription>Record your working hours for the month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h3 className="text-lg font-medium">Engineer Details</h3>
              <p className="text-sm text-muted-foreground">Name: {engineerName}</p>
              <p className="text-sm text-muted-foreground">ID: {engineerId}</p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select Month</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {selectedMonth ? (
                      format(selectedMonth, "MMMM yyyy")
                    ) : (
                      <span>Select month</span>
                    )}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedMonth}
                    onSelect={(date) => date && setSelectedMonth(date)}
                    initialFocus
                    month={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    captionLayout="dropdown-buttons"
                    fromYear={2020}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Table>
                <TableCaption>Timesheet for {format(selectedMonth, "MMMM yyyy")}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Work Description</TableHead>
                    <TableHead className="w-[120px] text-center">Normal Hours</TableHead>
                    <TableHead className="w-[120px] text-center">Overtime Hours</TableHead>
                    <TableHead className="w-[150px]">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        {format(new Date(form.watch(`entries.${index}.date`)), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`entries.${index}.workDescription`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Work carried out" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`entries.${index}.normalHours`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  className="text-center" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`entries.${index}.overtimeHours`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  className="text-center" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`entries.${index}.remarks`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Remarks" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {/* Totals row */}
                  <TableRow className="font-medium">
                    <TableCell colSpan={2} className="text-right">
                      Total Hours:
                    </TableCell>
                    <TableCell className="text-center">
                      {totalNormalHours}
                    </TableCell>
                    <TableCell className="text-center">
                      {totalOvertimeHours}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-between mt-6">
                <TimesheetExport 
                  data={{
                    engineerName,
                    engineerId,
                    month: selectedMonth,
                    entries: form.watch("entries")
                  }} 
                />
                
                <Button type="submit">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Timesheet
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
} 