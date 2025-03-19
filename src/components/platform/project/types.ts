import { SystemType } from './constant';

export interface TeamMember {
  id: string;
  name: string;
}

export interface TeamLead {
  id: string;
  name: string;
}

export interface Kit {
  id: string;
  name: string;
}

export interface Car {
  id: string;
  name: string;
}

export interface ActivityCategory {
  item: string;
  subitems: Array<{
    name: string;
    activities: string[];
  }>;
}

export interface ActivityWithSystem {
  system: SystemType;
  category: string;
  subcategory: string;
  activity: string;
}

export interface ProjectCreateFormProps {
  onSuccess?: () => void;
}

export interface Project {
  _id?: string;
  customer: string;
  description: string;
  location: string;
  client: string;
  consultant: string;
  status: "neutral" | "on_progress" | "done" | "stuck";
  priority: "high" | "medium" | "low" | "neutral";
  phase: "approved" | "start" | "half_way" | "almost_done" | "handover";
  team: string[];
  teamLead: string;
  systems: string[];
  activities: Array<{
    system: string;
    category: string;
    subcategory: string;
    activity: string;
  }>;
  mobilization: string;
  accommodation: string;
  kits: string[];
  cars: string[];
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
} 