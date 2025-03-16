"use client";
import { createTask } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestTaskPage() {
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<any>(null);
  const [projectName, setProjectName] = useState<string>("Test Project");

  const handleCreateTask = async () => {
    try {
      setResult("Creating task...");
      setStatus('loading');
      setError(null);
      
      // Create a test task
      const taskResult = await createTask({
        project: projectName,
        task: "Test Task " + new Date().toISOString(),
        club: "Test Club",
        status: "In Progress",
        priority: "Medium",
        duration: "4",
        desc: `Task for ${projectName} project`,
        label: "Test Label",
        tag: "test,example",
        remark: "Test remark"
      });

      if (taskResult.success) {
        setResult("Task created successfully!");
        setStatus('succeeded');
      } else {
        setResult(`Error: ${taskResult.message}`);
        setStatus('failed');
        setError(taskResult.error);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('failed');
      setError(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Task Server Action Test Page</h1>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">Project Name:</label>
        <input 
          type="text" 
          value={projectName} 
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <Button onClick={handleCreateTask} variant="default">
          Create Test Task
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Result:</h2>
        <div className="p-4 bg-gray-100 rounded">
          {result || "No action taken yet"}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Task State:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <pre>Status: {status}</pre>
          {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
} 