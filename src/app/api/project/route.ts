import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Project from "@/components/platform/project/model";

export async function POST(request: NextRequest) {
  console.log('Project API route: Processing project creation');
  
  try {
    // Get the request body
    const body = await request.json();
    console.log('Project API route: Request body', body);

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
    
    // Extract the fields needed for project model
    const { 
      // Original fields directly mapped to new schema
      customer, 
      description,
      location, 
      consultant, 
      client, 
      status,
      voltages,
      lvOptions,
      mvOptions,
      hvOptions,
      evOptions,
      // Legacy fields for backward compatibility
      title,
      desc
    } = body;
    
    console.log('Project API route: Creating project with data', { 
      customer,
      location,
      consultant,
      client,
      status
    });

    try {
      // Handle different formats of voltages (array or object)
      let voltagesObj = { LV: false, MV: false, HV: false, EV: false };
      
      if (Array.isArray(voltages)) {
        // If voltages is an array of strings like ['LV', 'MV']
        voltagesObj = {
          LV: voltages.includes('LV'),
          MV: voltages.includes('MV'),
          HV: voltages.includes('HV'),
          EV: voltages.includes('EV')
        };
      } else if (typeof voltages === 'object' && voltages !== null) {
        // If voltages is already an object like { LV: true, MV: false, ... }
        voltagesObj = {
          ...voltagesObj, // Default values
          ...voltages // Override with provided values
        };
      }
      
      // Create project in the database with new schema fields
      const projectData = { 
        customer: customer || title, // Use customer, fallback to title for backward compatibility
        description: description || desc || `Project for ${customer || title}`,
        location: location || "",
        consultant: consultant || "",
        client: client || "",
        status: status || "Active",
        voltages: voltagesObj,
        lvOptions: lvOptions || {},
        mvOptions: mvOptions || {},
        hvOptions: hvOptions || {},
        evOptions: evOptions || {}
      };
      
      console.log('Project API route: Project data to save', projectData);
      const newProject = await Project.create(projectData);
      console.log('Project API route: Project created successfully', newProject);
      
      return NextResponse.json({ 
        message: "Project Created", 
        project: newProject 
      }, { status: 201 });
    } catch (createError) {
      console.error('Project API route: Error in Project.create()', createError);
      return NextResponse.json(
        { error: 'Failed to create project in database', details: createError instanceof Error ? createError.message : String(createError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Project API route: Error creating project', error);
    return NextResponse.json(
      { error: 'Failed to create project', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const projects = await Project.find() as unknown[];
  return NextResponse.json({ projects });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}