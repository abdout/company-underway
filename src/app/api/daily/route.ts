import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Daily from '@/components/platform/daily/model'
import { auth } from '@/auth'

// Get all daily reports
export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters for filtering
    const url = new URL(req.url)
    const engineerId = url.searchParams.get('engineerId')
    const project = url.searchParams.get('project')
    const status = url.searchParams.get('status')
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')

    // Build query
    const query: any = {}
    
    if (engineerId) {
      query['engineer.id'] = engineerId
    }
    
    if (project) {
      query.project = project
    }
    
    if (status) {
      query.status = status
    }
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) }
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) }
    }

    const dailyReports = await Daily.find(query).sort({ date: -1 })
    
    return NextResponse.json(dailyReports)
  } catch (error) {
    console.error('Error fetching daily reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily reports' },
      { status: 500 }
    )
  }
}

// Create a new daily report
export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await req.json()
    
    // Validate required fields
    if (!data.title || !data.description || !data.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new daily report
    const newDaily = await Daily.create(data)
    
    return NextResponse.json(newDaily, { status: 201 })
  } catch (error) {
    console.error('Error creating daily report:', error)
    return NextResponse.json(
      { error: 'Failed to create daily report' },
      { status: 500 }
    )
  }
} 