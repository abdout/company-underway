import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import { Daily } from '@/components/platform/daily/model'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Get a specific daily report by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const id = params.id
    const dailyReport = await Daily.findById(id)
    
    if (!dailyReport) {
      return NextResponse.json(
        { error: 'Daily report not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(dailyReport)
  } catch (error) {
    console.error(`Error fetching daily report with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch daily report' },
      { status: 500 }
    )
  }
}

// Update a daily report by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const id = params.id
    const data = await req.json()
    
    const updatedReport = await Daily.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    )
    
    if (!updatedReport) {
      return NextResponse.json(
        { error: 'Daily report not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedReport)
  } catch (error) {
    console.error(`Error updating daily report with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to update daily report' },
      { status: 500 }
    )
  }
}

// Delete a daily report by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB()
    
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const id = params.id
    
    const deletedReport = await Daily.findByIdAndDelete(id)
    
    if (!deletedReport) {
      return NextResponse.json(
        { error: 'Daily report not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Daily report deleted successfully' })
  } catch (error) {
    console.error(`Error deleting daily report with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to delete daily report' },
      { status: 500 }
    )
  }
} 