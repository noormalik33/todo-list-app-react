import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : initialValue;
      return Array.isArray(parsed) ? parsed.map(todo => ({
        ...todo,
        tags: todo.tags || [],
        subtasks: todo.subtasks || [],
        priority: todo.priority || 'medium',
        dueDate: todo.dueDate || '',
        completed: todo.completed || false
      })) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;