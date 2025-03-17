"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Toaster } from "@/components/ui/sonner"
import { 
  FileIcon, 
  FolderIcon, 
  SearchIcon, 
  DownloadIcon, 
  TrashIcon, 
  FilterIcon, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Document interface
interface Document {
  id: string
  name: string
  type: "report" | "pdf"
  category: string
  size: string
  createdAt: Date
  createdBy: string
}

// Mock document data
const mockDocuments = [
  {
    id: "doc-001",
    name: "Differential Relay Test Report.docx",
    type: "report",
    category: "relay",
    size: "245 KB",
    createdAt: new Date(2023, 9, 15),
    createdBy: "John Doe"
  },
  {
    id: "doc-002",
    name: "Cable Test Results.docx",
    type: "report",
    category: "cable",
    size: "312 KB",
    createdAt: new Date(2023, 8, 22),
    createdBy: "Jane Smith"
  },
  {
    id: "doc-003",
    name: "Relay Settings - Substation A.pdf",
    type: "pdf",
    category: "relay",
    size: "1.2 MB",
    createdAt: new Date(2023, 7, 5),
    createdBy: "Robert Johnson"
  },
  {
    id: "doc-004",
    name: "Motor Protection Relay Configuration.pdf",
    type: "pdf",
    category: "relay",
    size: "843 KB",
    createdAt: new Date(2023, 10, 3),
    createdBy: "John Doe"
  },
  {
    id: "doc-005",
    name: "Overcurrent Protection Settings.pdf",
    type: "pdf",
    category: "relay",
    size: "756 KB",
    createdAt: new Date(2023, 9, 28),
    createdBy: "Alice Brown"
  },
  {
    id: "doc-006",
    name: "Transformer Test Report.docx",
    type: "report",
    category: "transformer",
    size: "275 KB",
    createdAt: new Date(2023, 10, 12),
    createdBy: "John Doe"
  },
]

// Sort options
type SortField = "name" | "createdAt" | "size" | "createdBy"
type SortDirection = "asc" | "desc"

export default function DocumentLibraryPage() {
  // State
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  
  // Load documents
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDocuments = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Get documents from localStorage or use mock data
        const savedDocuments = localStorage.getItem("document-library")
        if (savedDocuments) {
          const parsedDocs = JSON.parse(savedDocuments)
          // Convert date strings back to Date objects
          setDocuments(parsedDocs.map((doc: any) => ({
            ...doc,
            createdAt: new Date(doc.createdAt)
          })))
        } else {
          setDocuments(mockDocuments)
        }
      } catch (error) {
        console.error("Error fetching documents:", error)
        toast.error("Failed to load documents", {
          description: "There was an error loading your documents"
        })
        setDocuments(mockDocuments)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDocuments()
  }, [])
  
  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (documents.length > 0 && !isLoading) {
      try {
        localStorage.setItem("document-library", JSON.stringify(documents))
      } catch (error) {
        console.error("Error saving documents:", error)
      }
    }
  }, [documents, isLoading])
  
  // Extract categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    documents.forEach(doc => uniqueCategories.add(doc.category))
    return Array.from(uniqueCategories)
  }, [documents])
  
  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    return documents
      .filter(doc => {
        // Text search
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        
        // Category filter
        const matchesCategory = selectedCategories.length === 0 || 
                               selectedCategories.includes(doc.category)
        
        // Tab filter
        const matchesTab = activeTab === "all" || 
                         (activeTab === "reports" && doc.type === "report") ||
                         (activeTab === "pdfs" && doc.type === "pdf") ||
                         (activeTab === "relay" && doc.category === "relay")
        
        return matchesSearch && matchesCategory && matchesTab
      })
      .sort((a, b) => {
        // Handle different field types
        if (sortField === "createdAt") {
          return sortDirection === "asc" 
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime()
        } else if (sortField === "size") {
          // Parse size strings like "1.2 MB" or "245 KB"
          const getSizeInKB = (size: string) => {
            const value = parseFloat(size)
            return size.includes("MB") ? value * 1024 : value
          }
          
          const sizeA = getSizeInKB(a.size)
          const sizeB = getSizeInKB(b.size)
          
          return sortDirection === "asc" ? sizeA - sizeB : sizeB - sizeA
        } else {
          // String comparison for name and createdBy
          const valueA = a[sortField].toLowerCase()
          const valueB = b[sortField].toLowerCase()
          
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
        }
      })
  }, [documents, searchTerm, activeTab, sortField, sortDirection, selectedCategories])
  
  // Handler for toggling sort direction
  const toggleSort = useCallback((field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }, [sortField])
  
  // Handler for toggling category selection
  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }, [])
  
  // Handler for document deletion
  const handleDeleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    setConfirmDelete(null)
    
    toast.success("Document deleted", {
      description: "The document has been removed from your library"
    })
  }, [])
  
  // Handler for document download
  const handleDownloadDocument = useCallback((doc: Document) => {
    // In a real app, this would trigger an API call to download the document
    toast.info("Downloading document...", {
      description: `Preparing ${doc.name} for download`
    })
    
    // Simulate download delay
    setTimeout(() => {
      toast.success("Download complete", {
        description: `${doc.name} has been downloaded successfully`
      })
    }, 1500)
  }, [])
  
  // Get file icon based on document type
  const getFileIcon = useCallback((doc: Document) => {
    if (doc.type === "report") {
      return <FileIcon className="h-5 w-5 text-blue-500" />
    } else if (doc.type === "pdf") {
      return <FileIcon className="h-5 w-5 text-red-500" />
    }
    return <FileIcon className="h-5 w-5" />
  }, [])
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-10 w-80" />
        </div>
        
        <Skeleton className="h-12 w-full" />
        
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    )
  }
  
  // Categories are empty
  const noCategories = categories.length === 0
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <FolderIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Document Library</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full sm:w-[300px] pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className={selectedCategories.length > 0 ? "relative" : ""}>
                <FilterIcon className="h-4 w-4" />
                {selectedCategories.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("all")}>
                All Documents
                {activeTab === "all" && <CheckCircle2 className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("reports")}>
                Reports
                {activeTab === "reports" && <CheckCircle2 className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("pdfs")}>
                PDFs
                {activeTab === "pdfs" && <CheckCircle2 className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center justify-between">
                Categories
                {selectedCategories.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCategories([])
                    }}
                  >
                    Clear
                  </Button>
                )}
              </DropdownMenuLabel>
              
              {categories.map(category => (
                <DropdownMenuItem 
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className="flex items-center"
                >
                  <span className="capitalize">{category}</span>
                  {selectedCategories.includes(category) && (
                    <CheckCircle2 className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
              
              {noCategories && (
                <div className="py-2 px-2 text-xs text-muted-foreground">
                  No categories found
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleSort("name")} className="flex items-center">
                Name
                {sortField === "name" && (
                  <span className="ml-auto text-xs">
                    {sortDirection === "asc" ? "A-Z" : "Z-A"}
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("createdAt")} className="flex items-center">
                Date
                {sortField === "createdAt" && (
                  <span className="ml-auto text-xs">
                    {sortDirection === "asc" ? "Oldest" : "Newest"}
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("size")} className="flex items-center">
                Size
                {sortField === "size" && (
                  <span className="ml-auto text-xs">
                    {sortDirection === "asc" ? "Smallest" : "Largest"}
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("createdBy")} className="flex items-center">
                Creator
                {sortField === "createdBy" && (
                  <span className="ml-auto text-xs">
                    {sortDirection === "asc" ? "A-Z" : "Z-A"}
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          <TabsTrigger value="relay">Relay Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map(doc => (
                <Card key={doc.id} className="overflow-hidden hover:bg-muted/30 transition-colors">
                  <div className="flex items-center">
                    <div className="p-4 flex items-center gap-3 flex-1">
                      {getFileIcon(doc)}
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{format(doc.createdAt, "MMM d, yyyy")}</span>
                          <span>•</span>
                          <span>{doc.createdBy}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pr-4">
                      <Badge variant={doc.type === "report" ? "default" : "secondary"}>
                        {doc.type === "report" ? "Report" : "PDF"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">{doc.category}</Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Download"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                      
                      <Dialog open={confirmDelete === doc.id} onOpenChange={open => {
                        if (!open) setConfirmDelete(null)
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => setConfirmDelete(doc.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this document? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center p-3 bg-muted rounded-md my-2">
                            {getFileIcon(doc)}
                            <div className="ml-3">
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.size}</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDeleteDocument(doc.id)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No documents found</p>
                <p className="text-sm mt-2 text-muted-foreground">
                  {searchTerm ? 
                    "Try adjusting your search or filters" : 
                    "There are no documents in your library that match the current filters"
                  }
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
} 