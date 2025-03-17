'use client';
import React, { useEffect, useRef } from "react";
import { useProject } from "@/provider/project";
import { HeadTitle } from "@/constant/project/itp/head";
import SubActivity from "./subactivity";

interface IndexProps {
  params: Params | Promise<Params>;
  option: OptionKey;
  index: number;
}

interface Params {
  id: string;
}

type OptionKey =
  | "evSwgr"
  | "evTrafo"
  | "evCable"
  | "evRmu"
  | "hvSwgr"
  | "hvTrafo"
  | "hvCable"
  | "hvRmu"
  | "mvSwgr"
  | "mvTrafo"
  | "mvCable"
  | "mvRmu"
  | "lvSwgr"
  | "lvTrafo"
  | "lvCable"
  | "lvRmu";

const Activity: React.FC<IndexProps> = ({ params, option, index }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;
  
  const { project, fetchProject } = useProject();
  const loadedProjectId = useRef<string | null>(null);

  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("MOS Activity: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("MOS Activity: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
  }, [id, project, fetchProject]);

  const labels = HeadTitle(project)
    .map((item) => (item.value === option ? `${item.label}` : null))
    .filter(Boolean);

  return (
    <div className="flex flex-col">
      {labels.map((label, labelIndex) => (
        <h2
          key={labelIndex}>
          {`${index + labelIndex}. ${label}`}
        </h2>
      ))}
      <SubActivity params={unwrappedParams} option={option} index={index} />
    </div>
  );
};

export default Activity;
