import ProjectList from "@/components/platform/project/list";
import React from "react";

const Project = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      <ProjectList />
    </div>
  );
};

export default Project;
