"use client";
import React, { useState, useEffect } from "react";
import { ProjectDialog } from "./home/dialog";
import { Icon } from "@iconify/react";
import { Project } from './types';
import { getProjects } from './actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCreateForm from './form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ProjectCard from './card';

const ProjectList: React.FC = () => {
  console.log("ProjectList: Component rendering");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Local state for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, projectID: string | null }>({ x: 0, y: 0, projectID: null });

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("ProjectList: Fetching projects...");
        const result = await getProjects();
        console.log("ProjectList: Server action response:", result);
        
        if (result.success && result.data) {
          console.log("ProjectList: Projects fetched successfully:", result.data);
          console.log("ProjectList: Number of projects:", result.data.length);
          setProjects(result.data as unknown as Project[]);
        } else {
          console.error("ProjectList: Failed to fetch projects:", result.message);
          toast.error(result.message || 'Failed to fetch projects');
        }
      } catch (error) {
        console.error("ProjectList: Error fetching projects:", error);
        console.error("ProjectList: Error details:", {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        toast.error('An error occurred while fetching projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Log when projects state changes
  useEffect(() => {
    console.log("ProjectList: Projects state updated:", projects);
  }, [projects]);

  useEffect(() => {
    console.log("ProjectList: Dialog state changed", { dialogOpen, editingProjectId });
  }, [dialogOpen, editingProjectId]);

  const handleRightClick = (e: React.MouseEvent, projectID: string) => {
    e.preventDefault();
    console.log("ProjectList: Context menu opened for project", projectID);
    setContextMenu({ x: e.clientX, y: e.clientY, projectID });
  };

  const handleCloseContextMenu = () => {
    console.log("ProjectList: Context menu closed");
    setContextMenu({ x: 0, y: 0, projectID: null });
  };

  const handleOpenDialog = (projectId: string | null = null) => {
    console.log("ProjectList: Opening dialog for project", projectId);
    setEditingProjectId(projectId);
    setDialogOpen(true);
    handleCloseContextMenu();
  };

  const handleCloseDialog = () => {
    console.log("ProjectList: Closing dialog");
    setDialogOpen(false);
    setEditingProjectId(null);
  };

  const projectToEdit = editingProjectId ? projects.find((p: Project) => p._id === editingProjectId) : null;
  
  useEffect(() => {
    if (projectToEdit) {
      console.log("ProjectList: Project to edit found", projectToEdit);
    }
  }, [projectToEdit]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <ProjectDialog 
        open={dialogOpen} 
        onOpenChange={(open) => {
          console.log("ProjectList: Dialog onOpenChange called with value:", open);
          setDialogOpen(open);
          if (!open) {
            setEditingProjectId(null);
          }
        }}
        projectToEdit={projectToEdit} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project._id}
            project={project}
            contextMenu={contextMenu}
            onRightClick={handleRightClick}
            onCloseContextMenu={handleCloseContextMenu}
            onOpenDialog={handleOpenDialog}
          />
        ))}

        <div className="h-48">
          <button
            className="w-full h-full p-6 border rounded-xl flex flex-col items-center justify-center hover:border-black opacity-70 hover:opacity-100"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Icon icon="ph:plus-thin" width={70} />
          </button>
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-full h-screen p-0 overflow-hidden">
          <ProjectCreateForm onSuccess={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectList;