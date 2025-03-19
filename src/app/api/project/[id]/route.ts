import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Project from "@/components/platform/project/model";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Project API route: Fetching project with id: ${id}`);

    await connectDB();
    
    const project = await Project.findById(id).lean();
    
    if (!project) {
      console.log(`Project API route: No project found with id: ${id}`);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    console.log(`Project API route: Successfully fetched project: ${id}`);
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Project API route: Error fetching project', error);
    return NextResponse.json(
      { error: 'Failed to fetch project', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 