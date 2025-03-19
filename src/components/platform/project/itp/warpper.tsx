'use client';
import React from "react";
import Activity from "@/components/platform/project/itp/activity";

type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

// Placeholder data for UI structure
const placeholderData: Record<string, OptionKey[]> = {
  ev: ['evSwgr', 'evTrafo', 'evCable', 'evRmu'],
  hv: ['hvSwgr', 'hvTrafo', 'hvCable', 'hvRmu'],
  mv: ['mvSwgr', 'mvTrafo', 'mvCable', 'mvRmu'],
  lv: ['lvSwgr', 'lvTrafo', 'lvCable', 'lvRmu']
};

const ActivityWrapper: React.FC = () => {
  return (
    <>
      {placeholderData.ev.map((option, index) => (
        <Activity key={option} option={option} index={index + 1} />
      ))}
      {placeholderData.hv.map((option, index) => (
        <Activity key={option} option={option} index={placeholderData.ev.length + index + 1} />
      ))}
      {placeholderData.mv.map((option, index) => (
        <Activity key={option} option={option} index={placeholderData.ev.length + placeholderData.hv.length + index + 1} />
      ))}
      {placeholderData.lv.map((option, index) => (
        <Activity key={option} option={option} index={placeholderData.ev.length + placeholderData.hv.length + placeholderData.mv.length + index + 1} />
      ))}
    </>
  );
};

export default ActivityWrapper;