"use client"

import { useState, useEffect } from "react"
import { TimesheetForm } from "@/components/feature/timesheet/timesheet-form"
import { Toaster } from "@/components/ui/sonner"

export default function TimesheetPage() {
  // In a real app, you would fetch the engineer's info from the auth context or API
  const [engineerInfo, setEngineerInfo] = useState({
    name: "John Doe",
    id: "ENG12345"
  })

  // In a production app, this would fetch engineer data from an API
  // useEffect(() => {
  //   const fetchEngineerData = async () => {
  //     try {
  //       // const response = await fetch('/api/engineer/current');
  //       // const data = await response.json();
  //       // setEngineerInfo({
  //       //   name: data.name,
  //       //   id: data.id
  //       // });
  //     } catch (error) {
  //       console.error('Error fetching engineer data:', error);
  //     }
  //   };
  //   
  //   fetchEngineerData();
  // }, []);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Monthly Timesheet</h1>
        <p className="text-muted-foreground">
          Record your working hours and activities for each month.
        </p>
      </div>
      
      <TimesheetForm 
        engineerName={engineerInfo.name}
        engineerId={engineerInfo.id}
      />
      
      <Toaster />
    </div>
  )
} 