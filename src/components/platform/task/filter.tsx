import { useEffect, useState } from 'react';
import { getTasks } from './actions';
import { Task } from './type';

interface FilterOption {
    label: string;
    value: string;
}

const getUniqueValues = (tasks: Task[], property: keyof Task) => {
    if (property === 'task') {
      return [];
    }
  
    const values = tasks.map(task => task[property]);
    return Array.from(new Set(values)).map(value => ({ label: value as string, value: value as string }));
};

// Default values for status and priority when no tasks are available
const getDefaultOptions = (property: keyof Task): FilterOption[] => {
  if (property === 'status') {
    return [
      { label: 'Stuck', value: 'stuck' },
      { label: 'In Progress', value: 'in_progress' },
      { label: 'Done', value: 'done' },
      { label: 'Cancelled', value: 'cancelled' }
    ];
  }
  
  if (property === 'priority') {
    return [
      { label: 'Neutral', value: 'neutral' },
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' }
    ];
  }
  
  return [];
};

export const useFilter = (property: keyof Task): FilterOption[] => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(getDefaultOptions(property));
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const result = await getTasks();
      if (result.success && result.tasks) {
        setTasks(result.tasks);
      }
    }
    
    fetchTasks();
  }, []);

  useEffect(() => {
    const uniqueValues = getUniqueValues(tasks, property);
    if (uniqueValues.length > 0) {
      setFilterOptions(uniqueValues);
    } else {
      // If no values are found in tasks, use defaults
      setFilterOptions(getDefaultOptions(property));
    }
  }, [tasks, property]);

  return filterOptions;
};