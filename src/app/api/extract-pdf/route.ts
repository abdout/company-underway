import { NextRequest, NextResponse } from 'next/server'

// Mock data generation functions
const getRandomManufacturer = () => {
  const manufacturers = ["ABB", "Siemens", "SEL", "GE", "Schneider Electric", "Alstom", "Basler", "Toshiba"];
  return manufacturers[Math.floor(Math.random() * manufacturers.length)];
}

const getRandomModel = (relayType: string) => {
  const models: Record<string, string[]> = {
    "Differential": ["REL670", "7UT85", "SEL-487", "T60", "MiCOM P633"],
    "Distance": ["REL670", "7SA86", "SEL-421", "D60", "MiCOM P441"],
    "Overcurrent": ["REF615", "7SJ85", "SEL-751", "F60", "MiCOM P122"],
    "Earth Fault": ["REF615", "7SJ80", "SEL-751", "F60", "MiCOM P140"],
    "Motor Protection": ["REM615", "7SK85", "SEL-710", "M60", "MiCOM P241"]
  };
  
  const defaultModels = ["REF615", "7SJ82", "SEL-751", "F60", "MiCOM P122"];
  return (models[relayType] || defaultModels)[Math.floor(Math.random() * 5)];
}

const getRandomSerialNumber = () => {
  return `SN-${Math.floor(100000 + Math.random() * 900000)}`;
}

const getRandomFirmwareVersion = () => {
  return `v${Math.floor(1 + Math.random() * 5)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
}

// Generate random settings for each relay type
const generateMockData = (relayType: string) => {
  const settings: Record<string, { value: string, confidence: number, page: number }> = {};
  
  // Common settings
  settings["System Frequency"] = { value: "50 Hz", confidence: 0.95, page: 1 };
  settings["Nominal Current"] = { value: "1 A", confidence: 0.92, page: 1 };
  settings["CT Ratio"] = { value: `${100 + Math.floor(Math.random() * 900)}/1`, confidence: 0.9, page: 1 };
  settings["PT Ratio"] = { value: "11000/110", confidence: 0.88, page: 1 };
  
  // Add relay type specific settings
  if (relayType === "Differential") {
    settings["Differential Pickup"] = { value: `${(Math.random() * 0.4 + 0.2).toFixed(2)} In`, confidence: 0.87, page: 2 };
    settings["Slope 1"] = { value: `${Math.floor(Math.random() * 30 + 10)}%`, confidence: 0.85, page: 2 };
    settings["Slope 2"] = { value: `${Math.floor(Math.random() * 30 + 40)}%`, confidence: 0.84, page: 2 };
    settings["2nd Harmonic Blocking"] = { value: `${Math.floor(Math.random() * 10 + 15)}%`, confidence: 0.8, page: 3 };
    settings["5th Harmonic Blocking"] = { value: `${Math.floor(Math.random() * 10 + 25)}%`, confidence: 0.78, page: 3 };
  } 
  else if (relayType === "Distance") {
    settings["Zone 1 Reach"] = { value: `${(Math.random() * 0.5 + 0.7).toFixed(2)} Ω`, confidence: 0.9, page: 2 };
    settings["Zone 2 Reach"] = { value: `${(Math.random() * 1 + 1.2).toFixed(2)} Ω`, confidence: 0.87, page: 2 };
    settings["Zone 3 Reach"] = { value: `${(Math.random() * 2 + 2).toFixed(2)} Ω`, confidence: 0.85, page: 2 };
    settings["Zone 1 Time Delay"] = { value: "0 ms", confidence: 0.95, page: 3 };
    settings["Zone 2 Time Delay"] = { value: `${Math.floor(Math.random() * 100 + 300)} ms`, confidence: 0.92, page: 3 };
    settings["Zone 3 Time Delay"] = { value: `${Math.floor(Math.random() * 200 + 600)} ms`, confidence: 0.9, page: 3 };
  }
  else if (relayType === "Overcurrent") {
    settings["Phase Pickup"] = { value: `${(Math.random() * 2 + 0.5).toFixed(2)} A`, confidence: 0.89, page: 2 };
    settings["Time Multiplier"] = { value: `${(Math.random() * 0.9 + 0.1).toFixed(2)}`, confidence: 0.87, page: 2 };
    settings["Curve Type"] = { value: ["IEC Standard Inverse", "IEC Very Inverse", "IEC Extremely Inverse", "IEEE Moderately Inverse"][Math.floor(Math.random() * 4)], confidence: 0.95, page: 2 };
    settings["Instantaneous Pickup"] = { value: `${(Math.random() * 8 + 2).toFixed(1)} A`, confidence: 0.86, page: 3 };
    settings["Instantaneous Delay"] = { value: `${Math.floor(Math.random() * 50 + 50)} ms`, confidence: 0.84, page: 3 };
  }
  else if (relayType === "Earth Fault") {
    settings["Ground Pickup"] = { value: `${(Math.random() * 0.4 + 0.1).toFixed(2)} A`, confidence: 0.88, page: 2 };
    settings["Time Multiplier"] = { value: `${(Math.random() * 0.9 + 0.1).toFixed(2)}`, confidence: 0.86, page: 2 };
    settings["Curve Type"] = { value: ["IEC Standard Inverse", "IEC Very Inverse", "IEC Extremely Inverse", "Definite Time"][Math.floor(Math.random() * 4)], confidence: 0.94, page: 2 };
    settings["Time Delay"] = { value: `${Math.floor(Math.random() * 300 + 100)} ms`, confidence: 0.85, page: 3 };
  }
  else if (relayType === "Motor Protection") {
    settings["Thermal Overload Pickup"] = { value: `${(Math.random() * 0.3 + 1).toFixed(2)} A`, confidence: 0.87, page: 2 };
    settings["Thermal Time Constant"] = { value: `${Math.floor(Math.random() * 15 + 5)} min`, confidence: 0.85, page: 2 };
    settings["Locked Rotor Current"] = { value: `${(Math.random() * 3 + 3).toFixed(1)} A`, confidence: 0.83, page: 3 };
    settings["Locked Rotor Time"] = { value: `${Math.floor(Math.random() * 5 + 3)} s`, confidence: 0.8, page: 3 };
    settings["Starts per Hour"] = { value: `${Math.floor(Math.random() * 5 + 2)}`, confidence: 0.9, page: 4 };
    settings["Restart Inhibit Time"] = { value: `${Math.floor(Math.random() * 20 + 10)} min`, confidence: 0.87, page: 4 };
  }
  
  return settings;
}

/**
 * API endpoint for PDF extraction
 * @param request - The incoming request with PDF file
 * @returns Response with extracted relay settings data or error
 */
export async function POST(request: NextRequest) {
  console.log("[API] PDF extraction request received")
  
  try {
    // Check if request contains multipart form data
    if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
      console.error("[API] Invalid content type")
      return NextResponse.json(
        { error: "Invalid request. Expected multipart form data." },
        { status: 400 }
      )
    }
    
    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    
    // Validate file
    if (!file) {
      console.error("[API] No file provided")
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      )
    }
    
    // Check file type
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      console.error("[API] Invalid file type:", file.name)
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are accepted." },
        { status: 400 }
      )
    }
    
    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error("[API] File too large:", file.size)
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      )
    }
    
    console.log(`[API] Processing PDF: ${file.name} (${Math.round(file.size / 1024)}KB)`)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Determine relay type based on filename
    let relayType = "Overcurrent"
    const filename = file.name.toLowerCase()
    
    if (filename.includes("diff")) relayType = "Differential"
    else if (filename.includes("dist")) relayType = "Distance"
    else if (filename.includes("motor")) relayType = "Motor Protection"
    else if (filename.includes("earth") || filename.includes("ground")) relayType = "Earth Fault"
    
    console.log(`[API] Identified relay type: ${relayType}`)
    
    // Generate mock data
    const settings = generateMockData(relayType)
    
    // Prepare response data
    const responseData = {
      relayType,
      manufacturer: getRandomManufacturer(),
      model: getRandomModel(relayType),
      serialNumber: getRandomSerialNumber(),
      firmwareVersion: getRandomFirmwareVersion(),
      nominalFrequency: "50 Hz",
      nominalCurrent: "1 A",
      ctRatio: "100/1",
      ptRatio: "11000/110",
      settings,
      extractionMetadata: {
        processedAt: new Date().toISOString(),
        processingTimeMs: 3000,
        confidenceScore: 0.87,
        detectedPages: Object.keys(settings).length > 5 ? 4 : 3
      }
    }
    
    console.log(`[API] PDF extraction completed with ${Object.keys(settings).length} settings`)
    
    return NextResponse.json(responseData)
    
  } catch (error) {
    console.error("[API] PDF extraction error:", error)
    
    // Handle different error cases
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `PDF extraction failed: ${error.message}` },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred during PDF extraction." },
        { status: 500 }
      )
    }
  }
} 