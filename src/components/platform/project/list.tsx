"use client";
import { useProject } from "@/provider/project";
import React, { useState, useEffect } from "react";
import Delete from "./home/crud/delete";
import ProjectDialog from "./home/dialog";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Project } from '@/components/platform/project/project';

const ProjectList: React.FC = () => {
  console.log("ProjectList: Component rendering");
  const { projects } = useProject();
  console.log("ProjectList: Loaded projects:", projects?.length || 0);
  
  // Local state for dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, projectID: string | null }>({ x: 0, y: 0, projectID: null });

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
      
      {projects.map((t: Project) => (
        <div
          key={t._id}
          className="p-6 border m-5 w-[12rem] flex flex-col items-start  hover:border-black relative"
          onContextMenu={(e) => {
            if (t._id) {
              handleRightClick(e, t._id);
            }
          }}
        >
          <div className={`${contextMenu.projectID === t._id ? 'opacity-20' : ''}`}>
            <Link href={`/project/${t._id}`}>
              <div>
                <h1>{t.customer}</h1>
                <h3>{t.location ? t.location : <span className="opacity-50">Location</span>}</h3>
                <div className="flex gap-2 ml-[-6px] items-center mt-2 my-1">
                <Icon icon="material-symbols-light:bookmark-sharp" width={25}/>
                  <h4>Osman</h4>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="rounded-full bg-green-600 w-[16px] h-[16px] md:w-[14px] md:h-[14px]"></div>
                  <h4 className="md:text-[15px]">Done</h4>
                </div>
              </div>
            </Link>
          </div>

          {contextMenu.projectID === t._id && (
            <div
              className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center space-x-4 p-8 bg-white bg-opacity-50 "
              onMouseLeave={handleCloseContextMenu}
            >
              <Delete id={contextMenu.projectID} />
              <button
                onClick={() => t._id && handleOpenDialog(t._id)}
                className="flex gap-4 opacity-75 hover:opacity-100"
              >
                <Icon icon="icon-park-solid:edit" width={40} />
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        className="p-6 border m-5  w-[12rem]  flex flex-col items-center justify-center hover:border-black opacity-70 hover:opacity-100"
        onClick={() => handleOpenDialog(null)}
      >
        <Icon icon="ph:plus-thin" width={70} />
      </button>
    </>
  );
};

export default ProjectList;