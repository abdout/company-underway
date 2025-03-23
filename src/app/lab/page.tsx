import React from 'react';
import { getProject } from "@/components/platform/project/actions";
import { SystemType } from "@/components/platform/project/constant";
import IndexTable from "@/components/platform/project/itp/index-table";
import ActivityWrapper from '@/components/platform/project/itp/warpper';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ITPPage({ params }: PageProps) {
  // Fetch project data from MongoDB using server action
  const { success, data: project } = await getProject(params.id);

  if (!success || !project) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Inspection and Test Plan (ITP)</h1>
        <div className="text-red-500">Project not found</div>
      </div>
    );
  }

  // Get systems from MongoDB project data
  const systems = project.systems as SystemType[];

  return (
    <div className="container mx-auto py-8 px-4">
     
      <IndexTable systems={systems} />
      <ActivityWrapper systems={systems} />
    </div>
  );
}