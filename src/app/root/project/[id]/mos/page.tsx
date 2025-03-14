'use client';

import Intro from '@/components/project/mos/intro'
import React, { useEffect } from 'react'
import Action from '@/components/project/layout/action';
import { useProject } from '@/provider/project';
import { usePDF } from 'react-to-pdf';
import ActivityWrapper from '@/components/project/mos/warpper';

interface Params {
  id: string;
}

const MOS = ({ params }: { params: Params }) => {
  const { project, fetchProject } = useProject();
  useEffect(() => {
    fetchProject(params.id);
  }, [params.id, fetchProject]);
  const { toPDF, targetRef } = usePDF({
    filename: `${project?.customer} MOS.pdf`,
  });
  return (
    <div className='flex flex-col gap-6 w-[60rem]'>
      <Action projectTitle={project?.customer || ""} toPDF={toPDF} />
      <div ref={targetRef} className="space-y-6">
      <Intro />
      <ActivityWrapper params={params} />
      </div>
    </div>
  )
}

export default MOS