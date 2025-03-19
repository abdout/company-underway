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
    
    // Extract fields that match the project model
    const { 
      projectName,
      description,
      location, 
      consultant, 
      client, 
      status,
      team,
      teamLead,
      systems,
      activities,
      mobilization,
      accommodation,
      kits,
      cars,
      // Legacy fields for backward compatibility
      title,
      desc
    } = body;
    
    console.log('Project API route: Creating project with data');

    try {
      // Create project using fields that match the schema
      const projectData = { 
        title: projectName || title, // Use projectName, fallback to title
        description: description || desc || `Project created at ${new Date().toLocaleString()}`,
        location: location || "",
        consultant: consultant || "",
        client: client || "",
        status: status || "Draft",
        team: Array.isArray(team) ? team : [],
        teamLead: teamLead || "",
        systems: Array.isArray(systems) ? systems : [],
        activities: Array.isArray(activities) ? activities : [],
        mobilization: mobilization || "",
        accommodation: accommodation || "",
        kits: Array.isArray(kits) ? kits : [],
        cars: Array.isArray(cars) ? cars : [],
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
  try {
    console.log('Project API route: Attempting to connect to database');
    await connectDB();
    console.log('Project API route: Connected to database, fetching projects');
    
    try {
      const projects = await Project.find({}).lean();
      console.log(`Project API route: Successfully fetched ${projects.length} projects`);
      return NextResponse.json({ projects: projects || [] });
    } catch (findError) {
      console.error('Project API route: Error finding projects', findError);
      // Return empty projects array instead of an error to prevent client-side crashes
      return NextResponse.json({ projects: [], error: 'Database query error, returning empty results' });
    }
  } catch (error) {
    console.error('Project API route: Error connecting to database or fetching projects', error);
    // Return empty projects array instead of an error to prevent client-side crashes
    return NextResponse.json({ 
      projects: [], 
      error: 'Database connection error, returning empty results'
    });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}