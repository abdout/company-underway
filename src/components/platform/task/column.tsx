'use client'

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { Task } from './type'
import TaskForm from './form'
import DeleteTask from './delete'
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from './constant'

// TeamCell component to display team members with rounded images
const TeamCell: React.FC = () => {
  return (
    <div className="flex -space-x-2">
      <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64" 
          alt="Team member 1"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64" 
          alt="Team member 2"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

interface ActionsCellProps {
  row: { original: Task };
  onTaskUpdate?: () => Promise<void>;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row, onTaskUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditModalOpen(true);
        }}
        className="h-8 w-8 p-0"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      
      <DeleteTask 
        task={row.original}
        onSuccess={async () => {
          if (onTaskUpdate) await onTaskUpdate();
          return Promise.resolve();
        }}
      />
      
      {isEditModalOpen && (
        <TaskForm 
          taskToEdit={row.original}
          onSuccess={async () => {
            if (onTaskUpdate) await onTaskUpdate();
            return Promise.resolve();
          }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

interface StatusCircleProps {
  status: string;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ status }) => {
  const statusColors: { [key: string]: string } = {
    'stuck': 'bg-red-400',
    'in_progress': 'bg-yellow-400',
    'done': 'bg-green-400',
    'cancelled': 'bg-gray-400',
    'Neutral': 'bg-gray-400',
    'In Progress': 'bg-yellow-400',
    'Completed': 'bg-green-400',
    'Stopped': 'bg-gray-400',
  };
  const colorClass = statusColors[status] || 'bg-gray-400'; // Default color

  return (
    <div className={`w-4 h-4 rounded-full ${colorClass}`} />
  );
};

interface PriorityCircleProps {
  priority: string;
}

const PriorityCircle: React.FC<PriorityCircleProps> = ({ priority }) => {
  const priorityColors: { [key: string]: string } = {
    'high': 'bg-red-400',
    'medium': 'bg-yellow-400',
    'low': 'bg-blue-400',
    'neutral': 'bg-gray-400',
    'Neutral': 'bg-gray-400',
    'Low': 'bg-blue-400',
    'Medium': 'bg-yellow-400',
    'High': 'bg-red-400',
  };
  const colorClass = priorityColors[priority] || 'bg-gray-400'; // Default color

  return (
    <div className={`w-4 h-4 rounded-full ${colorClass}`} />
  );
};

// Construct the columns with a function that accepts the onTaskUpdate callback
export const getColumns = (onTaskUpdate?: () => Promise<void>): ColumnDef<Task>[] => [
  {
    accessorKey: 'task',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 m-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'project',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 m-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Project
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'club',
    header: () => <div>Team</div>,
    cell: () => <TeamCell />
  },
  {
    accessorKey: 'status',
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusLabel = TASK_STATUS_LABELS[status as keyof typeof TASK_STATUS_LABELS] || status;
      
      return (
        <div className="flex items-center gap-2">
          <StatusCircle status={status} />
          <span>{statusLabel}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: () => <div>Priority</div>,
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string;
      const priorityLabel = TASK_PRIORITY_LABELS[priority as keyof typeof TASK_PRIORITY_LABELS] || priority;
      
      return (
        <div className="flex items-center gap-2">
          <PriorityCircle priority={priority} />
          <span>{priorityLabel}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'duration',
    header: () => <div className="text-center">Duration</div>,
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <span>{row.getValue('duration')} hr</span>
      </div>
    ),
  },
  {
    accessorKey: 'remark',
    header: () => <div>Remarks</div>,
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} onTaskUpdate={onTaskUpdate} />,
  }
]; 