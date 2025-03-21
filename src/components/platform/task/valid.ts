import * as z from "zod";

const linkedActivitySchema = z.object({
  projectId: z.string().optional(),
  system: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  activity: z.string().optional()
});

export const taskFormSchema = z.object({
  project: z.string().min(1, "Project is required"),
  task: z.string().min(1, "Task name is required"),
  status: z.enum(["stuck", "in_progress", "done", "cancelled"]).default("stuck"),
  priority: z.enum(["high", "medium", "low", "neutral"]).default("neutral"),
  duration: z.string().optional().default(""),
  desc: z.string().optional().default(""),
  tag: z.string().optional().default(""),
  date: z.date().optional(),
  hours: z.number().optional(),
  overtime: z.number().optional(),
  linkedActivity: linkedActivitySchema.optional(),
  assignedTo: z.array(z.string()).optional().default([]),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>; 