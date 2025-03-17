"use client";
import { useTask } from "@/components/platform/task/context";
import { task } from "@/components/platform/task/type";
import React, { useEffect, useState } from "react";
// import Delete from "./crud/delete";
// import SmIcon from "@/component/atom/icon/sm";
import Modal from "@/components/atom/modal/modal";
// import Edit from "./crud/edit";
import Create from "./crud/create";
import { useModal } from "@/components/atom/modal/context";
import { Icon } from "@iconify/react";
// import { Task } from '@/type/task/task';  // Import the Task type
// import Circle from "./circle";
// import Image from "next/image";
// import { Delete } from "./crud/delete";
// import SmIcon from "../atom/icon/sm";
import { useProject } from "@/provider/project";
import { domain } from "@/constant/domain";


const TimeList: React.FC = () => {
  const { modal, openModal } = useModal();
  const { refreshTasks, tasks, deleteTask } = useTask();
  const { projects } = useProject();

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, taskID: string | null }>({ x: 0, y: 0, taskID: null });
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRightClick = (e: React.MouseEvent, taskID: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, taskID });
    setSelectedRow(taskID);
  };

  useEffect(() => {
    refreshTasks();
  }, [projects.length]);

  const handleCloseContextMenu = () => {
    setContextMenu({ x: 0, y: 0, taskID: null });
    setSelectedRow(null);
  };

  const handleDelete = async (taskID: string | null) => {
    if (taskID) {
      const confirmed = window.confirm("Are you sure?");
      if (confirmed) {
        await deleteTask(taskID);
        handleCloseContextMenu();
      }
    }
  };

 

  // const handleEdit = (id: string) => {
  //   openModal(id);
  // };

  // const taskToEdit = tasks.find((task: Task) => task._id === modal.id);

  return (
    <>
  {modal.open && modal.id === null && <Modal content={<Create />} />}
  {/* <div className="flex justify-end">
    <button
      className="p-2 m-2 border rounded hover:border-black opacity-70 hover:opacity-100"
      onClick={() => openModal(null)}
    >
      <Icon icon="ph:plus-thin" width={30}/>
    </button>
  </div> */}
  
  
  <table className="table-auto w-[60rem] m-8 ">
    <thead>
      <tr>
        <td className="text-lg font-medium border-b border-black py-2">Task</td>
        <td className="text-lg font-medium border-b border-black py-2">Project</td>
        <td className="text-lg font-medium border-b border-black py-2">Club</td>
        <td className="text-lg font-medium border-b border-black py-2">Status</td>
        <td className="text-lg font-medium border-b border-black py-2">Priority</td>
        <td className="text-lg font-medium border-b border-black py-2">Duration</td>
        <td className="text-lg font-medium border-b border-black py-2">Remark</td>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(tasks) ? tasks.map((task) => {
        return (
          <tr key={task._id || ''} className={`border-b ${task._id === selectedRow ? 'bg-black text-[#fcfcfc]' : ''} hover:bg-gray-100`} onContextMenu={(e) => handleRightClick(e, task._id || '')}>
            <td className="py-4">{task.task}</td>
            <td className="py-4">
              <div className="w-24 overflow-hidden overflow-ellipsis whitespacenowrap">
                {task.project}
              </div>
            </td>
            <td className="py-4">{task.club}</td>
            <td className="py-4">{task.status}</td>
            <td className="py-4">{task.prioity}</td>
            <td className="py-4">{task.duration}</td>
            <td className="py-4">{task.remark}</td>
          </tr>
        );
      }) : <tr><td colSpan={7} className="text-center py-4">No tasks available</td></tr>}
      {contextMenu.taskID && (
        <div 
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }} 
        className="absolute flex flex-col space-y-4 p-8 justify-start items-start bg-white border shadow-lg"
        onMouseLeave={handleCloseContextMenu}
          
        >
          <button
          onClick={() => handleDelete(contextMenu.taskID)}
          className="flex gap-4 opacity-80 hover:opacity-100"
          >
           <Icon icon="ant-design:delete-outlined" width={30}/>
           <h3>Delete</h3>
          </button>
          <button 
        //   onClick={() => handleEdit(contextMenu.taskID)}
          className="flex gap-4 opacity-80 hover:opacity-100"
          >
            <Icon icon="iconoir:edit" width={30}/>
            <h3>Edit</h3>
          </button>
        </div>
      )}
      
    </tbody>
  </table>
</>
  );
};

export default TimeList;