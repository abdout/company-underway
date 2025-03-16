'use client';

import Intro from '@/components/platform/project/mos/intro'
import React, { useEffect, useRef } from 'react'
import Action from '@/components/platform/project/layout/action';
import { useProject } from '@/provider/project';
import { usePDF } from 'react-to-pdf';
import ActivityWrapper from '@/components/platform/project/mos/warpper';

interface Params {
  id: string;
}

const MOS = ({ params }: { params: Params | Promise<Params> }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;
  
  const { project, fetchProject } = useProject();
  const loadedProjectId = useRef<string | null>(null);
  
  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("MOS page: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("MOS page: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
  }, [id, fetchProject, project]);
  
  const { toPDF, targetRef } = usePDF({
    filename: `${project?.customer} MOS.pdf`,
  });
  
  return (
    <div className='flex flex-col gap-6 w-[60rem]'>
      <Action projectTitle={project?.customer || ""} toPDF={toPDF} />
      <div ref={targetRef} className="space-y-6">
        <Intro />
        <ActivityWrapper params={unwrappedParams} />
      </div>
    </div>
  )
}

export default MOS