'use client'

import React, { useEffect } from 'react'; // Import React and useEffect
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
// import { Icon } from '@iconify/react';
import { task } from '@/components/platform/task/type'
import Link from 'next/link'
import { useTask } from '@/components/platform/task/context'
import Image from 'next/image'

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

const ActionsCell: React.FC<{ row: { original: task } }> = ({ row }) => {
  const { refreshTasks, tasks, deleteTask } = useTask();
  
  useEffect(() => {
    refreshTasks();
    console.log(tasks);
  }, []);

  const task = row.original;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(task._id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/task/${task._id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem onClick={() => task._id && deleteTask(task._id)}>Delete</DropdownMenuItem> 
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface StatusCircleProps {
  status: string;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ status }) => {
  const statusColors: { [key: string]: string } = {
      'Neutral': 'bg-gray-400',
      'In Progress': 'bg-yellow-400',
      'Completed': 'bg-green-400',
      'Stopped': 'bg-red-400',
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


export const columns: ColumnDef<task>[] = [
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
    cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <StatusCircle status={row.getValue('status')} />
            <span>{row.getValue('status')}</span>
        </div>
    ),
  },
  {
    accessorKey: 'priority',
    header: () => <div>Priority</div>,
    cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <PriorityCircle priority={row.getValue('priority')} />
            <span>{row.getValue('priority')}</span>
        </div>
    ),    
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
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ActionsCell
  }
]
