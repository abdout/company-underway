"use client";
import React, { useEffect, useRef } from "react";
import { usePDF } from "react-to-pdf";
import { useProject } from "@/provider/project";
import Index from "@/components/platform/project/itp/index";
import ActivityWrapper from "@/components/platform/project/itp/warpper";
import Action from "@/components/platform/project/layout/action";

interface Params {
  id: string;
}

const ITP = ({ params }: { params: Params | Promise<Params> }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;

  const { project, fetchProject } = useProject();
  const loadedProjectId = useRef<string | null>(null);

  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("ITP page: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("ITP page: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
  }, [id, fetchProject, project]);

  const { toPDF, targetRef } = usePDF({
    filename: `${project?.customer} ITP.pdf`,
  });
  
  return (
    <div className="flex flex-col gap-8 mb-10">
      <Action projectTitle={project?.customer || ""} toPDF={toPDF} />
      <div ref={targetRef} className="space-y-8">
        <Index params={unwrappedParams} />
        <ActivityWrapper params={unwrappedParams} />
      </div>
    </div>
  );
};

export default ITP;
