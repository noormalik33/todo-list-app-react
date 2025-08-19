import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onToggleSubtask, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo?.text || '');
  const [editDueDate, setEditDueDate] = useState(todo?.dueDate || '');
  const [editPriority, setEditPriority] = useState(todo?.priority || 'medium');
  const [editTags, setEditTags] = useState((todo?.tags || []).join(', ') || '');
  const [editSubtasks, setEditSubtasks] = useState((todo?.subtasks || []).map(sub => sub.text).join(', ') || '');

  const handleSave = () => {
    onEdit({
      text: editText,
      dueDate: editDueDate,
      priority: editPriority,
      tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      subtasks: editSubtasks.split(',').map(sub => ({ text: sub.trim(), completed: false })).filter(sub => sub.text)
    });
    setIsEditing(false);
  };

  const isOverdue = todo?.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <li className={`flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg mb-2 shadow-md transition-all hover:shadow-lg ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={e => setEditDueDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            value={editTags}
            onChange={e => setEditTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            value={editSubtasks}
            onChange={e => setEditSubtasks(e.target.value)}
            placeholder="Subtasks (comma separated)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleSave} className="text-green-500 hover:text-green-700 font-semibold">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 font-semibold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <input
              type="checkbox"
              checked={todo?.completed || false}
              onChange={onToggle}
              className="mt-1 h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <span className={`text-lg ${todo?.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                {todo?.text || 'Untitled Task'}
              </span>
              {todo?.dueDate && (
                <p className={`text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              )}
              <div className="flex space-x-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs ${todo?.priority === 'low' ? 'bg-green-200 text-green-800' : todo?.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                  {todo?.priority ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) : 'Medium'}
                </span>
                {(todo?.tags || []).map(tag => (
                  <span key={tag} className="px-2 py-1 rounded text-xs bg-indigo-200 text-indigo-800">
                    {tag}
                  </span>
                ))}
              </div>
              {(todo?.subtasks || []).length > 0 && (
                <div className="mt-2">
                  {(todo?.subtasks || []).map((sub, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={sub?.completed || false}
                        onChange={() => onToggleSubtask(index)}
                        className="h-4 w-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className={sub?.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}>
                        {sub?.text || 'Untitled Subtask'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 font-semibold">Edit</button>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;