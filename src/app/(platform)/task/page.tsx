'use client';
import React from 'react';
import { columns } from '@/components/platform/task/coloum';
import { useTask } from '@/components/platform/task/context';
import { Content } from '@/components/platform/task/content';

const Task = () => {
  const { tasks } = useTask();
  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-4xl font-heading">Task</h1>
        <p className="text-muted-foreground">Manage. track.</p>
      </div>
      
      <Content columns={columns} data={tasks} />
    </div>
  );
};

export default Task;