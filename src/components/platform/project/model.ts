import mongoose, { Schema } from "mongoose";
import { SystemType } from "./constant";
import { ProjectFormValues } from "./valid";

const activitySchema = new Schema({
  system: {
    type: String,
    enum: ["MV SWGR", "HV SWGR", "LV SWGR", "POWER TRAFO", "DIST. TRAFO", "COMPONENT", "RELAY", "RMU", "LOW CURRENT"],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  }
});

const projectSchema = new Schema<ProjectFormValues>(
  {
    // Basic Information
    customer: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    client: {
      type: String,
      trim: true
    },
    consultant: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["neutral", "on_progress", "done", "stuck"],
      default: "neutral"
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low", "neutral"],
      default: "neutral"
    },
    phase: {
      type: String,
      enum: ["approved", "start", "half_way", "almost_done", "handover"],
      default: "approved"
    },
    
    // Team Information
    team: [{
      type: String
    }],
    teamLead: {
      type: String
    },
    
    // Systems and Activities
    systems: [{
      type: String,
      enum: ["MV SWGR", "HV SWGR", "LV SWGR", "POWER TRAFO", "DIST. TRAFO", "COMPONENT", "RELAY", "RMU", "LOW CURRENT"]
    }],
    activities: [activitySchema],
    
    // Resources
    mobilization: {
      type: String,
      trim: true
    },
    accommodation: {
      type: String,
      trim: true
    },
    kits: [{
      type: String
    }],
    cars: [{
      type: String
    }],
    
    // Additional Fields
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
projectSchema.index({ customer: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;