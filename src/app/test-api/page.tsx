"use client";
import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestApiPage() {
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<any>(null);

  const handleCreateProject = async () => {
    try {
      setResult("Creating project...");
      setStatus('loading');
      setError(null);
      
      // Create a test project with sample data that matches the model schema
      const projectResult = await createProject({
        // Original fields needed by the form
        customer: "Test Project " + new Date().toISOString(),
        location: "Test Location",
        consultant: "Test Consultant",
        client: "Test Client",
        voltages: ["LV", "MV"],
        lvOptions: { 
          lvSwgr: { label: "LV Switchgear Test" }, 
          lvTrafo: { label: "LV Transformer Test" }, 
          lvCable: "", 
          lvRmu: "" 
        },
        mvOptions: { 
          mvSwgr: { label: "MV Switchgear Test" }, 
          mvTrafo: "", 
          mvCable: "", 
          mvRmu: "" 
        },
        hvOptions: { 
          hvSwgr: "", 
          hvTrafo: "", 
          hvCable: "", 
          hvRmu: "" 
        },
        evOptions: { 
          evSwgr: "", 
          evTrafo: "", 
          evCable: "", 
          evRmu: "" 
        },
        // Add fields required by the Project model
        title: "Test Project " + new Date().toISOString(),
        desc: "This is a test project created for testing the API",
        club: "Test Club",
        status: "Active",
        readme: "Test readme content",
        roadmap: "Test roadmap content",
        task: "Initial tasks",
        contributor: "Test Team",
        material: "Test materials",
        chat: "Test chat"
      });

      if (projectResult.success) {
        setResult("Project created successfully!");
        setStatus('succeeded');
      } else {
        setResult(`Error: ${projectResult.message}`);
        setStatus('failed');
        setError(projectResult.error);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('failed');
      setError(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Server Actions Test Page</h1>
      
      <div className="mb-6">
        <Button onClick={handleCreateProject} variant="default">
          Create Test Project
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Result:</h2>
        <div className="p-4 bg-gray-100 rounded">
          {result || "No action taken yet"}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Project State:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <pre>Status: {status}</pre>
          {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
} 