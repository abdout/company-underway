'use client';

import Intro from '@/components/platform/project/mos/intro'
import React, { useEffect, useRef } from 'react'
import Action from '@/components/platform/project/layout/action';
import { useProject } from '@/provider/project';
import { usePDF } from 'react-to-pdf';
import ActivityWrapper from '@/components/platform/project/mos/warpper';
import { allActivities } from 'contentlayer/generated';
import { MDXContent } from '@/components/mdx-content';
import type { Activity } from 'contentlayer/generated';

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
  
  // Group activities by system type and subitem
  const groupedActivities = allActivities.reduce((acc, activity) => {
    if (!acc[activity.systemType]) {
      acc[activity.systemType] = {};
    }
    if (!acc[activity.systemType][activity.subitem]) {
      acc[activity.systemType][activity.subitem] = [];
    }
    acc[activity.systemType][activity.subitem].push(activity);
    return acc;
  }, {} as Record<string, Record<string, Activity[]>>);
  
  return (
    <div className='flex flex-col gap-6 w-[60rem]'>
      <Action projectTitle={project?.customer || ""} toPDF={toPDF} />
      <div ref={targetRef} className="space-y-6">
        <Intro />
        {Object.entries(groupedActivities).map(([systemType, subitems]) => (
          <div key={systemType} className="space-y-4">
            <h2 className="text-2xl font-bold">{systemType}</h2>
            {Object.entries(subitems).map(([subitem, activities]) => (
              <div key={subitem} className="ml-4 space-y-2">
                <h3 className="text-xl font-semibold">{subitem}</h3>
                {activities.map((activity) => (
                  <div key={activity.slug} className="ml-4 space-y-2">
                    <h4 className="text-lg font-medium">{activity.title}</h4>
                    <div className="prose prose-sm">
                      <MDXContent code={activity.body.code} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MOS