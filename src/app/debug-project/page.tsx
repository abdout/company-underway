'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createProject } from "@/actions/projects";
import { testMongoConnection } from "@/actions/test-db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DebugProjectPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'testing-db' | 'creating-project' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString()}] ${message}`]);
  };

  const testDatabase = async () => {
    try {
      setStatus('testing-db');
      setError(null);
      setResult(null);
      setLogs([]);
      
      addLog("Testing MongoDB connection...");
      const dbResult = await testMongoConnection();
      
      if (dbResult.success) {
        addLog(`Database connection successful: ${dbResult.message}`);
        setResult({ dbTest: dbResult });
        return true;
      } else {
        addLog(`Database connection failed: ${dbResult.message}`);
        setError(dbResult.error || dbResult.message);
        setStatus('failed');
        setResult({ dbTest: dbResult });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`Error testing database: ${errorMessage}`);
      setError(errorMessage);
      setStatus('failed');
      return false;
    }
  };
  
  const createTestProject = async () => {
    try {
      // First test the database connection
      const dbConnected = await testDatabase();
      if (!dbConnected) {
        return;
      }
      
      setStatus('creating-project');
      addLog("Creating test project...");
      
      // Create a simplified test project
      const projectData = {
        customer: "Debug Test Project " + new Date().toISOString().substring(0, 19),
        location: "Debug Test Location",
        consultant: "Debug Test",
        client: "Debug Client",
        voltages: ["LV"],
        lvOptions: { 
          lvSwgr: { label: "Debug LV Test" }, 
          lvTrafo: "", 
          lvCable: "", 
          lvRmu: "" 
        },
        mvOptions: { 
          mvSwgr: "", 
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
        // Required model fields
        title: "Debug Test Project"
      };
      
      addLog("Sending project data to server action...");
      const projectResult = await createProject(projectData);
      
      if (projectResult.success) {
        addLog("Project created successfully!");
        setStatus('succeeded');
        setResult(prev => ({ ...prev, projectResult }));
      } else {
        addLog(`Project creation failed: ${projectResult.message}`);
        setError(projectResult.error || projectResult.message);
        setStatus('failed');
        setResult(prev => ({ ...prev, projectResult }));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog(`Error creating project: ${errorMessage}`);
      setError(errorMessage);
      setStatus('failed');
    }
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Project Creation Debug Mode</h1>
      <p className="text-gray-500 mb-6">Use this page to diagnose MongoDB connection and project creation issues</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Actions</CardTitle>
              <CardDescription>Test components individually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={testDatabase} 
                className="w-full"
                disabled={status === 'testing-db' || status === 'creating-project'}
              >
                Test Database Connection
              </Button>
              
              <Button 
                onClick={createTestProject} 
                className="w-full"
                disabled={status === 'testing-db' || status === 'creating-project'}
              >
                Create Test Project
              </Button>
              
              <Separator className="my-2" />
              
              <div className="text-sm">
                <div className="font-medium">Status: <span className="font-normal">{status}</span></div>
                {error && (
                  <div className="mt-2 p-2 bg-red-50 text-red-600 rounded">
                    <div className="font-medium">Error:</div>
                    <div className="text-xs whitespace-pre-wrap break-words">{error}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Debug Log</CardTitle>
              <CardDescription>Process events and error messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded font-mono text-xs h-80 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-500">No logs yet. Run a test to see logs.</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="pb-1">{log}</div>
                  ))
                )}
              </div>
              
              {result && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Result:</h3>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
            <CardDescription>Common issues and solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium">Could not connect to any servers in your MongoDB Atlas cluster</dt>
                <dd className="ml-4 text-sm">
                  <ul className="list-disc list-inside">
                    <li>Verify your MongoDB Atlas connection string in .env.local</li>
                    <li>Ensure your IP address is whitelisted in MongoDB Atlas</li>
                    <li>Check if your MongoDB Atlas cluster is active</li>
                    <li>Test if you can connect using MongoDB Compass or the Atlas UI</li>
                  </ul>
                </dd>
              </div>
              
              <div>
                <dt className="font-medium">Authentication failed</dt>
                <dd className="ml-4 text-sm">
                  <ul className="list-disc list-inside">
                    <li>Verify your username and password in the connection string</li>
                    <li>Check if the database user has the correct permissions</li>
                    <li>Try creating a new database user in MongoDB Atlas</li>
                  </ul>
                </dd>
              </div>
              
              <div>
                <dt className="font-medium">MONGODB_URI environment variable is not defined</dt>
                <dd className="ml-4 text-sm">
                  <ul className="list-disc list-inside">
                    <li>Create or update the .env.local file in your project root</li>
                    <li>Add MONGODB_URI=your_connection_string to the file</li>
                    <li>Restart your development server</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 