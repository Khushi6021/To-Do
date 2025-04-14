import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css'; // ✅ This is correct
import Todoinput from './components/Todoinput';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isInputVisible, setIsInputVisible] = useState(true);

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addTask = (taskText, priority) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const sortTasksByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setTasks(sortedTasks);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, priority);
      setTaskText('');
      setIsInputVisible(false);
    }
  };

  const handleAddNewTask = () => {
    setIsInputVisible(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // For "all"
  });

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <h1 className="heading">TODO TASK LIST </h1>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <FilterBar setFilter={setFilter} />

      {isInputVisible && (
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}

      {!isInputVisible && (
        <button onClick={handleAddNewTask}>Add New Task</button>
      )}

      <button onClick={sortTasksByPriority}>🔽 Sort by Priority</button>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Todoinput addTask={addTask} />
    </div>
  );
};

export default App;
