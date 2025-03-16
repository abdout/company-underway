'use client';
import Cell from "@/components/platform/project/itp/cell";
import { useProject } from "@/provider/project";
import React, { useEffect, useRef } from "react";
import Header from "./header";
import Table from "./table";
import { Accept, Document } from "@/constant/project/itp/table";
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

type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

const Activity: React.FC<IndexProps> = ({ params, option, index }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;
  const { project, fetchProject } = useProject();
  const loadedProjectId = useRef<string | null>(null);

  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("ITP Activity: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("ITP Activity: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
  }, [id, fetchProject, project]);

  const labels = HeadTitle(project).map((item) => 
    item.value === option ? `${item.label}` : null
  ).filter(Boolean);

  return (
    <div className="flex flex-col">
      <Header />
      
      {labels.map((label, labelIndex) => (
        <Cell
          key={labelIndex}
          data={`${index + labelIndex}. ${label} PRECOMMISSIONING TEST`}
          head={true}
          bg={2}
          alian={true}
          end={true}
          width="1239"
        />
      ))}
      
      <Cell data="DOCUMENT REVIEW" alian={true} end={true} width="1239"/>
      
      <Table data={Document}/>
      
      <Cell
        data="PRECOMMISSIONING TEST"
        alian={true}
        end={true}
        top={false}
        width="1239"
      />
      
      <SubActivity params={unwrappedParams} option={option} />
      <Cell
        data="FINAL ACCEPTANCE"
        alian={true}
        end={true}
        top={false}
        width="1239"
      />
      <Table data={Accept} />
    </div>
  );
};

export default Activity;