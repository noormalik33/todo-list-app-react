import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onToggleSubtask, onDelete, onEdit }) => {
  return (
    <ul className="mt-6 space-y-4">
      {todos.length === 0 ? (
        <div className="flex flex-col items-center py-12 text-gray-500 dark:text-gray-400">
          <span className="text-6xl mb-4" aria-hidden="true">📝</span>
          <h3 className="text-xl font-semibold mb-2">No todos yet</h3>
          <p className="text-center">Get started by adding your first todo above.<br />Stay organized and productive!</p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => onToggle(todo.id)}
            onToggleSubtask={(index) => onToggleSubtask(todo.id, index)}
            onDelete={() => onDelete(todo.id)}
            onEdit={(updates) => onEdit(todo.id, updates)}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;