'use client';
import Cell from "@/components/platform/project/itp/cell";
import React from "react";
import Header from "./header";
import Table from "./table";
import { Accept, Document } from "@/constant/project/itp/table";
import SubActivity from "./subactivity";

interface IndexProps {
  option: OptionKey;
  index: number;
}

type OptionKey = 'evSwgr' | 'evTrafo' | 'evCable' | 'evRmu' | 'hvSwgr' | 'hvTrafo' | 'hvCable' | 'hvRmu' | 'mvSwgr' | 'mvTrafo' | 'mvCable' | 'mvRmu' | 'lvSwgr' | 'lvTrafo' | 'lvCable' | 'lvRmu';

// Static mapping for labels
const optionLabels: Record<OptionKey, string> = {
  evSwgr: 'EV SWITCHGEAR',
  evTrafo: 'EV TRANSFORMER',
  evCable: 'EV CABLE',
  evRmu: 'EV RMU',
  hvSwgr: 'HV SWITCHGEAR',
  hvTrafo: 'HV TRANSFORMER',
  hvCable: 'HV CABLE',
  hvRmu: 'HV RMU',
  mvSwgr: 'MV SWITCHGEAR',
  mvTrafo: 'MV TRANSFORMER',
  mvCable: 'MV CABLE',
  mvRmu: 'MV RMU',
  lvSwgr: 'LV SWITCHGEAR',
  lvTrafo: 'LV TRANSFORMER',
  lvCable: 'LV CABLE',
  lvRmu: 'LV RMU'
};

const Activity: React.FC<IndexProps> = ({ option, index }) => {
  const label = optionLabels[option];

  return (
    <div className="flex justify-center w-full">
      <div style={{ transform: 'scale(0.85)', width: '1239px' }}>
        <Header />
        
        <Cell
          data={`${index}. ${label} PRECOMMISSIONING TEST`}
          head={true}
          bg={2}
          alian={true}
          end={true}
          width="1239"
        />
        
        <Cell data="DOCUMENT REVIEW" alian={true} end={true} width="1239"/>
        
        <Table data={Document}/>
        
        <Cell
          data="PRECOMMISSIONING TEST"
          alian={true}
          end={true}
          top={false}
          width="1239"
        />
        
        <SubActivity option={option} />
        <Cell
          data="FINAL ACCEPTANCE"
          alian={true}
          end={true}
          top={false}
          width="1239"
        />
        <Table data={Accept} />
      </div>
    </div>
  );
};

export default Activity;