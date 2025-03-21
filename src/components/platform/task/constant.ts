export const TASK_STATUS = {
  STUCK: "stuck",
  IN_PROGRESS: "in_progress",
  DONE: "done", 
  CANCELLED: "cancelled"
} as const;

export const TASK_PRIORITY = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  NEUTRAL: "neutral"
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.STUCK]: "Stuck",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.DONE]: "Done",
  [TASK_STATUS.CANCELLED]: "Cancelled"
};

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.HIGH]: "High",
  [TASK_PRIORITY.MEDIUM]: "Medium",
  [TASK_PRIORITY.LOW]: "Low",
  [TASK_PRIORITY.NEUTRAL]: "Neutral"
};

export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({
  value,
  label
}));

export const TASK_PRIORITY_OPTIONS = Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => ({
  value,
  label
}));