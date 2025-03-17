"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { 
  Calendar as CalendarIcon, 
  SearchIcon, 
  FilterIcon,
  EyeIcon 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { InvoiceExport } from "./invoice-export"

// Mock invoice data
const generateMockInvoices = (month: Date) => {
  const year = month.getFullYear();
  const monthNum = month.getMonth();
  
  const statuses = ["Pending", "Approved", "Rejected"];
  const vendors = ["Office Supplies Co.", "Tech Solutions", "Stationery World", "Coffee Shop", "Hardware Store"];
  
  const invoices = [];
  const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
  
  // Generate 10-15 invoices for the month
  const numInvoices = Math.floor(Math.random() * 6) + 10;
  
  for (let i = 0; i < numInvoices; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const invoiceDate = new Date(year, monthNum, day);
    
    // Skip if it's a Friday (5)
    if (invoiceDate.getDay() === 5) continue;
    
    invoices.push({
      id: `INV-${year}${monthNum + 1}${day}-${i + 1}`,
      date: invoiceDate,
      vendorName: vendors[Math.floor(Math.random() * vendors.length)],
      totalAmount: (Math.random() * 500 + 20).toFixed(2),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      purpose: "Office supplies and equipment",
      hasImage: Math.random() > 0.2, // 80% chance to have an image
    });
  }
  
  // Sort by date, newest first
  return invoices.sort((a, b) => b.date.getTime() - a.date.getTime());
};

interface Invoice {
  id: string;
  date: Date;
  vendorName: string;
  totalAmount: string;
  status: string;
  purpose: string;
  hasImage: boolean;
}

export function InvoiceList({ 
  engineerName = "Current User",
  engineerId = "ENG001" 
}: { 
  engineerName?: string,
  engineerId?: string
}) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Fetch invoices when month changes
  useEffect(() => {
    // In a real app, this would be an API call
    // fetchInvoices(engineerId, selectedMonth)
    //   .then(data => setInvoices(data))
    //   .catch(error => {
    //     console.error('Error fetching invoices:', error);
    //     toast.error('Failed to load invoices');
    //   });
    
    // For demo purposes, generate mock data
    const mockData = generateMockInvoices(selectedMonth);
    setInvoices(mockData);
  }, [selectedMonth, engineerId]);
  
  // Filter invoices based on search and status filter
  const filteredInvoices = invoices.filter(invoice => {
    // Status filter
    if (filterStatus !== "all" && invoice.status !== filterStatus) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        invoice.id.toLowerCase().includes(query) ||
        invoice.vendorName.toLowerCase().includes(query) ||
        invoice.purpose.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle>Invoice List</CardTitle>
        <CardDescription>View and manage your submitted invoices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-none">Month</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px]">
                    {format(selectedMonth, "MMMM yyyy")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
            
            <div className="flex flex-wrap gap-2 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none">Status</label>
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none">Search</label>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search invoices..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <InvoiceExport 
                data={{
                  invoices: filteredInvoices,
                  month: selectedMonth,
                  engineerName,
                  engineerId
                }}
              />
            </div>
          </div>
          
          {/* Invoices Table */}
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                {filteredInvoices.length === 0 
                  ? "No invoices found for the selected criteria" 
                  : `Showing ${filteredInvoices.length} of ${invoices.length} invoices for ${format(selectedMonth, "MMMM yyyy")}`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{format(invoice.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{invoice.vendorName}</TableCell>
                    <TableCell className="text-right">
                      ${Number(invoice.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(invoice.status))}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Invoice Details - {invoice.id}</DialogTitle>
                            <DialogDescription>
                              View complete invoice information
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedInvoice && (
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-sm font-medium">Date</p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(selectedInvoice.date, "PPP")}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <Badge className={cn(getStatusColor(selectedInvoice.status))}>
                                    {selectedInvoice.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Vendor</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedInvoice.vendorName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Amount</p>
                                  <p className="text-sm text-muted-foreground">
                                    ${Number(selectedInvoice.totalAmount).toFixed(2)}
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm font-medium">Purpose</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedInvoice.purpose}
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm font-medium">Submitted by</p>
                                  <p className="text-sm text-muted-foreground">
                                    {engineerName} ({engineerId})
                                  </p>
                                </div>
                                
                                {selectedInvoice.hasImage && (
                                  <div className="col-span-2 mt-2">
                                    <p className="text-sm font-medium mb-2">Invoice Image</p>
                                    <div className="h-40 bg-neutral-100 rounded flex items-center justify-center">
                                      <p className="text-muted-foreground text-sm">
                                        [Invoice image placeholder]
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="secondary">Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 