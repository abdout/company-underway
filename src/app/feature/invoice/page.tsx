"use client"

import { useState, useEffect } from "react"
import { InvoiceForm } from "@/components/feature/invoice/invoice-form"
import { InvoiceList } from "@/components/feature/invoice/invoice-list"
import { Toaster } from "@/components/ui/sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTextIcon, ListIcon } from "lucide-react"

export default function InvoicePage() {
  // In a real app, you would fetch the engineer's info from the auth context or API
  const [engineerInfo, setEngineerInfo] = useState({
    name: "John Doe",
    id: "ENG12345"
  })
  
  // In a production app, this would fetch engineer data from an API
  // useEffect(() => {
  //   const fetchEngineerData = async () => {
  //     try {
  //       // const response = await fetch('/api/engineer/current');
  //       // const data = await response.json();
  //       // setEngineerInfo({
  //       //   name: data.name,
  //       //   id: data.id
  //       // });
  //     } catch (error) {
  //       console.error('Error fetching engineer data:', error);
  //     }
  //   };
  //   
  //   fetchEngineerData();
  // }, []);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
        <p className="text-muted-foreground">
          Submit your petty cash invoices and manage your reimbursements.
        </p>
      </div>
      
      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="submit" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />
            Submit Invoice
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ListIcon className="h-4 w-4" />
            View Invoices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <InvoiceForm 
            engineerName={engineerInfo.name}
            engineerId={engineerInfo.id}
          />
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <InvoiceList 
            engineerName={engineerInfo.name}
            engineerId={engineerInfo.id}
          />
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
} 