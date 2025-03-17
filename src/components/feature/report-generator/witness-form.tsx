"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PlusCircleIcon, Trash2Icon, UserPlusIcon } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SignatureArea } from "./signature-area"

// Define the witness form schema
const witnessFormSchema = z.object({
  name: z.string().min(1, "Witness name is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
})

type WitnessFormValues = z.infer<typeof witnessFormSchema>

interface WitnessFormProps {
  engineerName: string
  engineerId: string
  witnesses: Array<{ 
    name: string
    company: string
    role: string
    signature: string | null 
  }>
  setWitnesses: React.Dispatch<React.SetStateAction<Array<{ 
    name: string
    company: string
    role: string
    signature: string | null
  }>>>
  onNext: () => void
  onPrevious: () => void
}

export function WitnessForm({
  engineerName,
  engineerId,
  witnesses,
  setWitnesses,
  onNext,
  onPrevious,
}: WitnessFormProps) {
  const [currentSignature, setCurrentSignature] = useState<string | null>(null)
  
  // Default values for the form
  const defaultValues: Partial<WitnessFormValues> = {
    name: "",
    company: "",
    role: "",
  }
  
  const form = useForm<WitnessFormValues>({
    resolver: zodResolver(witnessFormSchema),
    defaultValues,
  })
  
  function onSubmit(data: WitnessFormValues) {
    try {
      // Add to witnesses list with signature
      setWitnesses([...witnesses, {
        ...data,
        signature: currentSignature
      }])
      
      // Reset form and signature
      form.reset()
      setCurrentSignature(null)
      
      toast.success("Witness added", {
        description: "Witness has been added to your report."
      })
      
    } catch (error) {
      console.error("Error adding witness:", error)
      toast.error("Error", {
        description: "There was an error adding the witness. Please try again."
      })
    }
  }
  
  // Delete witness at index
  const handleDeleteWitness = (index: number) => {
    const newWitnesses = [...witnesses]
    newWitnesses.splice(index, 1)
    setWitnesses(newWitnesses)
    
    toast.success("Witness removed", {
      description: "Witness has been removed from your report."
    })
  }
  
  // Witness presets
  const addClientWitness = () => {
    form.setValue("company", "Client")
    form.setValue("role", "Client Representative")
    // Focus the name field
    document.getElementById("witnessName")?.focus()
  }
  
  const addConsultantWitness = () => {
    form.setValue("company", "Consultant")
    form.setValue("role", "Inspection Engineer")
    // Focus the name field
    document.getElementById("witnessName")?.focus()
  }
  
  const addContractorWitness = () => {
    form.setValue("company", "Contractor")
    form.setValue("role", "Supervisor")
    // Focus the name field
    document.getElementById("witnessName")?.focus()
  }
  
  // Validate and proceed with form submission
  const validateAndProceed = () => {
    // Client witness is typically required
    const hasClientWitness = witnesses.some(w => w.company === "Client")
    
    if (!hasClientWitness) {
      toast.warning("Missing client witness", {
        description: "It's recommended to have a client witness for the test report. Do you want to continue anyway?",
        action: {
          label: "Continue",
          onClick: () => onNext()
        }
      })
      return
    }
    
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Witnesses</h3>
        <p className="text-muted-foreground mb-6">
          Add witnesses who were present during the test. A client witness is typically required.
        </p>
        
        {/* Quick buttons */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Quick Add:</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={addClientWitness}
            >
              + Client Witness
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={addConsultantWitness}
            >
              + Consultant Witness
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={addContractorWitness}
            >
              + Contractor Witness
            </Button>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Witness Name</FormLabel>
                    <FormControl>
                      <Input id="witnessName" placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Client">Client</SelectItem>
                        <SelectItem value="Consultant">Consultant</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                        <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Project Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Signature Area */}
            <div className="mb-4">
              <FormLabel>Signature (optional)</FormLabel>
              <SignatureArea 
                signature={currentSignature}
                setSignature={setCurrentSignature}
              />
            </div>
            
            <Button type="submit">
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add Witness
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Witnesses Table */}
      <div>
        <h3 className="text-lg font-medium mb-4">Added Witnesses</h3>
        {witnesses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Signature</TableHead>
                <TableHead className="w-[50px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {witnesses.map((witness, index) => (
                <TableRow key={index}>
                  <TableCell>{witness.name}</TableCell>
                  <TableCell>{witness.company}</TableCell>
                  <TableCell>{witness.role}</TableCell>
                  <TableCell>
                    {witness.signature ? (
                      <div className="h-12 w-32 border rounded overflow-hidden">
                        <img 
                          src={witness.signature} 
                          alt="Signature" 
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No signature</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWitness(index)}
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
              No witnesses added yet. Add at least one witness from the client.
            </p>
          </div>
        )}
      </div>
      
      {/* Engineer Signature */}
      <div className="pt-4 border-t">
        <h3 className="text-lg font-medium mb-4">Engineer Signature</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="font-medium">{engineerName}</p>
            <p className="text-muted-foreground text-sm">ID: {engineerId}</p>
          </div>
          <div className="flex-1">
            <SignatureArea
              label="Your Signature"
              description="This will be added to the final report"
              signature={null} 
              setSignature={() => {}}
              readOnly
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Note: The engineer signature will be captured when generating the final report.
        </p>
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
          Preview Report
        </Button>
      </div>
    </div>
  )
} 