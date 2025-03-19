import * as z from "zod";
import { SystemType } from "./constant";

const activitySchema = z.object({
  system: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  activity: z.string().optional()
});

export const projectFormSchema = z.object({
  customer: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  client: z.string().optional(),
  consultant: z.string().optional(),
  status: z.enum(["neutral", "on_progress", "done", "stuck"]).optional(),
  priority: z.enum(["high", "medium", "low", "neutral"]).optional(),
  phase: z.enum(["approved", "start", "half_way", "almost_done", "handover"]).optional(),
  team: z.array(z.string()).optional(),
  teamLead: z.string().optional(),
  systems: z.array(z.enum(["MV SWGR", "HV SWGR", "LV SWGR", "POWER TRAFO", "DIST. TRAFO", "COMPONENT", "RELAY", "RMU", "LOW CURRENT"] as const)).optional(),
  activities: z.array(activitySchema).optional(),
  mobilization: z.string().optional(),
  accommodation: z.string().optional(),
  kits: z.array(z.string()).optional(),
  cars: z.array(z.string()).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>; 