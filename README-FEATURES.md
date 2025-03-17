# Invoice & Timesheet Features

This document provides information about the Invoice (Petty Cash) and Timesheet features implemented in our company management platform.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Invoice/Petty Cash Feature](#invoicepetty-cash-feature)
  - [Features](#invoice-features)
  - [Usage](#invoice-usage)
  - [Technical Implementation](#invoice-technical-implementation)
  - [Invoice OCR Implementation](#invoice-ocr-implementation)
  - [Invoice List Tab](#invoice-list-tab)
- [Timesheet Feature](#timesheet-feature)
  - [Features](#timesheet-features)
  - [Usage](#timesheet-usage)
  - [Technical Implementation](#timesheet-technical-implementation)
- [Dependencies](#dependencies)

## Overview

These features are designed to streamline and automate two essential business processes:

1. **Invoice/Petty Cash Management**: Allows engineers to submit and track petty cash reimbursement requests by capturing invoice images, extracting data automatically, and submitting them for approval.

2. **Timesheet Management**: Enables engineers to track their working hours, generate monthly timesheets, and export them to Excel for reporting purposes.

## Installation

The features are integrated into the main platform. To set up the development environment:

```bash
# Clone the repository
git clone <repository-url>
cd company-underway

# Install dependencies with pnpm
pnpm install

# Run the development server
pnpm dev
```

Additional dependencies for these features:

```bash
# Install Excel export functionality
pnpm add exceljs file-saver
pnpm add -D @types/file-saver

# Install toast notification system
pnpm dlx shadcn@latest add sonner

# Install OCR-related dependencies
pnpm add @google-cloud/vision
# OR
pnpm add @aws-sdk/client-textract
# OR
pnpm add @azure/ai-form-recognizer
```

## Invoice/Petty Cash Feature

### Invoice Features

- **Invoice Image Capture**: Upload or capture invoice images directly from camera
- **Automated Data Extraction**: OCR processing to extract invoice details using cloud-based AI services
- **Form Auto-Fill**: Automatically fills form fields with extracted data
- **Validation**: Comprehensive validation to ensure data accuracy
- **Responsive Design**: Works on mobile and desktop devices
- **Toast Notifications**: User-friendly feedback messages
- **Invoice List**: Monthly view of all submitted invoices with sorting and filtering
- **Export Capabilities**: Export invoice list to Excel or PDF

### Invoice Usage

1. **Access**: Navigate to `/feature/invoice` in the platform
2. **Choose Mode**: Select between "Submit New Invoice" or "View Invoice List" tabs
3. **Submit New Invoice**:
   - Upload or capture invoice images directly from camera
   - Data Extraction: The system will automatically extract and fill the form fields
   - Review & Edit: Verify the extracted data and make any necessary corrections
   - Submit: Submit the form for approval
   - Confirmation: Receive a success notification
4. **View Invoice List**:
   - Select month/year to view submitted invoices
   - Sort and filter by various criteria (date, amount, vendor, status)
   - View details of any invoice by clicking on a row
   - Export the filtered list to Excel or PDF if needed

### Invoice Technical Implementation

- **Form Validation**: Uses Zod schema validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Toast Notifications**: Uses Sonner for toast notifications
- **Tabbed Interface**: React tabs for separating new submissions from invoice list
- **Responsive Tables**: Tables that work well on both desktop and mobile

### Invoice OCR Implementation

The system uses a real-world OCR solution to extract data from invoice images:

- **Cloud Vision API Integration**: 
  - Uses Google Cloud Vision API's document text detection and form parser
  - Processes both digital and scanned invoices with high accuracy
  - Extracts key fields: invoice number, date, vendor name, line items, and total amount
  
- **Implementation Details**:
  ```typescript
  // Example implementation with Google Cloud Vision
  import { ImageAnnotatorClient } from '@google-cloud/vision';
  
  const client = new ImageAnnotatorClient();
  
  async function extractInvoiceData(imageBuffer) {
    // Perform document text detection
    const [result] = await client.documentTextDetection({
      image: { content: imageBuffer }
    });
    
    // Process the detected text using NLP and pattern matching
    const text = result.fullTextAnnotation.text;
    
    // Extract invoice details using regex and position analysis
    const invoiceNumber = extractInvoiceNumber(text);
    const date = extractDate(text);
    const vendorName = extractVendorName(text);
    const totalAmount = extractTotalAmount(text);
    
    return {
      invoiceNumber,
      date,
      vendorName,
      totalAmount
    };
  }
  ```

- **Fallback Mechanism**: 
  - If OCR confidence is low for certain fields, they are highlighted for manual verification
  - User can adjust extracted data before submission
  - System learns from corrections to improve future extraction accuracy

- **Preprocessing Pipeline**:
  - Image enhancement: Adjusts contrast and removes noise
  - Perspective correction: Straightens skewed images
  - Text block detection: Isolates key information areas

### Invoice List Tab

The Invoice List tab provides a comprehensive view of all invoices submitted within a selected time period:

- **Features**:
  - Monthly calendar view with visual indicators for days with submitted invoices
  - Tabular list with sortable and filterable columns
  - Quick search functionality to find specific invoices
  - Status indicators showing approval stage (Pending, Approved, Rejected)
  - Bulk actions for processing multiple invoices
  - Detailed view modal for reviewing complete invoice information
  
- **Implementation Details**:
  ```typescript
  // Example component structure
  function InvoiceListTab() {
    const [month, setMonth] = useState(new Date());
    const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    
    useEffect(() => {
      // Fetch invoices for the selected month
      fetchInvoicesForMonth(month);
    }, [month]);
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <MonthPicker value={month} onChange={setMonth} />
          <StatusFilter value={filterStatus} onChange={setFilterStatus} />
        </div>
        
        <DataTable
          columns={invoiceColumns}
          data={filteredInvoices}
          pagination
          sortable
          searchable
          onRowClick={handleInvoiceSelect}
        />
        
        <InvoiceDetailModal 
          isOpen={!!selectedInvoice}
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      </div>
    );
  }
  ```

- **Data Synchronization**:
  - Real-time updates when new invoices are submitted
  - Background syncing with backend approval system
  - Offline support with data caching for mobile users

- **Export Options**:
  - Export to Excel with formatted tables
  - Generate PDF reports with company branding
  - Email reports directly to finance department

## Timesheet Feature

### Timesheet Features

- **Monthly View**: Automatically generates entries for each working day of the month
- **Auto-Population**: Pre-fills standard working hours (8 hours per day)
- **Holiday Recognition**: Recognizes Fridays as holidays and excludes them
- **Hours Calculation**: Automatically calculates total normal and overtime hours
- **Excel Export**: Exports timesheet data to professionally formatted Excel file
- **Signature Fields**: Includes engineer and manager signature fields in the export
- **Form Validation**: Validates all entries before submission

### Timesheet Usage

1. **Access**: Navigate to `/feature/timesheet` in the platform
2. **Select Month**: Choose the month for which you want to create a timesheet
3. **Fill Details**: Enter work descriptions and adjust hours as needed
4. **Review Hours**: Check the automatically calculated totals
5. **Export to Excel**: Export the timesheet to Excel for record-keeping or printing
6. **Submit**: Save the timesheet to the system

### Timesheet Technical Implementation

- **Date Handling**: Uses date-fns for date manipulation and formatting
- **Dynamic Form Generation**: Dynamically generates form fields based on the selected month
- **Excel Export**: Uses ExcelJS for creating professional Excel documents
  - Properly formatted with company headers
  - Styled with appropriate cell formats and borders
  - Includes signature sections
- **State Management**: Efficient state management with React Hooks
- **Responsive Table**: Responsive design for both desktop and mobile viewing

## Dependencies

These features rely on the following main dependencies:

- **React**: UI components and hooks
- **Next.js**: Framework for routing and SSR
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation
- **date-fns**: Date manipulation
- **ExcelJS**: Excel file generation
- **file-saver**: Client-side file saving
- **Sonner**: Toast notifications
- **Lucide React**: Icon components
- **shadcn/ui**: UI component library
- **Google Cloud Vision API** (or alternative OCR service): For invoice data extraction
- **@tanstack/react-table**: For advanced table functionality in the invoice list

## Future Enhancements

Potential future enhancements for these features include:

1. **Invoice Feature**:
   - Machine learning model training for company-specific invoice formats
   - Expense categorization and reporting
   - Approval workflow with notification system
   - Mobile app with camera optimization for better image capture
   - Integration with accounting software (QuickBooks, Xero, etc.)

2. **Timesheet Feature**:
   - Integration with project management systems
   - Automated task descriptions from assigned tasks
   - Manager approval workflow
   - Historical timesheet viewing and reporting
   - Time tracking with start/stop functionality 