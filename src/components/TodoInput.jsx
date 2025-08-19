import React, { useState } from 'react';

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState('');
  const [subtasks, setSubtasks] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const subtaskList = subtasks.split(',').map(sub => sub.trim()).filter(sub => sub);
    onAdd(text, dueDate, priority, tags, subtaskList);
    setText('');
    setDueDate('');
    setPriority('medium');
    setTags('');
    setSubtasks('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter todo..."
          className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-full sm:w-2/5 min-w-[200px] text-sm sm:text-base"
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-full sm:w-1/5 min-w-[150px] text-sm sm:text-base"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-full sm:w-1/5 min-w-[120px] text-sm sm:text-base"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-full sm:w-1/5 min-w-[150px] text-sm sm:text-base"
        />
        <input
          type="text"
          value={subtasks}
          onChange={e => setSubtasks(e.target.value)}
          placeholder="Subtasks (comma separated)"
          className="p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-full sm:w-1/5 min-w-[150px] text-sm sm:text-base"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto text-sm sm:text-base"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoInput;