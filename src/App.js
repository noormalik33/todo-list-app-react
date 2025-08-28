import React, { useState, useEffect, useRef } from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import Filters from './components/Filters';
import Stats from './components/Stats';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';
import jsPDF from 'jspdf';

const App = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [error, setError] = useState('');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (isPomodoroRunning) {
      timerRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsPomodoroRunning(false);
            alert('Pomodoro session complete!');
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPomodoroRunning]);

  const addTodo = (text, dueDate, priority, tags, subtasks = []) => {
    if (!text.trim()) {
      setError('Todo text is required.');
      return;
    }
    if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
      setError('Duplicate todo.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString(),
      completedAt: null,
      subtasks: subtasks.map(sub => ({ text: sub, completed: false }))
    };
    setTodos([...todos, newTodo]);
    setError('');
  };

  const toggleTodo = id => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null } : todo
    ));
  };

  const toggleSubtask = (todoId, subtaskIndex) => {
    setTodos(todos.map(todo =>
      todo.id === todoId ? { ...todo, subtasks: todo.subtasks.map((sub, idx) => 
        idx === subtaskIndex ? { ...sub, completed: !sub.completed } : sub
      )} : todo
    ));
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updates) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const exportTodos = () => {
    const json = JSON.stringify(todos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Todo List Report', 10, 10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);

    let yOffset = 30;
    todos.forEach((todo, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${todo.text}`, 10, yOffset);
      yOffset += 10;

      if (todo.dueDate) {
        doc.setFontSize(10);
        doc.text(`Due: ${new Date(todo.dueDate).toLocaleDateString()}`, 15, yOffset);
        yOffset += 10;
      }
      if (todo.priority) {
        doc.setFontSize(10);
        doc.text(`Priority: ${todo.priority}`, 15, yOffset);
        yOffset += 10;
      }
      if (todo.tags.length > 0) {
        doc.setFontSize(10);
        doc.text(`Tags: ${todo.tags.join(', ')}`, 15, yOffset);
        yOffset += 10;
      }
      if (todo.subtasks.length > 0) {
        doc.setFontSize(10);
        todo.subtasks.forEach(sub => {
          doc.text(`- ${sub.text} [${sub.completed ? '✓' : '✗'}]`, 20, yOffset);
          yOffset += 10;
        });
      }
      yOffset += 5; // Extra space between todos
    });

    doc.save('todo-list.pdf');
  };

  const importTodos = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const imported = JSON.parse(event.target.result);
        setTodos([...todos, ...imported]);
      } catch (err) {
        setError('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()) || (todo.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLocaleLowerCase())));

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 max-w-4xl pb-16 sm:pb-20 md:pb-24">
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-2 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4 md:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Your Todo Tasks</h1>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <TodoInput onAdd={addTodo} />
          {error && <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2">{error}</p>}
          <Filters 
            filter={filter} 
            onFilterChange={setFilter} 
            query={searchQuery} 
            onQueryChange={setSearchQuery} 
            onClearCompleted={clearCompleted} 
            hasCompleted={stats.completed > 0}
          />
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo}
            onToggleSubtask={toggleSubtask}
            onDelete={deleteTodo} 
            onEdit={editTodo}
          />
          <Stats {...stats} />
          <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
            <button onClick={exportTodos} className="bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-green-600 transition">
              Export JSON
            </button>
            <button onClick={exportToPDF} className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-blue-600 transition">
              Download PDF
            </button>
            <label className="bg-purple-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-purple-600 transition cursor-pointer">
              Import JSON
              <input type="file" accept=".json" onChange={importTodos} className="hidden" />
            </label>
          </div>
          <div className="mt-2 sm:mt-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Pomodoro Timer</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-lg sm:text-2xl">{Math.floor(pomodoroTime / 60)}:{(pomodoroTime % 60).toString().padStart(2, '0')}</span>
              <button 
                onClick={() => setIsPomodoroRunning(!isPomodoroRunning)} 
                className="bg-indigo-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-indigo-600 transition"
              >
                {isPomodoroRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={() => setPomodoroTime(25 * 60)} 
                className="bg-gray-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default App;