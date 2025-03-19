import React from "react";
import { usePDF } from "react-to-pdf";
import { useProject } from "@/provider/project";
import IndexTable from "@/components/platform/project/itp/index-table";
import ActivityWrapper from "@/components/platform/project/itp/warpper";
import Action from "@/components/platform/project/layout/action";
import { SystemType } from "@/components/platform/project/constant";
import { getProject } from "@/components/platform/project/actions";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ITP({ params }: PageProps) {
  const { success, data: project } = await getProject(params.id);
  
  if (!success || !project) {
    return <div>Project not found</div>;
  }

  const serializedProject = JSON.parse(JSON.stringify(project));
  const systems = serializedProject.systems as SystemType[];
  
  return (
    <div className="flex flex-col gap-8 mb-10">
      <Action projectTitle={serializedProject?.customer || ""} />
      <div className="space-y-8">
        <IndexTable systems={systems} />
        <ActivityWrapper />
      </div>
    </div>
  );
}
