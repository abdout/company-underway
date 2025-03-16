export const sidebarData = [
  {
    item: "Relay",
    subitems: [
      {
        name: "General",
        activities: [
          "Secondary Injection",
          "Primary Injection",
          "Settings Verification",
          "Communication",
          "Contact Resistance",
        ],
      },
      {
        name: "Overcurrent",
        activities: [
          "Pickup",
          "Timing",
          "Characteristic Curve Verification",
          "Insulation Resistance",
          "Burden",
        ],
      },
      {
        name: "Differential",
        activities: [
          "Ratio and Phase Angle",
          "Slope Characteristic",
          "Harmonic Restraint",
          "Insulation",
          "Functional",
        ],
      },
      {
        name: "Distance",
        activities: ["Impedance", "Zone Timing", "Directional", "Polarization"],
      },
      {
        name: "Earth Fault",
        activities: ["Earth Fault Pickup", "Timing", "Insulation Resistance"],
      },
      {
        name: "Directional OC",
        activities: ["Directional Discrimination", "Pickup", "Timing"],
      },
      {
        name: "Underfreq.",
        activities: ["Pickup", "Timing", "Rate-of-Change"],
      },
      {
        name: "Undervolt.",
        activities: ["Pickup", "Timing"],
      },
      {
        name: "Motor Prot.",
        activities: [
          "Starting Time",
          "Stall Protection",
          "Thermal Overload",
          "Unbalance/Phase Loss",
        ],
      },
      {
        name: "Trafo Diff.",
        activities: ["CT Polarity", "Inrush Restraint", "Bias Characteristic"],
      },
      {
        name: "Gen. Prot.",
        activities: [
          "Loss of Excitation",
          "Reverse Power",
          "Stator Earth Fault",
        ],
      },
      {
        name: "Recloser",
        activities: [
          "Reclose Interval",
          "Number of Reclose Attempts",
          "Lockout",
        ],
      },
      {
        name: "Synchronizing",
        activities: ["Voltage Matching", "Phase Angle", "Frequency Matching"],
      },
      {
        name: "Check",
        activities: ["Voltage Presence", "Synchronism Check"],
      },
    ],
  },
  {
    item: "Component",
    subitems: [
      {
        name: "Circuit Breaker",
        activities: [
          "Contact Resistance",
          "Timing Open-Close",
          "Insulation Resistance",
          "Minimum Trip Coil Pickup",
          "SF6 Gas Pressure-Purity for SF6 CBs",
          "Vacuum Integrity for Vacuum CBs",
          "Mechanical Operation",
        ],
      },
      {
        name: "Lockout Relay",
        activities: [
          "Functional Trip-Reset",
          "Contact Resistance",
          "Coil Voltage Pickup",
        ],
      },
      {
        name: "Contactor",
        activities: [
          "Coil Operation Pickup-Dropout",
          "Contact Resistance",
          "Insulation Resistance",
          "Mechanical Endurance",
        ],
      },
      {
        name: "MCB",
        activities: [
          "Trip Timing Short Circuit-Overload",
          "Insulation Resistance",
          "Mechanical Operation",
        ],
      },
      {
        name: "Disconnect Switch",
        activities: [
          "Contact Resistance",
          "Insulation Resistance",
          "Mechanical Interlock Verification",
        ],
      },
      {
        name: "Current Transformer",
        activities: [
          "Ratio",
          "Polarity Verification",
          "Burden",
          "Insulation Resistance",
          "Saturation Curve",
        ],
      },
      {
        name: "Voltage Transformer",
        activities: [
          "Ratio",
          "Polarity Verification",
          "Burden",
          "Insulation Resistance",
          "Saturation Curve",
        ],
      },
      {
        name: "Metering Devices",
        activities: [
          "Accuracy Calibration",
          "Functional Verification",
        ],
      },
      {
        name: "Surge Arrester",
        activities: [
          "Insulation Resistance",
          "Leakage Current",
        ],
      },
    ],
  },
  {
    item: "Transformer",
    subitems: [
      {
        name: "Power Transformer",
        activities: [
          "Insulation Resistance",
          "Winding Resistance",
          "Turns Ratio",
          "Magnetizing Current",
          "Dielectric Absorption",
          "Dissolved Gas Analysis",
          "Sweep Frequency Response",
        ],
      },
      {
        name: "Bushing",
        activities: [
          "Tan Delta",
          "Capacitance Measurement",
          "Insulation Resistance",
        ],
      },
      {
        name: "Tap Changer (OLTC/De-Energized)",
        activities: [
          "Contact Resistance",
          "Timing Operation",
          "Functional Sequence",
          "Oil Quality",
        ],
      },
      {
        name: "Cooling System",
        activities: [
          "Pump-Fan Operation",
          "Oil Flow Verification",
          "Temperature Control",
        ],
      },
      {
        name: "Protection Devices",
        activities: [
          "Buchholz Alarm-Trip",
          "Pressure Relief Operation",
          "Winding Temperature Alarm",
        ],
      },
      {
        name: "Neutral Grounding",
        activities: [
          "Ground Resistance",
          "Continuity",
        ],
      },
      {
        name: "Surge Arrester",
        activities: [
          "Leakage Current",
          "Insulation Resistance",
        ],
      },
      {
        name: "Control Panel",
        activities: [
          "Alarm Indication",
          "Trip Circuit",
          "Voltage Regulation",
        ],
      },
      {
        name: "Oil Management",
        activities: [
          "Moisture Content",
          "Dielectric Strength",
          "Acidity",
        ],
      },
      {
        name: "General",
        activities: [
          "Visual Inspection",
          "Tightness Check",
          "Polarity Verification",
        ],
      },
    ],
  },
  {
    item: "Low Voltage",
    subitems: [
      {
        name: "Distribution Panel",
        activities: [
          "Insulation Resistance",
          "Busbar Tightness",
          "Voltage Stability",
          "Phase Sequence Verification",
          "Functional Breaker-RCD Coordination",
        ],
      },
      {
        name: "MCCB",
        activities: [
          "Trip Timing Short Circuit-Overload",
          "Insulation Resistance",
          "Contact Resistance",
          "Mechanical Operation",
        ],
      },
      {
        name: "ACB",
        activities: [
          "Contact Resistance",
          "Timing Open-Close",
          "Insulation Resistance",
          "Trip Unit Calibration",
        ],
      },
      {
        name: "Capacitor Bank",
        activities: [
          "Capacitance Measurement",
          "Harmonic Distortion Analysis",
          "Switching Transient",
          "Insulation Resistance",
        ],
      },
      {
        name: "UPS",
        activities: [
          "Battery Capacity",
          "Transfer Time Grid-Battery",
          "Output Voltage Stability",
          "Harmonic Analysis",
        ],
      },
      {
        name: "Earth Fault",
        activities: [
          "Earth Fault Pickup",
          "Trip Timing",
          "Insulation Resistance",
        ],
      },
      {
        name: "Distribution Board",
        activities: [
          "Circuit Identification",
          "Load Balancing Verification",
          "Functional MCB-RCD Operation",
        ],
      },
      {
        name: "Motor Control Center",
        activities: [
          "Starter Contactor Operation",
          "Overload Relay Calibration",
          "Phase Loss Detection",
        ],
      },
      {
        name: "Surge Device",
        activities: [
          "Leakage Current",
          "Insulation Resistance",
          "Functional Surge Suppression",
        ],
      },
      {
        name: "Metering",
        activities: [
          "Accuracy Calibration",
          "Functional Voltage-Current-PF Measurement",
        ],
      },
      {
        name: "Earthing System",
        activities: [
          "Ground Resistance",
          "Continuity Equipotential Bonding",
        ],
      },
    ],
  },
  {
    item: "Other",
    subitems: [
      {
        name: "SCADA",
        activities: [
          "Point-to-Point Communication",
          "Time Synchronization",
          "Failover Redundancy",
          "Alarm-Trip Integration",
        ],
      },
      {
        name: "RMU (Ring Main Unit)",
        activities: [
          "Insulation Resistance",
          "Timing Open-Close",
          "Contact Resistance",
          "Gas Pressure (for SF6 RMUs)",
          "Functional Interlocking",
        ],
      },
      {
        name: "Fault Recorder",
        activities: [
          "Time Sync IRIG-B-PTP",
          "Event Sequence Validation",
          "Data Retrieval",
          "Storage Capacity",
        ],
      },
      {
        name: "Battery Bank",
        activities: [
          "Capacity Discharge",
          "Voltage Stability",
          "Float-Charge Efficiency",
          "Ground Fault Detection",
        ],
      },
      {
        name: "DC-AC Charger",
        activities: [
          "Efficiency Float-Boost",
          "Output Voltage Stability",
          "Harmonic Distortion",
          "Overload Protection",
        ],
      },
      {
        name: "Cable",
        activities: [
          "Insulation Resistance",
          "Continuity",
          "Partial Discharge",
          "Thermal Imaging",
        ],
      },
    ],
  },
];
