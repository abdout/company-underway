import { TeamMember, TeamLead, Kit, Car, Project } from './types';

export type SystemType = 'MV SWGR' | 'HV SWGR' | 'LV SWGR' | 'POWER TRAFO' | 'DIST. TRAFO' | 'COMPONENT' | 'RELAY' | 'RMU' | 'LOW CURRENT';

// Mock data - These would be fetched from your APIs in production
export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
  { id: '4', name: 'Sarah Williams' },
  { id: '5', name: 'Mike Brown' },
];

export const TEAM_LEADS: TeamLead[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Sarah Williams' },
];

export const KITS: Kit[] = [
  { id: '1', name: 'Testing Kit A' },
  { id: '2', name: 'Measurement Kit B' },
  { id: '3', name: 'Relay Test Kit' },
  { id: '4', name: 'Protection Kit C' },
  { id: '5', name: 'Circuit Breaker Kit' },
];

export const CARS: Car[] = [
  { id: '1', name: 'Toyota SUV' },
  { id: '2', name: 'Ford Pickup' },
  { id: '3', name: 'Chevrolet Van' },
  { id: '4', name: 'Nissan Truck' },
  { id: '5', name: 'Jeep 4x4' },
];

export const systemActivities: Record<SystemType, Array<{
  item: string;
  subitems: Array<{
    name: string;
    activities: string[];
  }>;
}>> = {
  'MV SWGR': [
    {
      item: "Relay",
      subitems: [
        {
          name: "General",
          activities: [
            "Sec. Injection",
            "Pri. Injection",
            "Settings Verif.",
            "Communication",
            "Contact Resist.",
          ],
        },
        {
          name: "Overcurrent",
          activities: [
            "Pickup",
            "Timing",
            "Char. Curve",
            "Ins. Resist.",
            "Burden",
          ],
        },
        {
          name: "Differential",
          activities: [
            "Rat/Ph Angle",
            "Slope Char.",
            "Harm. Restr.",
            "Ins. Resist.",
            "Functional",
          ],
        },
        {
          name: "Distance",
          activities: ["Impedance", "Zone Timing", "Directional", "Polarization"],
        },
        {
          name: "Earth Fault",
          activities: ["Pickup", "Timing", "Ins. Resist."],
        },
        {
          name: "Directional OC",
          activities: ["Discrimination", "Pickup", "Timing"],
        },
        {
          name: "Underfreq.",
          activities: ["Pickup", "Timing", "Change Rate"],
        },
        {
          name: "Undervolt.",
          activities: ["Pickup", "Timing"],
        },
        {
          name: "Motor Prot.",
          activities: [
            "Starting Time",
            "Stall Prot.",
            "Thermal OL",
            "Unbal./Ph Loss",
          ],
        },
        {
          name: "Trafo Diff.",
          activities: ["CT Polarity", "Inrush Restraint", "Bias Charact."],
        },
        {
          name: "Gen. Prot.",
          activities: [
            "Exc. Loss",
            "Reverse Power",
            "Stator EF",
          ],
        },
        {
          name: "Recloser",
          activities: [
            "Reclose Interval",
            "No. of Reclose",
            "Lockout",
          ],
        },
        {
          name: "Synchronizing",
          activities: ["Volt. Matching", "Phase Angle", "Freq. Matching"],
        },
        {
          name: "Check",
          activities: ["Voltage Presence", "Synch. Check"],
        },
      ],
    },
    {
      item: "Circuit Breaker",
      subitems: [
        {
          name: "Circuit Breaker",
          activities: [
            "Contact Resist.",
            "Timing Open-Close",
            "Ins. Resist.",
            "Coil Pickup",
            "SF6 Gas Press.-Purity",
            "Vacuum Integrity",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Lockout Relay",
      subitems: [
        {
          name: "Lockout Relay",
          activities: [
            "Func. Trip-Reset",
            "Contact Resist.",
            "Coil Pickup",
          ],
        },
      ],
    },
    {
      item: "Contactor",
      subitems: [
        {
          name: "Contactor",
          activities: [
            "Pickup-Dropout",
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Endurance",
          ],
        },
      ],
    },
    {
      item: "MCB",
      subitems: [
        {
          name: "MCB",
          activities: [
            "Trip Time SC-OL",
            "Ins. Resist.",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Disconnect Switch",
      subitems: [
        {
          name: "Disconnect Switch",
          activities: [
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Interlock",
          ],
        },
      ],
    },
    {
      item: "Current Transformer",
      subitems: [
        {
          name: "Current Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Voltage Transformer",
      subitems: [
        {
          name: "Voltage Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Metering Devices",
      subitems: [
        {
          name: "Metering Devices",
          activities: [
            "Acc. Calibration",
            "Func. Verif.",
          ],
        },
        
        {
          name: "Surge Arrester",
          activities: [
            "Ins. Resist.",
            "Leak. Current",
          ],
        },
      ],
    },
  ],
  'HV SWGR': [
    {
      item: "Relay",
      subitems: [
        {
          name: "General",
          activities: [
            "Sec. Injection",
            "Pri. Injection",
            "Settings Verif.",
            "Communication",
            "Contact Resist.",
          ],
        },
        {
          name: "Overcurrent",
          activities: [
            "Pickup",
            "Timing",
            "Char. Curve",
            "Ins. Resist.",
            "Burden",
          ],
        },
        {
          name: "Differential",
          activities: [
            "Rat/Ph Angle",
            "Slope Char.",
            "Harm. Restr.",
            "Ins. Resist.",
            "Functional",
          ],
        },
        {
          name: "Distance",
          activities: ["Impedance", "Zone Timing", "Directional", "Polarization"],
        },
        {
          name: "Earth Fault",
          activities: ["Pickup", "Timing", "Ins. Resist."],
        },
        {
          name: "Directional OC",
          activities: ["Discrimination", "Pickup", "Timing"],
        },
        {
          name: "Underfreq.",
          activities: ["Pickup", "Timing", "Change Rate"],
        },
        {
          name: "Undervolt.",
          activities: ["Pickup", "Timing"],
        },
        {
          name: "Motor Prot.",
          activities: [
            "Starting Time",
            "Stall Prot.",
            "Thermal OL",
            "Unbal./Ph Loss",
          ],
        },
        {
          name: "Trafo Diff.",
          activities: ["CT Polarity", "Inrush Restraint", "Bias Charact."],
        },
        {
          name: "Gen. Prot.",
          activities: [
            "Exc. Loss",
            "Reverse Power",
            "Stator EF",
          ],
        },
        {
          name: "Recloser",
          activities: [
            "Reclose Interval",
            "No. of Reclose",
            "Lockout",
          ],
        },
        {
          name: "Synchronizing",
          activities: ["Volt. Matching", "Phase Angle", "Freq. Matching"],
        },
        {
          name: "Check",
          activities: ["Voltage Presence", "Synch. Check"],
        },
      ],
    },
    {
      item: "Circuit Breaker",
      subitems: [
        {
          name: "Circuit Breaker",
          activities: [
            "Contact Resist.",
            "Timing Open-Close",
            "Ins. Resist.",
            "Coil Pickup",
            "SF6 Gas Press.-Purity",
            "Vacuum Integrity",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Lockout Relay",
      subitems: [
        {
          name: "Lockout Relay",
          activities: [
            "Func. Trip-Reset",
            "Contact Resist.",
            "Coil Pickup",
          ],
        },
      ],
    },
    {
      item: "Contactor",
      subitems: [
        {
          name: "Contactor",
          activities: [
            "Pickup-Dropout",
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Endurance",
          ],
        },
      ],
    },
    {
      item: "MCB",
      subitems: [
        {
          name: "MCB",
          activities: [
            "Trip Time SC-OL",
            "Ins. Resist.",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Disconnect Switch",
      subitems: [
        {
          name: "Disconnect Switch",
          activities: [
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Interlock",
          ],
        },
      ],
    },
    {
      item: "Current Transformer",
      subitems: [
        {
          name: "Current Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Voltage Transformer",
      subitems: [
        {
          name: "Voltage Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Metering Devices",
      subitems: [
        {
          name: "Metering Devices",
          activities: [
            "Acc. Calibration",
            "Func. Verif.",
          ],
        },
        
        {
          name: "Surge Arrester",
          activities: [
            "Ins. Resist.",
            "Leak. Current",
          ],
        },
      ],
    },
  ],
  'LV SWGR': [
    {
      item: "Distribution Board",
      subitems: [
        {
          name: "Distribution Board",
          activities: [
            "Ins. Resist.",
            "Busbar Tightness",
            "Volt. Stability",
            "Phase Seq. Verif.",
            "Func. Breaker-RCD Coord.",
          ],
        },
      ],
    },
    {
      item: "MCCB",
      subitems: [
        {
          name: "MCCB",
          activities: [
            "Trip Time SC-OL",
            "Ins. Resist.",
            "Contact Resist.",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "ACB",
      subitems: [
        {
          name: "ACB",
          activities: [
            "Contact Resist.",
            "Timing Open-Close",
            "Ins. Resist.",
            "Trip Unit Cal.",
          ],
        },
      ],
    },
    {
      item: "Capacitor Bank",
      subitems: [
        {
          name: "Capacitor Bank",
          activities: [
            "Cap. Measurement",
            "Harm. Dist. Analysis",
            "Switch. Transient",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "UPS",
      subitems: [
        {
          name: "UPS",
          activities: [
            "Battery Capacity",
            "Trans. Time Grid-Batt.",
            "Out. Volt. Stability",
            "Harm. Analysis",
          ],
        },
      ],
    },
    {
      item: "Earth Fault",
      subitems: [
        {
          name: "Earth Fault",
          activities: [
            "Earth Fault Pickup",
            "Trip Timing",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "Distribution Board",
      subitems: [
        {
          name: "Distribution Board",
          activities: [
            "Circuit ID",
            "Load Bal. Verif.",
            "Func. MCB-RCD Op.",
          ],
        },
      ],
    },
    {
      item: "Motor Control Center",
      subitems: [
        {
          name: "Motor Control Center",
          activities: [
            "Starter Cont. Op.",
            "OL Relay Cal.",
            "Phase Loss Det.",
          ],
        },
      ],
    },
    {
      item: "Surge Device",
      subitems: [
        {
          name: "Surge Device",
          activities: [
            "Leak. Current",
            "Ins. Resist.",
            "Func. Surge Suppr.",
          ],
        },
      ],
    },
    {
      item: "Metering",
      subitems: [
        {
          name: "Metering",
          activities: [
            "Acc. Cal.",
            "Func. V-I-PF Meas.",
          ],
        },
        {
          name: "Earthing System",
          activities: [
            "Ground Resist.",
            "Cont. Equip. Bonding",
          ],
        },
      ],
    }
  ],

  'POWER TRAFO': [
    {
      item: "Power Transformer",
      subitems: [
        {
          name: "Power Transformer",
          activities: [
            "Ins. Resist.",
            "Wind. Resist.",
            "Turns Ratio",
            "Mag. Current",
            "Dielec. Absorp.",
            "Diss. Gas Analysis",
            "Sweep Freq. Resp.",
          ],
        },
      ],
    },
    {
      item: "Bushing",
      subitems: [
        {
          name: "Bushing",
          activities: [
            "Tan Delta",
            "Cap. Measurement",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "Tap Changer (OLTC/De-Energized)",
      subitems: [
        {
          name: "Tap Changer (OLTC/De-Energized)",
          activities: [
            "Contact Resist.",
            "Timing Op.",
            "Func. Sequence",
            "Oil Quality",
          ],
        },
      ],
    },
    {
      item: "Cooling System",
      subitems: [
        {
          name: "Cooling System",
          activities: [
            "Pump-Fan Op.",
            "Oil Flow Verif.",
            "Temp. Control",
          ],
        },
      ],
    },
    {
      item: "Protection Devices",
      subitems: [
        {
          name: "Protection Devices",
          activities: [
            "Buchholz Alarm",
            "Press. Relief ",
            "Wind. Temp. Alarm",
          ],
        },
      ],
    },
    {
      item: "Neutral Grounding",
      subitems: [
        {
          name: "Neutral Grounding",
          activities: [
            "Ground Resist.",
            "Continuity",
          ],
        },
      ],
    },
    {
      item: "Surge Arrester",
      subitems: [
        {
          name: "Surge Arrester",
          activities: [
            "Leak. Current",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "Control Panel",
      subitems: [
        {
          name: "Control Panel",
          activities: [
            "Alarm Indic.",
            "Trip Circuit",
            "Volt. Regulation",
          ],
        },
      ],
    },
    {
      item: "Oil Management",
      subitems: [
        {
          name: "Oil Management",
          activities: [
            "Moist. Content",
            "Dielec. Strength",
            "Acidity",
          ],
        },
      ],
    },
    {
      item: "General",
      subitems: [
        {
          name: "General",
          activities: [
            "Visual Insp.",
            "Tight. Check",
            "Polarity Verif.",
          ],
        },
      ],
    }
  ],

  'DIST. TRAFO': [
    {
      item: "Power Transformer",
      subitems: [
        {
          name: "Power Transformer",
          activities: [
            "Ins. Resist.",
            "Wind. Resist.",
            "Turns Ratio",
            "Mag. Current",
            "Dielec. Absorp.",
            "Diss. Gas Analysis",
            "Sweep Freq. Resp.",
          ],
        },
      ],
    },
    {
      item: "Bushing",
      subitems: [
        {
          name: "Bushing",
          activities: [
            "Tan Delta",
            "Cap. Measurement",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "Tap Changer (OLTC/De-Energized)",
      subitems: [
        {
          name: "Tap Changer (OLTC/De-Energized)",
          activities: [
            "Contact Resist.",
            "Timing Op.",
            "Func. Sequence",
            "Oil Quality",
          ],
        },
      ],
    },
    {
      item: "Cooling System",
      subitems: [
        {
          name: "Cooling System",
          activities: [
            "Pump-Fan Op.",
            "Oil Flow Verif.",
            "Temp. Control",
          ],
        },
      ],
    },
    {
      item: "Protection Devices",
      subitems: [
        {
          name: "Protection Devices",
          activities: [
            "Buchholz Alarm",
            "Press. Relief ",
            "Wind. Temp. Alarm",
          ],
        },
      ],
    },
    {
      item: "Neutral Grounding",
      subitems: [
        {
          name: "Neutral Grounding",
          activities: [
            "Ground Resist.",
            "Continuity",
          ],
        },
      ],
    },
    {
      item: "Surge Arrester",
      subitems: [
        {
          name: "Surge Arrester",
          activities: [
            "Leak. Current",
            "Ins. Resist.",
          ],
        },
      ],
    },
    {
      item: "Control Panel",
      subitems: [
        {
          name: "Control Panel",
          activities: [
            "Alarm Indic.",
            "Trip Circuit",
            "Volt. Regulation",
          ],
        },
      ],
    },
    {
      item: "Oil Management",
      subitems: [
        {
          name: "Oil Management",
          activities: [
            "Moist. Content",
            "Dielec. Strength",
            "Acidity",
          ],
        },
      ],
    },
    {
      item: "General",
      subitems: [
        {
          name: "General",
          activities: [
            "Visual Insp.",
            "Tight. Check",
            "Polarity Verif.",
          ],
        },
      ],
    }
  ],

  'COMPONENT': [
        {
      item: "Circuit Breaker",
      subitems: [
        {
          name: "Circuit Breaker",
          activities: [
            "Contact Resist.",
            "Timing Open-Close",
            "Ins. Resist.",
            "Coil Pickup",
            "SF6 Gas Press.-Purity",
            "Vacuum Integrity",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Lockout Relay",
      subitems: [
        {
          name: "Lockout Relay",
          activities: [
            "Func. Trip-Reset",
            "Contact Resist.",
            "Coil Pickup",
          ],
        },
      ],
    },
    {
      item: "Contactor",
      subitems: [
        {
          name: "Contactor",
          activities: [
            "Pickup-Dropout",
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Endurance",
          ],
        },
      ],
    },
    {
      item: "MCB",
      subitems: [
        {
          name: "MCB",
          activities: [
            "Trip Time SC-OL",
            "Ins. Resist.",
            "Mech. Operation",
          ],
        },
      ],
    },
    {
      item: "Disconnect Switch",
      subitems: [
        {
          name: "Disconnect Switch",
          activities: [
            "Contact Resist.",
            "Ins. Resist.",
            "Mech. Interlock",
          ],
        },
      ],
    },
    {
      item: "Current Transformer",
      subitems: [
        {
          name: "Current Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Voltage Transformer",
      subitems: [
        {
          name: "Voltage Transformer",
          activities: [
            "Ratio",
            "Polarity Verif.",
            "Burden",
            "Ins. Resist.",
            "Sat. Curve",
          ],
        },
      ],
    },
    {
      item: "Metering Devices",
      subitems: [
        {
          name: "Metering Devices",
          activities: [
            "Acc. Calibration",
            "Func. Verif.",
          ],
        },
        
        {
          name: "Surge Arrester",
          activities: [
            "Ins. Resist.",
            "Leak. Current",
          ],
        },
      ],
    },
  ],
  'RELAY': [
    {
      item: "Protection Relays",
      subitems: [
        {
          name: "Overcurrent",
          activities: [
            "Pickup",
            "Timing",
            "Characteristic Curve",
            "Insulation Resistance"
          ]
        },
        {
          name: "Differential",
          activities: [
            "Ratio/Phase Angle",
            "Slope Characteristic",
            "Harmonic Restraint",
            "Insulation Resistance"
          ]
        },
        {
          name: "Distance",
          activities: [
            "Impedance",
            "Zone Timing",
            "Directional",
            "Polarization"
          ]
        }
      ]
    }
  ],
  'RMU': [
    {
      item: "Ring Main Unit",
      subitems: [
        {
          name: "Main Unit",
          activities: [
            "Insulation Resistance",
            "Timing Open-Close",
            "Contact Resistance",
            "Gas Pressure",
            "Functional Interlock"
          ]
        },
        {
          name: "Protection",
          activities: [
            "Pickup",
            "Timing",
            "Insulation Resistance"
          ]
        }
      ]
    }
  ],
  'LOW CURRENT': [
    {
      item: "Low Current Systems",
      subitems: [
        {
          name: "SCADA",
          activities: [
            "Point-to-Point Communication",
            "Time Synchronization",
            "Failover Redundancy",
            "Alarm-Trip Integration"
          ]
        },
        {
          name: "Fault Recorder",
          activities: [
            "Time Synchronization",
            "Event Sequence",
            "Data Retrieval",
            "Storage Capacity"
          ]
        },
        {
          name: "Battery Bank",
          activities: [
            "Capacity Discharge",
            "Voltage Stability",
            "Float-Charge Efficiency",
            "Ground Fault Detection"
          ]
        }
      ]
    }
  ]
};
