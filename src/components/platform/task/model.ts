import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    project: { type: String, required: true },
    task: { type: String, required: true },
    club: { type: String },
    status: { 
      type: String, 
      enum: ["stuck", "in_progress", "done", "cancelled"],
      default: "stuck"
    },
    priority: { 
      type: String, 
      enum: ["high", "medium", "low", "neutral"],
      default: "neutral"
    },
    duration: { type: String },
    desc: { type: String },
    label: { type: String },
    tag: { type: String },
    remark: { type: String },
    date: { type: Date },
    hours: { type: Number },
    overtime: { type: Number },
    linkedActivity: {
      projectId: { type: String },
      system: { type: String },
      category: { type: String },
      subcategory: { type: String },
      activity: { type: String }
    },
    assignedTo: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;