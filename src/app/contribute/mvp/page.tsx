"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BugIcon, CheckCircleIcon, ClockIcon, CodeIcon, AlertTriangleIcon } from "lucide-react";

export default function MVPTrackerPage() {
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">MVP Development Tracker</h1>
        <p className="text-muted-foreground">
          Track progress, optimizations, and roadmap for completing the MVP for the automation software.
        </p>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="progress">Current Progress</TabsTrigger>
          <TabsTrigger value="optimization">Optimizations</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="prompts">Development Prompts</TabsTrigger>
        </TabsList>

        {/* Current Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureProgressCard 
              title="PDF Extractor"
              description="Extract relay settings from PDF documents"
              progress={35}
              status="in-progress"
              tasks={[
                { name: "Basic UI setup", status: "completed" },
                { name: "PDF upload functionality", status: "completed" },
                { name: "Basic document preview", status: "completed" },
                { name: "OCR integration", status: "in-progress" },
                { name: "Data validation", status: "pending" },
                { name: "Settings extraction algorithms", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Report Generator"
              description="Generate testing and commissioning reports"
              progress={30}
              status="in-progress"
              tasks={[
                { name: "Basic UI setup", status: "completed" },
                { name: "Form templates", status: "completed" },
                { name: "Form validation", status: "in-progress" },
                { name: "DOCX generation", status: "pending" },
                { name: "PDF conversion", status: "pending" },
                { name: "Data integration with PDF extractor", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Document Library"
              description="Centralized repository for all generated documents"
              progress={45}
              status="in-progress"
              tasks={[
                { name: "Basic UI layout", status: "completed" },
                { name: "Document listing", status: "completed" },
                { name: "Document preview", status: "completed" },
                { name: "Search & filtering", status: "in-progress" },
                { name: "Document versioning", status: "pending" },
                { name: "Access control", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Invoice/Petty Cash"
              description="Process and track petty cash reimbursements"
              progress={40}
              status="in-progress"
              tasks={[
                { name: "Form UI implementation", status: "completed" },
                { name: "Image upload", status: "completed" },
                { name: "Basic form validation", status: "completed" },
                { name: "OCR data extraction", status: "in-progress" },
                { name: "Approval workflow", status: "pending" },
                { name: "Reporting functionality", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Timesheet"
              description="Track working hours and generate timesheets"
              progress={35}
              status="in-progress"
              tasks={[
                { name: "Basic UI implementation", status: "completed" },
                { name: "Date selection", status: "completed" },
                { name: "Hours tracking form", status: "in-progress" },
                { name: "Calculations & validation", status: "in-progress" },
                { name: "Excel/PDF export", status: "pending" },
                { name: "Approval workflow", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Authentication"
              description="User authentication and authorization"
              progress={85}
              status="in-progress"
              tasks={[
                { name: "Login/Register UI", status: "completed" },
                { name: "Authentication flow", status: "completed" },
                { name: "Email verification", status: "completed" },
                { name: "Password reset", status: "completed" },
                { name: "Role-based access", status: "completed" },
                { name: "Session management", status: "in-progress" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Platform Features"
              description="Core platform features and infrastructure"
              progress={65}
              status="in-progress"
              tasks={[
                { name: "Navigation and routing", status: "completed" },
                { name: "Dark/light theme", status: "completed" },
                { name: "Responsive layouts", status: "completed" },
                { name: "Core UI components", status: "completed" },
                { name: "Data fetching architecture", status: "in-progress" },
                { name: "Error handling", status: "in-progress" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Landing Page"
              description="Company landing page and documentation"
              progress={30}
              status="in-progress"
              tasks={[
                { name: "Basic layout structure", status: "completed" },
                { name: "Navigation menu", status: "completed" },
                { name: "Hero section", status: "in-progress" },
                { name: "Feature showcase", status: "pending" },
                { name: "Responsive design", status: "pending" },
                { name: "SEO optimization", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Contribute Section"
              description="Developer contribution and documentation area"
              progress={70}
              status="in-progress"
              tasks={[
                { name: "Getting started guide", status: "completed" },
                { name: "Visual component guide", status: "completed" },
                { name: "MVP tracker", status: "completed" },
                { name: "API documentation", status: "in-progress" },
                { name: "Contribution guidelines", status: "in-progress" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Task Management"
              description="Create and manage tasks efficiently"
              progress={45}
              status="in-progress"
              tasks={[
                { name: "Task listing UI", status: "completed" },
                { name: "Task creation form", status: "completed" },
                { name: "Task assignment", status: "in-progress" },
                { name: "Task status tracking", status: "in-progress" },
                { name: "Task notifications", status: "pending" },
                { name: "Filtering and search", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Project Management"
              description="Create and manage project data"
              progress={25}
              status="in-progress"
              tasks={[
                { name: "Basic project structure", status: "completed" },
                { name: "Project creation UI", status: "in-progress" },
                { name: "Template management", status: "pending" },
                { name: "Document generation", status: "pending" },
                { name: "Project dashboard", status: "pending" },
              ]}
            />
            
            <FeatureProgressCard 
              title="Daily Reports"
              description="Generate and manage daily reports"
              progress={20}
              status="in-progress"
              tasks={[
                { name: "Basic UI structure", status: "completed" },
                { name: "Report form implementation", status: "in-progress" },
                { name: "Data validation", status: "pending" },
                { name: "Report generation", status: "pending" },
                { name: "Approval workflow", status: "pending" },
              ]}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overall MVP Progress</CardTitle>
              <CardDescription>
                Estimated progress toward a deployable MVP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall Completion</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Core Features</h3>
                  <Progress value={40} className="h-2" />
                  <span className="text-sm text-muted-foreground">40% Complete</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">UI/UX</h3>
                  <Progress value={65} className="h-2" />
                  <span className="text-sm text-muted-foreground">65% Complete</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Backend/Database</h3>
                  <Progress value={30} className="h-2" />
                  <span className="text-sm text-muted-foreground">30% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimizations Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimizations</CardTitle>
              <CardDescription>
                Improvements needed to enhance application performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <OptimizationItem 
                title="PDF Processing Architecture"
                description="Implement efficient PDF processing pipeline"
                priority="high"
                complexity="high"
                suggestions={[
                  "Create server-side PDF processing using worker threads",
                  "Implement a preprocessing step to enhance PDF quality",
                  "Develop specialized OCR for relay setting extraction",
                  "Add caching for previously processed documents",
                  "Implement pattern matching for different relay manufacturers"
                ]}
              />
              
              <OptimizationItem 
                title="Form State Management"
                description="Improve the complex form handling across features"
                priority="high"
                complexity="medium"
                suggestions={[
                  "Standardize form implementation with React Hook Form",
                  "Create reusable form components for common patterns",
                  "Implement form state persistence using localStorage",
                  "Add optimistic updates for better UX",
                  "Create form action utilities for server actions"
                ]}
              />
              
              <OptimizationItem 
                title="Data Fetching Strategy"
                description="Optimize the data fetching approach across the application"
                priority="medium"
                complexity="medium"
                suggestions={[
                  "Implement consistent data fetching patterns",
                  "Add proper caching strategies",
                  "Set up optimistic UI updates",
                  "Create reusable data fetching hooks",
                  "Implement proper error handling and retry logic"
                ]}
              />
              
              <OptimizationItem 
                title="Document Storage and Retrieval"
                description="Optimize the document library for performance and scalability"
                priority="medium"
                complexity="medium"
                suggestions={[
                  "Implement efficient document storage strategy",
                  "Add server-side pagination for document lists",
                  "Create efficient search indexing",
                  "Implement document metadata caching",
                  "Add lazy loading for document previews"
                ]}
              />
              
              <OptimizationItem 
                title="Report Generation System"
                description="Build an efficient and flexible report generation system"
                priority="high"
                complexity="high"
                suggestions={[
                  "Create a server-side report generation service",
                  "Develop reusable template system for different report types",
                  "Implement document assembly pipeline",
                  "Add background processing for large reports",
                  "Create consistent styling system for all reports"
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UI/UX Enhancements</CardTitle>
              <CardDescription>
                Improvements needed to enhance user experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <OptimizationItem 
                title="Mobile Responsiveness"
                description="Ensure consistent responsive design across all features"
                priority="high"
                complexity="medium"
                suggestions={[
                  "Create mobile-first layouts for all main features",
                  "Implement responsive form designs for complex forms",
                  "Ensure data tables work well on mobile devices",
                  "Optimize document previews for small screens",
                  "Ensure consistent touch interactions"
                ]}
              />
              
              <OptimizationItem 
                title="Form UX Improvements"
                description="Enhance form usability across the application"
                priority="medium"
                complexity="medium"
                suggestions={[
                  "Add inline validation with clear error messages",
                  "Implement multi-step forms with progress indicators",
                  "Create better form navigation for complex forms",
                  "Add autosave functionality for long forms",
                  "Implement form state recovery on page refresh"
                ]}
              />
              
              <OptimizationItem 
                title="Feedback Systems"
                description="Implement consistent user feedback mechanisms"
                priority="medium"
                complexity="low"
                suggestions={[
                  "Create a standardized toast notification system",
                  "Implement loading states for all operations",
                  "Add success/error feedback for all form submissions",
                  "Implement progress indicators for lengthy operations",
                  "Create consistent empty states for all listings"
                ]}
              />
              
              <OptimizationItem 
                title="Accessibility Improvements"
                description="Ensure the application is accessible to all users"
                priority="medium"
                complexity="medium"
                suggestions={[
                  "Add proper ARIA attributes to all interactive elements",
                  "Ensure keyboard navigation throughout the application",
                  "Implement focus management for modals and dialogs",
                  "Add screen reader support for all features",
                  "Ensure sufficient color contrast and text sizing"
                ]}
              />
              
              <OptimizationItem 
                title="Dashboard & Analytics"
                description="Create visual dashboards for key data points"
                priority="low"
                complexity="medium"
                suggestions={[
                  "Implement data visualization for project metrics",
                  "Create user activity dashboards",
                  "Add document usage analytics",
                  "Implement financial reporting dashboards",
                  "Create time tracking visualizations"
                ]}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Architecture Improvements</CardTitle>
              <CardDescription>
                Foundational improvements to enhance code quality and maintainability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <OptimizationItem 
                title="Component Structure Standardization"
                description="Standardize component architecture across the codebase"
                priority="high"
                complexity="medium"
                suggestions={[
                  "Implement consistent component directory structure",
                  "Create reusable patterns for feature components",
                  "Separate UI from business logic consistently",
                  "Implement proper prop typing for all components",
                  "Create documentation for component patterns"
                ]}
              />
              
              <OptimizationItem 
                title="State Management Strategy"
                description="Implement a consistent state management approach"
                priority="high"
                complexity="medium"
                suggestions={[
                  "Define clear patterns for local vs. global state",
                  "Create domain-specific context providers",
                  "Implement consistent data fetching patterns",
                  "Create typed hooks for state access",
                  "Document state management guidelines"
                ]}
              />
              
              <OptimizationItem 
                title="Error Handling Framework"
                description="Create a comprehensive error handling system"
                priority="medium"
                complexity="medium"
                suggestions={[
                  "Implement global error boundaries",
                  "Create consistent error handling for API calls",
                  "Implement proper logging for client-side errors",
                  "Add user-friendly error messages",
                  "Create recovery mechanisms for common error scenarios"
                ]}
              />
              
              <OptimizationItem 
                title="Testing Infrastructure"
                description="Establish a robust testing framework"
                priority="medium"
                complexity="high"
                suggestions={[
                  "Set up unit testing for critical components",
                  "Implement integration tests for main user flows",
                  "Create testing utilities for common patterns",
                  "Set up CI/CD pipeline for automated testing",
                  "Document testing guidelines and patterns"
                ]}
              />
              
              <OptimizationItem 
                title="Build and Deployment Optimization"
                description="Optimize build and deployment process"
                priority="low"
                complexity="medium"
                suggestions={[
                  "Implement code splitting for better bundle sizes",
                  "Add efficient asset optimization",
                  "Create optimized Docker containers for deployment",
                  "Implement proper environment configuration",
                  "Set up continuous deployment pipeline"
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MVP Roadmap</CardTitle>
              <CardDescription>
                Planned milestones and timeline for completing the MVP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <MilestoneItem 
                  title="Sprint 1: Core Feature Foundation"
                  date="Completed"
                  status="completed"
                  description="Set up the basic architecture and foundation for all core features"
                  tasks={[
                    { name: "Project structure setup", status: "completed" },
                    { name: "Authentication system implementation", status: "completed" },
                    { name: "Component library integration", status: "completed" },
                    { name: "Basic routing and navigation", status: "completed" },
                    { name: "Platform UI foundation", status: "completed" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 2: Feature Shell Implementation"
                  date="Completed"
                  status="completed"
                  description="Implement the basic UI shells for all key features"
                  tasks={[
                    { name: "PDF Extractor basic UI", status: "completed" },
                    { name: "Report Generator form structure", status: "completed" },
                    { name: "Document Library layout", status: "completed" },
                    { name: "Invoice/Petty Cash form", status: "completed" },
                    { name: "Timesheet basic structure", status: "completed" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 3: Feature Implementation"
                  date="Current Sprint"
                  status="in-progress"
                  description="Implement core functionality for all key features"
                  tasks={[
                    { name: "PDF processing and OCR integration", status: "in-progress" },
                    { name: "Report form validation and submission", status: "in-progress" },
                    { name: "Document Library filtering and search", status: "in-progress" },
                    { name: "Invoice data extraction", status: "in-progress" },
                    { name: "Timesheet calculations and validation", status: "in-progress" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 4: Data Processing Implementation"
                  date="Next Sprint"
                  status="upcoming"
                  description="Implement advanced data processing for all features"
                  tasks={[
                    { name: "PDF data extraction algorithms", status: "pending" },
                    { name: "DOCX/PDF generation for reports", status: "pending" },
                    { name: "Document versioning and metadata", status: "pending" },
                    { name: "Invoice approval workflow", status: "pending" },
                    { name: "Timesheet export functionality", status: "pending" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 5: Feature Integration"
                  date="Two Sprints Away"
                  status="upcoming"
                  description="Integrate features and implement cross-feature workflows"
                  tasks={[
                    { name: "PDF extractor to report generator integration", status: "pending" },
                    { name: "Document library integration with all features", status: "pending" },
                    { name: "Task and project management integration", status: "pending" },
                    { name: "Workflow automation implementation", status: "pending" },
                    { name: "User permission and role refinement", status: "pending" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 6: Optimization and Testing"
                  date="Three Sprints Away"
                  status="upcoming"
                  description="Optimize performance and conduct comprehensive testing"
                  tasks={[
                    { name: "Performance optimization implementation", status: "pending" },
                    { name: "Comprehensive unit and integration testing", status: "pending" },
                    { name: "UI/UX refinements based on feedback", status: "pending" },
                    { name: "Mobile responsiveness improvements", status: "pending" },
                    { name: "Bug fixing and stabilization", status: "pending" },
                  ]}
                />
                
                <MilestoneItem 
                  title="Sprint 7: Final Polishing and Deployment"
                  date="Four Sprints Away"
                  status="upcoming"
                  description="Final polish and preparation for production deployment"
                  tasks={[
                    { name: "Final bug fixes and refinements", status: "pending" },
                    { name: "User documentation completion", status: "pending" },
                    { name: "Production environment setup", status: "pending" },
                    { name: "Deployment pipeline implementation", status: "pending" },
                    { name: "Initial user onboarding preparation", status: "pending" },
                  ]}
                />
                
                <MilestoneItem 
                  title="MVP Release"
                  date="Five Sprints Away"
                  status="upcoming"
                  description="Deploy MVP to production and gather initial user feedback"
                  tasks={[
                    { name: "Production deployment", status: "pending" },
                    { name: "Initial user onboarding", status: "pending" },
                    { name: "Feedback collection system", status: "pending" },
                    { name: "Performance monitoring", status: "pending" },
                    { name: "Planning for post-MVP enhancements", status: "pending" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Issues</CardTitle>
              <CardDescription>
                Known issues that need to be addressed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <IssueItem 
                id="ISSUE-001"
                title="PDF Extractor fails with complex document formats"
                severity="high"
                assignee="Unassigned"
                status="open"
                description="The PDF extractor needs to handle various relay setting document formats from different manufacturers."
                steps={[
                  "Upload a PDF with relay settings from different manufacturers",
                  "Current implementation cannot identify settings correctly",
                  "Need to implement pattern recognition for different formats"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-002"
                title="Form state persistence needed across the application"
                severity="high"
                assignee="Unassigned"
                status="open"
                description="Users lose form data when navigating away or refreshing the page. Need a consistent approach to form state persistence."
                steps={[
                  "Start filling out any complex form",
                  "Navigate away or refresh the page",
                  "All entered data is lost and needs to be re-entered"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-003"
                title="Document library search and filtering not implemented"
                severity="medium"
                assignee="Unassigned"
                status="open"
                description="Document library needs robust search and filtering capabilities for usability with large document collections."
                steps={[
                  "Navigate to document library",
                  "Attempt to search for documents by name or content",
                  "Search functionality is limited or not working"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-004"
                title="Report generation needs document creation capability"
                severity="high"
                assignee="Unassigned"
                status="open"
                description="The report generator needs to create properly formatted DOCX/PDF documents from form data."
                steps={[
                  "Fill out a report generator form",
                  "Try to generate a document",
                  "Document generation is not implemented or produces incorrect formatting"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-005"
                title="Mobile responsiveness issues across multiple features"
                severity="medium"
                assignee="Unassigned"
                status="open"
                description="Several features have UI issues on mobile devices, affecting usability on smaller screens."
                steps={[
                  "Access the application on a mobile device or using responsive design mode",
                  "Navigate to features like PDF extractor, invoice form, or timesheet",
                  "UI elements overlap, forms are difficult to use, or content overflows"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-006"
                title="Inconsistent loading and error states"
                severity="medium"
                assignee="Unassigned"
                status="open"
                description="Loading and error states are inconsistent across the application, leading to poor user experience."
                steps={[
                  "Perform various operations that involve data loading or submission",
                  "Notice that some features lack proper loading indicators",
                  "Error handling is inconsistent or error messages are not user-friendly"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-007"
                title="OCR integration needed for invoice processing"
                severity="high"
                assignee="Unassigned"
                status="open"
                description="Invoice feature needs OCR integration to automatically extract data from uploaded receipts and invoices."
                steps={[
                  "Upload an invoice or receipt image in the invoice feature",
                  "Attempt to extract data automatically",
                  "Data extraction is not working or is inaccurate"
                ]}
              />
              
              <IssueItem 
                id="ISSUE-008"
                title="Timesheet calculations and export not implemented"
                severity="medium"
                assignee="Unassigned"
                status="open"
                description="Timesheet feature needs to implement time calculations and export functionality for generated timesheets."
                steps={[
                  "Create a timesheet with hours entries",
                  "System should calculate totals and overtime",
                  "Export functionality to Excel/PDF is not implemented"
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Development Prompts Tab */}
        <TabsContent value="prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Development Prompts</CardTitle>
              <CardDescription>
                Useful prompts for guiding development tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PromptItem 
                title="PDF Extractor OCR Implementation"
                description="Implement OCR and data extraction for the PDF extractor"
                prompt="Enhance the PDF extractor component with OCR capabilities and data extraction algorithms. First, implement server-side PDF processing using a worker thread. Add OCR processing with Tesseract.js or a cloud OCR service. Create pattern recognition algorithms to identify relay settings based on document structure. Implement data validation to ensure extracted data meets expected formats. Add a preview mode to show extracted data before confirmation."
              />
              
              <PromptItem 
                title="Form State Persistence System"
                description="Create a reusable form state persistence system"
                prompt="Implement a reusable form state persistence system using React Hook Form, Zod validation, and localStorage. Create a custom hook that handles form state persistence across page refreshes and navigation. The system should use a unique ID for each form, save partial form data automatically, and restore state when the user returns. Include form validation with Zod schemas and proper error handling. Implement a clear recovery UI when returning to a form with saved data."
              />
              
              <PromptItem 
                title="Document Library Search and Filter"
                description="Implement search and filtering for the document library"
                prompt="Enhance the document library with comprehensive search and filtering capabilities. Implement full-text search across document metadata and content using an efficient search algorithm. Add filters for document type, date range, creator, and status. Create a responsive UI with instant search results, clear filtering indicators, and proper empty states. Implement server-side pagination for efficient loading of large document collections. Add sorting options and save user preferences for search and filters."
              />
              
              <PromptItem 
                title="Report Generation System"
                description="Implement document generation for the report generator"
                prompt="Create a comprehensive report generation system that converts form data into properly formatted documents. Implement server-side document generation using docx and/or pdfkit. Create reusable templates for different report types with proper styling, tables, headers, and footers. Add placeholder replacement for dynamic content. Implement image insertion capabilities for logos and signatures. Create a preview system before download. Ensure generated documents meet industry standards for formatting and structure."
              />
              
              <PromptItem 
                title="Invoice OCR Processing"
                description="Implement OCR for invoice and receipt processing"
                prompt="Implement an OCR system for the invoice/petty cash feature to automatically extract data from uploaded receipts and invoices. Use a cloud OCR service or Tesseract.js with preprocessing. Add image enhancement capabilities to improve OCR accuracy. Create field detection algorithms to identify common invoice fields like date, amount, vendor, etc. Implement confidence scoring for extracted data. Add manual correction capabilities for low-confidence fields. Include validation against expected formats and value ranges."
              />
              
              <PromptItem 
                title="Timesheet Calculation and Export"
                description="Implement calculations and exports for timesheets"
                prompt="Enhance the timesheet feature with comprehensive time calculations and export functionality. Implement daily and weekly hour calculations, overtime calculations based on configurable rules, and status tracking. Create an Excel export feature using ExcelJS with proper formatting, formulas, and styling. Add PDF export capability with a professional layout. Implement signature fields for approvals. Create a summary view with visual representations of time distribution. Add validation to prevent common timesheet errors."
              />
              
              <PromptItem 
                title="Mobile Responsiveness Improvements"
                description="Enhance mobile responsiveness across all features"
                prompt="Implement comprehensive mobile responsiveness improvements across all key features. Create mobile-first layouts for complex forms with proper input sizing and spacing. Optimize data tables with horizontal scrolling or responsive layouts. Ensure proper touch targets for all interactive elements. Implement collapsible sections for complex content. Create responsive navigation patterns. Test and optimize PDF preview and document viewing for small screens. Ensure consistent spacing and typography across all screen sizes."
              />
              
              <PromptItem 
                title="Loading and Error State System"
                description="Create a consistent loading and error handling system"
                prompt="Implement a comprehensive and consistent loading and error handling system across the application. Create reusable loading components for different scenarios (page load, form submission, data fetching). Add skeleton loaders for content-heavy areas. Implement a toast notification system for success and error messages. Create meaningful error messages for different error types. Add retry capabilities for failed operations. Implement error boundaries to prevent UI crashes. Create fallback UI for when components fail to load."
              />
              
              <PromptItem 
                title="Project Data Generation System"
                description="Implement project document generation capabilities"
                prompt="Create a comprehensive project document generation system that can produce all required project documents. Implement template-based generation for ITP, MOS, details, plans, and quotes. Create form interfaces for capturing all required data. Implement document assembly that combines multiple templates. Add customization capabilities for document generation. Create a preview system for all generated documents. Implement proper styling and formatting for professional output. Add export to DOCX and PDF formats."
              />
              
              <PromptItem 
                title="Cross-Feature Integration"
                description="Implement integration between different features"
                prompt="Create integration points between different application features to enable seamless workflows. Implement PDF extractor integration with report generation to populate reports with extracted data. Connect the document library with all document-producing features for automatic storage and retrieval. Create links between projects, tasks, and documents. Implement role-based access controls for all integration points. Add consistent navigation between related items. Create a unified search system that works across different feature types."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for feature progress cards
function FeatureProgressCard({ 
  title, 
  description, 
  progress, 
  status, 
  tasks 
}: { 
  title: string;
  description: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: Array<{ name: string; status: 'pending' | 'in-progress' | 'completed' }>;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tasks</h4>
          <ul className="space-y-1">
            {tasks.map((task, i) => (
              <li key={i} className="flex items-center text-sm">
                <TaskStatusIcon status={task.status} />
                <span className={task.status === 'completed' ? 'line-through opacity-70' : ''}>{task.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper component for status badges
function StatusBadge({ status }: { status: 'pending' | 'in-progress' | 'completed' | 'upcoming' }) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    'in-progress': "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    upcoming: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
  };
  
  const labels = {
    pending: "Pending",
    'in-progress': "In Progress",
    completed: "Completed",
    upcoming: "Upcoming"
  };
  
  return (
    <Badge className={variants[status]} variant="outline">
      {labels[status]}
    </Badge>
  );
}

// Helper component for task status icons
function TaskStatusIcon({ status }: { status: 'pending' | 'in-progress' | 'completed' }) {
  if (status === 'completed') {
    return <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />;
  } else if (status === 'in-progress') {
    return <ClockIcon className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />;
  } else {
    return <div className="h-4 w-4 border-2 border-muted rounded-full mr-2 flex-shrink-0" />;
  }
}

// Helper component for optimization items
function OptimizationItem({ 
  title, 
  description, 
  priority, 
  complexity, 
  suggestions 
}: { 
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
  suggestions: string[];
}) {
  const priorityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500"
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{title}</h3>
        <div className="flex gap-2">
          <Badge variant="outline">
            Priority: <span className={priorityColors[priority]}>{priority}</span>
          </Badge>
          <Badge variant="outline">
            Complexity: {complexity}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Suggested Improvements:</h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {suggestions.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <Separator />
    </div>
  );
}

// Helper component for milestone items
function MilestoneItem({ 
  title, 
  date, 
  status, 
  description, 
  tasks 
}: { 
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  tasks: Array<{ name: string; status: 'completed' | 'in-progress' | 'pending' }>;
}) {
  return (
    <div className="relative pl-6 border-l-2 border-muted pb-8 last:pb-0">
      <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary left-[-9px] top-0" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{title}</h3>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">{date}</span>
            <StatusBadge status={status} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Tasks:</h4>
          <ul className="space-y-1">
            {tasks.map((task, i) => (
              <li key={i} className="flex items-center text-sm">
                <TaskStatusIcon status={task.status} />
                <span className={task.status === 'completed' ? 'line-through opacity-70' : ''}>{task.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Helper component for issue items
function IssueItem({ 
  id, 
  title, 
  severity, 
  assignee, 
  status,
  description, 
  steps 
}: { 
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  assignee: string;
  status: 'open' | 'in-progress' | 'resolved';
  description: string;
  steps: string[];
}) {
  const severityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500"
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <BugIcon className="h-5 w-5 text-red-500" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{id}</Badge>
          <Badge variant="outline">
            Severity: <span className={severityColors[severity]}>{severity}</span>
          </Badge>
        </div>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Assignee: {assignee}</span>
        <span>Status: {status}</span>
      </div>
      <p className="text-sm">{description}</p>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Steps to reproduce:</h4>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <Separator />
    </div>
  );
}

// Helper component for prompt items
function PromptItem({ 
  title, 
  description, 
  prompt 
}: { 
  title: string;
  description: string;
  prompt: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CodeIcon className="h-5 w-5 text-primary" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="bg-muted p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">Prompt:</h4>
        <p className="text-sm whitespace-pre-wrap">{prompt}</p>
      </div>
      <Separator />
    </div>
  );
} 