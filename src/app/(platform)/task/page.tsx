'use client';
import React, { useState, useEffect } from 'react';
import { getColumns } from '@/components/platform/task/column';
import { Content } from '@/components/platform/task/content';
import { toast } from 'sonner';
import { getTasks } from '@/components/platform/task/actions';
import { Task } from '@/components/platform/task/type';
import { useRouter } from 'next/navigation';

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const fetchTasks = async () => {
    console.log('=== Client: Fetching Tasks ===');
    try {
      console.log('Setting isLoading to true');
      setIsLoading(true);
      
      console.log('Calling getTasks API');
      const result = await getTasks();
      console.log('API response status:', result.error ? 'Error' : 'Success');
      
      if (result.error) {
        console.error('Failed to fetch tasks:', result.error);
        toast.error('Failed to fetch tasks');
        return;
      }
      
      console.log(`Received ${result.tasks?.length || 0} tasks from API`);
      setTasks(result.tasks || []);
    } catch (error) {
      console.error('Exception in fetchTasks:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      toast.error('Failed to fetch tasks');
      setTasks([]);
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  };
  
  // Get columns with the fetchTasks function
  const columns = getColumns(fetchTasks);
  
  // Initial fetch on component mount
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const handleRowClick = (task: Task) => {
    router.push(`/task/${task._id}`);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-heading">Task</h1>
          <p className="text-muted-foreground">Manage. track.</p>
        </div>
      </div>
      
      <Content 
        columns={columns} 
        data={tasks} 
        onTasksChange={fetchTasks} 
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default TaskPage;