'use client';
import React, { useEffect, useRef } from "react";

import { useProject } from "@/provider/project";
import {
  EvCable,
  EvRmu,
  EvSwgr,
  EvTrafo,
  HvCable,
  HvRmu,
  HvSwgr,
  HvTrafo,
  LvCable,
  LvRmu,
  LvSwgr,
  LvTrafo,
  MvCable,
  MvRmu,
  MvSwgr,
  MvTrafo,
} from "@/constant/project/item";
import Table from "@/components/platform/project/itp/table";
import { Abb } from "@/constant/abb";


type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

interface IndexProps {
  params: Params | Promise<Params>;
  option: OptionKey;
}

interface Params {
  id: string;
}

interface Option {
  value: string;
}


const SubActivity: React.FC<IndexProps> = ({ params, option }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;
  
  const { project, fetchProject } = useProject();
  const loadedProjectId = useRef<string | null>(null);

  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("ITP SubActivity: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("ITP SubActivity: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
    console.log("SubActivity: project data", project);
  }, [id, fetchProject, project]);

  if (!project) {
    return null;
  }

  const optionArrays = {
    evSwgr: EvSwgr,
    evTrafo: EvTrafo,
    evCable: EvCable,
    evRmu: EvRmu,
    hvSwgr: HvSwgr,
    hvTrafo: HvTrafo,
    hvCable: HvCable,
    hvRmu: HvRmu,
    mvSwgr: MvSwgr,
    mvTrafo: MvTrafo,
    mvCable: MvCable,
    mvRmu: MvRmu,
    lvSwgr: LvSwgr,
    lvTrafo: LvTrafo,
    lvCable: LvCable,
    lvRmu: LvRmu,
  };

  const voltageType = option.substring(0, 2) + 'Options';
  console.log('voltageType:', voltageType); // Added console.log
  console.log('project[voltageType]:', (project as any)[voltageType]); // Added console.log
  console.log('optionArrays[option]:', optionArrays[option]); // Added console.log

  const data = [
    [
      '2', '2.1', 'Name plate details checks <br /> as per approved drawing', 'Visual <br /> inspection', 'Factory <br /> test report', 'Each item', 'Factory test report/ Rated <br /> name plate data/ MOS/', 'Vendor <br /> manual', 'Test <br /> report', 'H', 'w', 'w', 'R', ''
    ],
    [
      '', '2.2', 'Physical inspection test <br /> as per approved drawing', 'Visual <br /> inspection', 'Factory <br /> test report', 'Each item', 'Factory test report/ Rated <br /> name plate data/ MOS/', 'Vendor <br /> manual', 'Test <br /> report', 'H', 'w', 'w', 'R', ''
    ],
    
    ...optionArrays[option].map((item, index) => {
      console.log('item:', item);
      if ((project as any)[voltageType][option]?.some((option: Option) => option.value === item.value)) {
        console.log('Match found:', item);  
        return [
            "",
            `2.${
              index + 3 < 10
                ? index + 3
                : (index + 3).toString().padStart(2, "0")
            }`,
            Abb[item.label],
            "Test",
            "Factory <br /> test report",
            "Each item",
            "Factory test report/ Rated <br /> name plate data/ MOS/",
            "Vendor <br /> manual",
            "Test <br /> report",
            "H",
            "w",
            "w",
            "R",
            "",
          ];
        }
        return null;
      }).filter((row): row is string[] => row !== null)
  ];

  return <Table data={data} />;
};

export default SubActivity;