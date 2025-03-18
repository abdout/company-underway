import { useTask } from './context';
import { useEffect, useState } from 'react';
import { task } from './type';

interface FilterOption {
    label: string;
    value: string;
}

const getUniqueValues = (tasks: task[], property: keyof task) => {
    if (property === 'task') {
      return [];
    }
  
    const values = tasks.map(task => task[property]);
    return Array.from(new Set(values)).map(value => ({ label: value as string, value: value as string }));
};

// Default values for status and priority when no tasks are available
const getDefaultOptions = (property: keyof task): FilterOption[] => {
  if (property === 'status') {
    return [
      { label: 'Neutral', value: 'Neutral' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Stopped', value: 'Stopped' }
    ];
  }
  
  if (property === 'priority') {
    return [
      { label: 'Neutral', value: 'Neutral' },
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' }
    ];
  }
  
  return [];
};

export const useFilter = (property: keyof task): FilterOption[] => {
  const { tasks, refreshTasks } = useTask();
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(getDefaultOptions(property));

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

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