"use client";
import { FC, FormEvent, useState, useEffect } from "react";
import { useProject } from "@/provider/project";
import { lv, mv, hv, ev, LvSwgr, HvSwgr, EvSwgr, LvTrafo, HvTrafo, EvTrafo, LvCable, HvCable, EvCable, LvRmu, HvRmu, EvRmu } from "@/constant/project/item";
import { useCreate } from "@/provider/create";
import { usePostProject } from "@/provider/post";
import General from "../step/general";
import ItemStep from "../step/item";
import MvStep from "../step/mv";
import LvStep from "../step/lv";
import HvStep from "../step/hv";
import EvStep from "../step/ev";
import { useStep } from "@/lib/step";
import Submit from "../../../../atom/button/submit";
import Indicator from "../step/indicator";
import PrevNextButtons from "../step/next";
import { DialogFooter } from "@/components/ui/dialog";
import { Project } from '@/components/platform/project/project';

interface CreateProps {
  projectToEdit?: Project | null;
  onSuccess?: () => void;
}

const Create: FC<CreateProps> = ({ projectToEdit, onSuccess }) => {
  console.log("Create: Component rendering", { isEditing: !!projectToEdit });
  
  const { fetchProjects } = useProject();
  const { postProject, postProjectState } = usePostProject();
  console.log("Create: Post project state", postProjectState);
  
  const { customer, setCustomer, location, setLocation, consultant, setConsultant, client, setClient, voltages, setVoltages, lvOptions, setLvOptions, mvOptions, setMvOptions, hvOptions, setHvOptions, evOptions, setEvOptions, lvSwgr, setLvSwgr, lvTrafo, setLvTrafo, lvRmu, setLvRmu, lvCable, setLvCable, mvSwgr, setMvSwgr, mvTrafo, setMvTrafo, mvRmu, setMvRmu, mvCable, setMvCable, hvSwgr, setHvSwgr, hvTrafo, setHvTrafo, hvRmu, setHvRmu, hvCable, setHvCable, evSwgr, setEvSwgr, evTrafo, setEvTrafo, evRmu, setEvRmu, evCable, setEvCable } = useCreate();
  
  const [currentStep, setCurrentStep] = useState(1);
  console.log("Create: Current step", currentStep);
  
  const { step, nextStep, prevStep } = useStep(voltages, currentStep, setCurrentStep);
  console.log("Create: Available steps", step);

  // Load project data if editing
  useEffect(() => {
    if (projectToEdit) {
      console.log("Create: Loading project data for editing", projectToEdit);
      // Populate form fields based on the project being edited
      if (projectToEdit.customer) {
        console.log("Create: Setting customer", projectToEdit.customer);
        setCustomer(projectToEdit.customer);
      }
      if (projectToEdit.location) {
        console.log("Create: Setting location", projectToEdit.location);
        setLocation(projectToEdit.location);
      }
      if (projectToEdit.consultant) {
        console.log("Create: Setting consultant", projectToEdit.consultant);
        setConsultant(projectToEdit.consultant);
      }
      if (projectToEdit.client) {
        console.log("Create: Setting client", projectToEdit.client);
        setClient(projectToEdit.client);
      }
      if (projectToEdit.voltages) {
        console.log("Create: Setting voltages", projectToEdit.voltages);
        setVoltages(projectToEdit.voltages);
      }
      // Add more fields as needed
    }
  }, [projectToEdit, setCustomer, setLocation, setConsultant, setClient, setVoltages]);

  useEffect(() => {
    console.log("Create: Form values changed", { 
      customer, 
      location, 
      consultant, 
      client, 
      voltages,
      currentStep
    });
  }, [customer, location, consultant, client, voltages, currentStep]);

  useEffect(() => {
    if (postProjectState.status === 'loading') {
      console.log("Create: Submitting project...");
    } else if (postProjectState.status === 'succeeded') {
      console.log("Create: Project creation succeeded!");
      fetchProjects();
      if (onSuccess) {
        console.log("Create: Calling onSuccess callback");
        onSuccess();
      }
    } else if (postProjectState.status === 'failed') {
      console.error("Create: Project creation failed", postProjectState.error);
    }
  }, [postProjectState.status, fetchProjects, onSuccess, postProjectState.error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Create: Form submitted");

    const projectData = {
      customer,
      location,
      consultant,
      client,
      voltages,
      lvOptions: { lvSwgr, lvTrafo, lvCable, lvRmu },
      mvOptions: { mvSwgr, mvTrafo, mvCable, mvRmu },
      hvOptions: { hvSwgr, hvTrafo, hvCable, hvRmu },
      evOptions: { evSwgr, evTrafo, evCable, evRmu }
    };
    
    console.log("Create: Project data to submit", projectData);

    if (projectToEdit && projectToEdit._id) {
      console.log("Create: This is an edit operation for project", projectToEdit._id);
      // Add update logic if needed
      // await updateProject(projectToEdit._id, projectData);
    } else {
      console.log("Create: This is a create operation");
      await postProject(projectData);
    }
  };

  const totalSteps = 2 + step.length; // 2 initial steps + selected voltage steps
  console.log("Create: Total steps", totalSteps);

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 h-full">
        <div className="flex-1">
          <div className="w-full">
            {currentStep === 1 && (
              <General
                customer={customer}
                setCustomer={(val) => {
                  console.log("Create: Setting customer to", val);
                  setCustomer(val);
                }}
                location={location}
                setLocation={(val) => {
                  console.log("Create: Setting location to", val);
                  setLocation(val);
                }}
                consultant={consultant}
                setConsultant={(val) => {
                  console.log("Create: Setting consultant to", val);
                  setConsultant(val);
                }}
                client={client}
                setClient={(val) => {
                  console.log("Create: Setting client to", val);
                  setClient(val);
                }}
              />
            )}

            {currentStep === 2 && (
              <ItemStep
                voltages={voltages}
                setVoltages={(val) => {
                  console.log("Create: Setting voltages to", val);
                  setVoltages(val);
                }}
                lv={lv}
                setLvOptions={setLvOptions}
                mv={mv}
                setMvOptions={setMvOptions}
                hv={hv}
                setHvOptions={setHvOptions}
                ev={ev}
                setEvOptions={setEvOptions}
              />
            )}

            {step[currentStep - 3] === "LV" && (
              <LvStep
                lvOptions={lvOptions}
                LvSwgr={LvSwgr}
                setLvSwgr={setLvSwgr}
                LvTrafo={LvTrafo}
                setLvTrafo={setLvTrafo}
                LvCable={LvCable}
                setLvCable={setLvCable}
                LvRmu={LvRmu}
                setLvRmu={setLvRmu}
              />
            )}

            {step[currentStep - 3] === "MV" && (
              <MvStep
                mvOptions={mvOptions}
                setMvSwgr={setMvSwgr}
                setMvTrafo={setMvTrafo}
                setMvCable={setMvCable}
                setMvRmu={setMvRmu}
              />
            )}

            {step[currentStep - 3] === "HV" && (
              <HvStep
                hvOptions={hvOptions}
                HvSwgr={HvSwgr}
                setHvSwgr={setHvSwgr}
                HvTrafo={HvTrafo}
                setHvTrafo={setHvTrafo}
                HvCable={HvCable}
                setHvCable={setHvCable}
                HvRmu={HvRmu}
                setHvRmu={setHvRmu}
              />
            )}

            {step[currentStep - 3] === "EV" && (
              <EvStep
                evOptions={evOptions}
                EvSwgr={EvSwgr}
                setEvSwgr={setEvSwgr}
                EvTrafo={EvTrafo}
                setEvTrafo={setEvTrafo}
                EvCable={EvCable}
                setEvCable={setEvCable}
                EvRmu={EvRmu}
                setEvRmu={setEvRmu}
              />
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="w-full flex justify-center pb-6">
            <Indicator totalSteps={totalSteps} currentStep={currentStep} />
          </div>
          
          <DialogFooter className="flex items-center justify-between gap-4 border-t pt-4">
            <PrevNextButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              prevStep={() => {
                console.log("Create: Moving to previous step from", currentStep);
                prevStep();
              }}
              nextStep={() => {
                console.log("Create: Moving to next step from", currentStep);
                nextStep();
              }}
            />
            
            {currentStep === totalSteps && (
              <Submit label={projectToEdit ? "Update Project" : "Create Project"} />
            )}
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};

export default Create;
