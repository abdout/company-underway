'use client';
import React, { useEffect, useState, useRef } from "react";
import { useProject } from "@/provider/project";

import Activity from "@/component/project/mos/activity";

interface WrapperProps {
  params: Params | Promise<Params>;
}

interface Params {
  id: string;
}

type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

const ActivityWrapper: React.FC<WrapperProps> = ({ params }) => {
  // Properly unwrap params using React.use() for Next.js 15
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;
  const id = unwrappedParams.id;
  
  const { project, fetchProject } = useProject();
  const [ev, setEv] = useState<OptionKey[]>([]);
  const [hv, setHv] = useState<OptionKey[]>([]);
  const [mv, setMv] = useState<OptionKey[]>([]);
  const [lv, setLv] = useState<OptionKey[]>([]);
  const loadedProjectId = useRef<string | null>(null);

  useEffect(() => {
    // Prevent re-fetching if we already have the project data for this ID
    if (project && project._id === id && loadedProjectId.current === id) {
      console.log("ActivityWrapper: Project already loaded for this ID, skipping fetch");
      return;
    }
    
    console.log("ActivityWrapper: Fetching project with ID", id);
    fetchProject(id);
    loadedProjectId.current = id;
  }, [id, fetchProject, project]);

  useEffect(() => {
    if (project) {
      console.log("ActivityWrapper: Processing project data", project);
      
      const Ev = { ...project.evOptions };
      const Hv = { ...project.hvOptions };
      const Mv = { ...project.mvOptions };
      const Lv = { ...project.lvOptions };
  
      const selectedKey: OptionKey[] = ['evSwgr', 'evTrafo', 'evCable', 'evRmu', 'hvSwgr', 'hvTrafo', 'hvCable', 'hvRmu', 'mvSwgr', 'mvTrafo', 'mvCable', 'mvRmu', 'lvSwgr', 'lvTrafo', 'lvCable', 'lvRmu'];
      
      const newEv = selectedKey.filter(key => Ev[key] && Ev[key].length > 0);
      setEv(newEv);

      const newHv = selectedKey.filter(key => Hv[key] && Hv[key].length > 0);
      setHv(newHv);

      const newMv = selectedKey.filter(key => Mv[key] && Mv[key].length > 0);
      setMv(newMv);

      const newLv = selectedKey.filter(key => Lv[key] && Lv[key].length > 0);
      setLv(newLv);
    }
  }, [project]);

  if (!project) {
    return null; // or some loading state
  }

  return (
    <>
      {ev.map((option, index) => (
        <Activity key={option} params={unwrappedParams} option={option} index={index + 1} />
      ))}
      {hv.map((option, index) => (
        <Activity key={option} params={unwrappedParams} option={option} index={ev.length + index + 1} />
      ))}
      {mv.map((option, index) => (
        <Activity key={option} params={unwrappedParams} option={option} index={ev.length + hv.length + index + 1} />
      ))}
      {lv.map((option, index) => (
        <Activity key={option} params={unwrappedParams} option={option} index={ev.length + hv.length + mv.length + index + 1} />
      ))}
    </>
  );
};

export default ActivityWrapper;