import React from 'react';
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Project } from './types';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Delete from "./home/crud/delete";

interface ProjectCardProps {
  project: Project;
  contextMenu: { x: number, y: number, projectID: string | null };
  onRightClick: (e: React.MouseEvent, projectID: string) => void;
  onCloseContextMenu: () => void;
  onOpenDialog: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  contextMenu,
  onRightClick,
  onCloseContextMenu,
  onOpenDialog,
}) => {
  return (
    <Card
      className={`border border-gray-400 hover:border-black h-48 relative ${contextMenu.projectID === project._id ? 'opacity-20' : ''}`}
      onContextMenu={(e) => {
        if (project._id) {
          onRightClick(e, project._id);
        }
      }}
    >
      <Link href={`/project/${project._id}`}>
        <CardHeader>
          <strong className="font-heading text-2xl">{project.customer}</strong>
          <p className="line-clamp-1 overflow-hidden text-ellipsis">
            {project.location ? project.location : <span className="opacity-50">Location</span>}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 -ml-1 items-center -mt-2">
            <Icon icon="material-symbols-light:bookmark-sharp" width={25}/>
            <p>{project.client || 'No Client'}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 items-center -mt-5">
          <div className={`rounded-full w-4 h-4 ${
            project.status === 'done' ? 'bg-green-600' :
            project.status === 'on_progress' ? 'bg-blue-600' :
            project.status === 'stuck' ? 'bg-red-600' :
            'bg-gray-600'
          }`}></div>
          <p className="capitalize">{project.status || 'neutral'}</p>
        </CardFooter>
      </Link>

      {contextMenu.projectID === project._id && (
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center space-x-4 p-8 bg-white bg-opacity-50"
          onMouseLeave={onCloseContextMenu}
        >
          <Delete id={contextMenu.projectID} />
          <button
            onClick={() => project._id && onOpenDialog(project._id)}
            className="flex gap-4 opacity-75 hover:opacity-100"
          >
            <Icon icon="icon-park-solid:edit" width={40} />
          </button>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard; 