"use client"

import * as React from "react"
import { format } from "date-fns"
import { saveAs } from "file-saver"
import * as Excel from "exceljs"
import { DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface Invoice {
  id: string
  date: Date
  vendorName: string
  totalAmount: string
  status: string
  purpose: string
  hasImage?: boolean
}

interface InvoiceExportProps {
  data: {
    invoices: Invoice[]
    month: Date
    engineerName: string
    engineerId: string
  }
}

export function InvoiceExport({ data }: InvoiceExportProps) {
  const handleExport = async () => {
    try {
      const { invoices, month, engineerName, engineerId } = data
      
      if (invoices.length === 0) {
        toast.error("No invoices to export", {
          description: "There are no invoices available for export."
        })
        return
      }
      
      toast.info("Preparing Excel file...", {
        description: "Your invoice data is being processed."
      })
      
      // Create a new workbook
      const workbook = new Excel.Workbook()
      
      // Add metadata
      workbook.creator = engineerName
      workbook.lastModifiedBy = engineerName
      workbook.created = new Date()
      workbook.modified = new Date()
      
      // Add a worksheet
      const worksheet = workbook.addWorksheet('Invoices')
      
      // Add company header
      worksheet.mergeCells('A1:G1')
      const titleRow = worksheet.getCell('A1')
      titleRow.value = 'COMPANY UNDERWAY - INVOICE REPORT'
      titleRow.font = {
        name: 'Arial',
        size: 16,
        bold: true
      }
      titleRow.alignment = { horizontal: 'center' }
      
      // Add report information
      worksheet.mergeCells('A2:G2')
      const monthCell = worksheet.getCell('A2')
      monthCell.value = `Month: ${format(month, 'MMMM yyyy')}`
      monthCell.font = {
        name: 'Arial',
        size: 12,
        bold: true
      }
      monthCell.alignment = { horizontal: 'center' }
      
      // Add engineer information
      worksheet.mergeCells('A3:G3')
      const engineerCell = worksheet.getCell('A3')
      engineerCell.value = `Engineer: ${engineerName} (${engineerId})`
      engineerCell.font = {
        name: 'Arial',
        size: 12
      }
      engineerCell.alignment = { horizontal: 'center' }
      
      // Add empty row
      worksheet.addRow([])
      
      // Define columns
      worksheet.columns = [
        { header: 'Invoice Number', key: 'id', width: 20 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Vendor', key: 'vendor', width: 25 },
        { header: 'Amount ($)', key: 'amount', width: 15 },
        { header: 'Purpose', key: 'purpose', width: 30 },
        { header: 'Status', key: 'status', width: 15 }
      ]
      
      // Style the header row
      worksheet.getRow(5).font = {
        bold: true
      }
      worksheet.getRow(5).alignment = {
        horizontal: 'center'
      }
      
      // Add data
      invoices.forEach(invoice => {
        worksheet.addRow({
          id: invoice.id,
          date: format(invoice.date, 'dd/MM/yyyy'),
          vendor: invoice.vendorName,
          amount: Number(invoice.totalAmount).toFixed(2),
          purpose: invoice.purpose,
          status: invoice.status
        })
      })
      
      // Add totals
      const totalRow = worksheet.addRow({
        id: '',
        date: '',
        vendor: 'TOTAL',
        amount: invoices.reduce((sum, invoice) => sum + Number(invoice.totalAmount), 0).toFixed(2),
        purpose: '',
        status: ''
      })
      totalRow.font = {
        bold: true
      }
      
      // Add borders to all cells
      worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          if (rowNumber >= 5) { // Only add borders to the data table, not the header
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            }
          }
        })
      })
      
      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer()
      
      // Save the file
      const fileName = `invoice_report_${format(month, 'yyyy_MM')}.xlsx`
      saveAs(new Blob([buffer]), fileName)
      
      toast.success("Excel file exported", {
        description: `Invoice report has been exported as '${fileName}'.`
      })
    } catch (error) {
      console.error('Error exporting to Excel:', error)
      toast.error("Export failed", {
        description: "There was an error generating the Excel file. Please try again."
      })
    }
  }
  
  return (
    <Button variant="outline" onClick={handleExport}>
      <DownloadIcon className="mr-2 h-4 w-4" />
      Export to Excel
    </Button>
  )
} 