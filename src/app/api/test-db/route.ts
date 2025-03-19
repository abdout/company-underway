import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Project from "@/components/platform/project/model";

export async function GET() {
  try {
    console.log('Test DB API: Attempting to connect to database');
    await connectDB();
    console.log('Test DB API: Connected to database successfully');

    // Try to fetch projects
    const projects = await Project.find({}).lean();
    console.log(`Test DB API: Found ${projects.length} projects`);

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      projectCount: projects.length,
      projects: projects
    });
  } catch (error) {
    console.error('Test DB API: Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 