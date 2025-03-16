'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createProject } from '@/actions/projects';
import { createTask } from '@/actions/tasks';

export default function TestProjectCreationPage() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createTestProject = async () => {
    setLoading(true);
    setStatus('Creating project...');
    setError(null);
    setResult(null);
    
    try {
      // Create a simple test project
      const projectName = `Test Project ${new Date().toISOString()}`;
      
      const projectResult = await createProject({
        customer: projectName,
        location: 'Test Location',
        consultant: 'Test Consultant',
        client: 'Test Client',
        voltages: ['LV'],
        lvOptions: { 
          lvSwgr: [{ label: 'Test Switchgear', value: 'test-switchgear' }], 
          lvTrafo: [], 
          lvCable: [], 
          lvRmu: [] 
        },
        mvOptions: { mvSwgr: [], mvTrafo: [], mvCable: [], mvRmu: [] },
        hvOptions: { hvSwgr: [], hvTrafo: [], hvCable: [], hvRmu: [] },
        evOptions: { evSwgr: [], evTrafo: [], evCable: [], evRmu: [] },
        title: projectName,
        desc: 'Test project description',
        status: 'Active',
        club: 'Test Club',
      });
      
      if (projectResult.success) {
        setStatus('Project created, creating task...');
        
        // Create a test task
        const taskResult = await createTask({
          project: projectName,
          task: 'Test Task',
          club: 'Test Club',
          status: 'In Progress',
          priority: 'Medium',
          duration: '4',
          desc: `Task for ${projectName}`,
          label: 'Test Label',
          tag: 'test', // String, not array
          remark: 'Test remark'
        });
        
        if (taskResult.success) {
          setStatus('Success');
          setResult({ project: projectResult, task: taskResult });
        } else {
          setStatus('Task creation failed');
          setError(taskResult.error || 'Failed to create task');
          setResult({ project: projectResult, taskError: taskResult });
        }
      } else {
        setStatus('Project creation failed');
        setError(projectResult.error || 'Failed to create project');
        setResult({ projectError: projectResult });
      }
    } catch (err) {
      setStatus('Error');
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Test Project Creation</h1>
      
      <div className="mb-6">
        <Button 
          onClick={createTestProject} 
          disabled={loading}
          className="mb-4"
        >
          {loading ? 'Creating...' : 'Create Test Project & Task'}
        </Button>
        
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-medium mb-2">Status: {status}</p>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md mb-4">
              <p className="font-medium">Error:</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 