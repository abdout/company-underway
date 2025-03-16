"use client";
import React, { useEffect } from "react";
import Create from "./crud/create";
import { Project } from '@/components/platform/project/project';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectDialogProps {
  projectToEdit?: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ projectToEdit, open, onOpenChange }: ProjectDialogProps) {
  console.log("ProjectDialog: Rendering with props", { open, hasProjectToEdit: !!projectToEdit });
  
  useEffect(() => {
    console.log("ProjectDialog: Dialog open state changed to", open);
  }, [open]);
  
  useEffect(() => {
    if (projectToEdit) {
      console.log("ProjectDialog: Project to edit changed", projectToEdit);
    }
  }, [projectToEdit]);

  return (
    <Dialog
      open={open}
      onOpenChange={(newState) => {
        console.log("ProjectDialog: Dialog onOpenChange triggered with state", newState);
        onOpenChange(newState);
      }}
    >
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle>
            {projectToEdit ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogDescription>
            {projectToEdit 
              ? "Update the details of your existing project" 
              : "Fill in the details to create a new project"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-2">
          <Create 
            projectToEdit={projectToEdit} 
            onSuccess={() => {
              console.log("ProjectDialog: Create onSuccess callback triggered");
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDialog; 