'use server';

import connectDB from "@/lib/mongodb";
import Project from "@/components/platform/project/model";
import { revalidatePath } from "next/cache";

export type ProjectData = {
  // Original fields from the form
  customer: string;
  location: string;
  consultant: string;
  client: string;
  voltages: string[] | { [key: string]: boolean };
  lvOptions: any;
  mvOptions: any;
  hvOptions: any;
  evOptions: any;
  // Model fields
  title?: string;
  desc?: string;
  club?: string;
  status?: string;
  readme?: string;
  roadmap?: string;
  task?: string;
  contributor?: string;
  material?: string;
  chat?: string;
};

export async function createProject(data: ProjectData) {
  console.log('Server Action: Creating project with data', data);
  
  try {
    // Connect to database
    console.log('Server Action: Attempting to connect to database');
    await connectDB();
    console.log('Server Action: Database connection successful');
    
    // Handle different formats of voltages (array or object)
    let voltagesObj = { LV: false, MV: false, HV: false, EV: false };
    
    if (Array.isArray(data.voltages)) {
      // If voltages is an array of strings like ['LV', 'MV']
      voltagesObj = {
        LV: data.voltages.includes('LV'),
        MV: data.voltages.includes('MV'),
        HV: data.voltages.includes('HV'),
        EV: data.voltages.includes('EV')
      };
    } else if (typeof data.voltages === 'object') {
      // If voltages is already an object like { LV: true, MV: false, ... }
      voltagesObj = {
        ...voltagesObj, // Default values
        ...data.voltages // Override with provided values
      };
    }
    
    // Create project data object with new schema
    const projectData = { 
      customer: data.customer,
      description: data.desc || `Project for ${data.customer}`,
      location: data.location || "",
      consultant: data.consultant || "",
      client: data.client || "",
      status: data.status || "Active",
      voltages: voltagesObj,
      lvOptions: data.lvOptions,
      mvOptions: data.mvOptions,
      hvOptions: data.hvOptions,
      evOptions: data.evOptions
    };
    
    console.log('Server Action: Project data to save', projectData);
    const newProject = await Project.create(projectData);
    console.log('Server Action: Project created successfully', newProject);
    
    // Revalidate the projects page to reflect new data
    revalidatePath('/project');
    
    return { 
      success: true, 
      message: "Project Created", 
      project: JSON.parse(JSON.stringify(newProject)) 
    };
  } catch (error) {
    console.error('Server Action: Error creating project', error);
    return { 
      success: false, 
      message: "Failed to create project", 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

export async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find();
    return { 
      success: true, 
      projects: JSON.parse(JSON.stringify(projects)) 
    };
  } catch (error) {
    console.error('Server Action: Error getting projects', error);
    return { 
      success: false, 
      message: "Failed to get projects", 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(id);
    revalidatePath('/project');
    return { success: true, message: "Project deleted" };
  } catch (error) {
    console.error('Server Action: Error deleting project', error);
    return { 
      success: false, 
      message: "Failed to delete project", 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
} 