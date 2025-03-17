"use client"

import * as React from "react"
import { format } from "date-fns"
import { FileSpreadsheetIcon } from "lucide-react"
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

import { Button } from "@/components/ui/button"

interface TimesheetExportProps {
  data: {
    engineerName: string
    engineerId: string
    month: Date
    entries: Array<{
      date: Date
      workDescription: string
      normalHours: number
      overtimeHours: number
      remarks?: string
    }>
  }
}

export function TimesheetExport({ data }: TimesheetExportProps) {
  const exportToExcel = async () => {
    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Company System';
      workbook.lastModifiedBy = data.engineerName;
      
      // Add a worksheet
      const worksheet = workbook.addWorksheet(`Timesheet ${format(data.month, 'MMM yyyy')}`);
      
      // Add company logo and header (you would replace this with your actual logo)
      // For production, add company logo here
      // const logoId = workbook.addImage({ filename: 'path/to/logo.png', extension: 'png' });
      // worksheet.addImage(logoId, { tl: { col: 0, row: 0 }, ext: { width: 100, height: 40 } });

      // Add header information
      worksheet.mergeCells('A1:H1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = `Timesheet for ${format(data.month, "MMMM yyyy")}`;
      titleCell.font = { size: 16, bold: true };
      titleCell.alignment = { horizontal: 'center' };
      
      worksheet.mergeCells('A2:D2');
      worksheet.getCell('A2').value = `Engineer Name: ${data.engineerName}`;
      worksheet.getCell('A2').font = { bold: true };
      
      worksheet.mergeCells('E2:H2');
      worksheet.getCell('E2').value = `Engineer ID: ${data.engineerId}`;
      worksheet.getCell('E2').font = { bold: true };
      
      // Add column headers with styling
      const headerRow = worksheet.addRow([
        'Date', 'Day', 'Month', 'Year', 'Work Description', 'Normal Hours', 'Overtime Hours', 'Remarks'
      ]);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { horizontal: 'center' };
      });
      
      // Format the columns
      worksheet.getColumn(1).width = 15; // Date
      worksheet.getColumn(2).width = 6;  // Day
      worksheet.getColumn(3).width = 6;  // Month
      worksheet.getColumn(4).width = 8;  // Year
      worksheet.getColumn(5).width = 40; // Work Description
      worksheet.getColumn(6).width = 15; // Normal Hours
      worksheet.getColumn(7).width = 15; // Overtime Hours
      worksheet.getColumn(8).width = 20; // Remarks
      
      // Add data rows
      let totalNormalHours = 0;
      let totalOvertimeHours = 0;
      
      data.entries.forEach(entry => {
        const formattedDate = format(new Date(entry.date), "dd/MM/yyyy");
        const day = entry.date.getDate();
        const month = entry.date.getMonth() + 1;
        const year = entry.date.getFullYear();
        
        const row = worksheet.addRow([
          formattedDate,
          day.toString(),
          month.toString(),
          year.toString(),
          entry.workDescription,
          entry.normalHours,
          entry.overtimeHours,
          entry.remarks || ''
        ]);
        
        // Right-align the hour columns
        row.getCell(6).alignment = { horizontal: 'right' };
        row.getCell(7).alignment = { horizontal: 'right' };
        
        // Add cell borders
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        
        totalNormalHours += entry.normalHours;
        totalOvertimeHours += entry.overtimeHours;
      });
      
      // Add totals row with styling
      const totalRow = worksheet.addRow([
        '', '', '', '', 'Total Hours', totalNormalHours, totalOvertimeHours, ''
      ]);
      
      totalRow.getCell(5).font = { bold: true };
      totalRow.getCell(6).font = { bold: true };
      totalRow.getCell(7).font = { bold: true };
      
      totalRow.getCell(5).alignment = { horizontal: 'right' };
      totalRow.getCell(6).alignment = { horizontal: 'right' };
      totalRow.getCell(7).alignment = { horizontal: 'right' };
      
      totalRow.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      
      // Add signature section
      const rowsToAdd = 4;
      for (let i = 0; i < rowsToAdd; i++) {
        worksheet.addRow([]);
      }
      
      worksheet.mergeCells(`A${worksheet.rowCount + 1}:D${worksheet.rowCount + 1}`);
      worksheet.getCell(`A${worksheet.rowCount}`).value = 'Engineer Signature';
      worksheet.getCell(`A${worksheet.rowCount}`).font = { bold: true };
      
      worksheet.mergeCells(`E${worksheet.rowCount}:H${worksheet.rowCount}`);
      worksheet.getCell(`E${worksheet.rowCount}`).value = 'Manager Signature';
      worksheet.getCell(`E${worksheet.rowCount}`).font = { bold: true };
      
      // Generate the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Timesheet_${data.engineerName.replace(/\s+/g, '_')}_${format(data.month, "MMM_yyyy")}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export to Excel. Please try again.');
    }
  };
  
  return (
    <Button 
      onClick={exportToExcel} 
      variant="outline"
    >
      <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
      Export to Excel
    </Button>
  )
} 