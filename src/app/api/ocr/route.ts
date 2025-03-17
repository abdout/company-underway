import { NextResponse } from 'next/server'

// Simulated OCR API that mimics Google Cloud Vision processing
export async function POST(request: Request) {
  try {
    // Parse the form data
    const formData = await request.formData()
    const image = formData.get('image') as File | null
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WEBP are supported.' },
        { status: 400 }
      )
    }
    
    // Validate file size (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }
    
    // In a real implementation, we would:
    // 1. Upload the image to a storage bucket or send directly to Vision API
    // 2. Call the Google Cloud Vision API
    // 3. Process the results
    
    // For now, simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate random data with confidence scores
    const generateConfidence = () => 0.7 + Math.random() * 0.3
    const invoiceNumberConfidence = generateConfidence()
    const vendorNameConfidence = generateConfidence()
    const totalAmountConfidence = generateConfidence()
    const dateConfidence = generateConfidence()
    
    // Return simulated OCR result
    const result = {
      success: true,
      data: {
        // Only include fields with high enough confidence
        ...(invoiceNumberConfidence > 0.75 && { 
          invoiceNumber: generateInvoiceNumber() 
        }),
        ...(vendorNameConfidence > 0.75 && { 
          vendorName: generateVendorName() 
        }),
        ...(totalAmountConfidence > 0.75 && { 
          totalAmount: generateAmount() 
        }),
        ...(dateConfidence > 0.75 && { 
          date: generateDate() 
        }),
        confidence: {
          invoiceNumber: invoiceNumberConfidence,
          vendorName: vendorNameConfidence,
          totalAmount: totalAmountConfidence,
          date: dateConfidence
        }
      }
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error processing OCR request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions for generating sample data
function generateInvoiceNumber(): string {
  const prefixes = ["INV", "BILL", "RCP", "SI"]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const numbers = Math.floor(10000 + Math.random() * 90000)
  return `${prefix}-${numbers}`
}

function generateVendorName(): string {
  const vendors = [
    "Office Supplies Co.",
    "Tech Solutions Inc.",
    "Stationery World",
    "Mega Hardware",
    "Coastal Coffee Shop",
    "Metro Electronics"
  ]
  return vendors[Math.floor(Math.random() * vendors.length)]
}

function generateAmount(): string {
  return (Math.random() * 500 + 20).toFixed(2)
}

function generateDate(): string {
  const now = new Date()
  const pastDays = Math.floor(Math.random() * 30)
  const date = new Date(now.getTime() - pastDays * 24 * 60 * 60 * 1000)
  return date.toISOString().split('T')[0]
} 