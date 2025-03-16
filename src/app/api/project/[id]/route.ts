import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Project from "@/components/platform/project/model";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log(`Project API route: Fetching project with ID ${id}`);

    try {
      // Connect to database
      console.log('Project API route: Attempting to connect to database');
      await connectDB();
      console.log('Project API route: Database connection successful');
    } catch (dbError) {
      console.error('Project API route: Database connection error', dbError);
      return NextResponse.json(
        { error: 'Failed to connect to database', details: dbError instanceof Error ? dbError.message : String(dbError) },
        { status: 500 }
      );
    }

    // Find the project by ID
    const project = await Project.findById(id);
    
    if (!project) {
      console.log(`Project API route: Project with ID ${id} not found`);
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    console.log(`Project API route: Successfully fetched project with ID ${id}`);
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Project API route: Error fetching project', error);
    return NextResponse.json(
      { error: 'Failed to fetch project', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 