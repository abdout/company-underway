export interface Task {
  _id?: string;
  project: string;
  task: string;
  club: string;
  status: "stuck" | "in_progress" | "done" | "cancelled";
  priority: "high" | "medium" | "low" | "neutral";
  duration: string;
  desc: string;
  label: string;
  tag: string;
  remark: string;
  date?: Date;
  hours?: number;
  overtime?: number;
  linkedActivity?: {
    projectId: string;
    system: string;
    category: string;
    subcategory: string;
    activity: string;
  };
  assignedTo?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreateFormProps {
  taskToEdit?: Task | null;
  onSuccess?: () => Promise<void>;
  onClose?: () => void;
}

export interface TaskContextProps {
  task: Task | null;
  tasks: Task[];
  fetchTask: (id: string) => void;
  fetchTasks: () => void;
  refreshTasks: () => void;
  deleteTask: (id: string) => void;
  createTask: (data: Task) => void; 
  updateTask: (id: string, data: Partial<Task>) => void; 
}
