import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editText, setEditText] = useState('');
  const [editing, setEditing] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addList = () => {
    if (inputText.trim() !== '') {
      const newTask = {
        text: inputText,
        priority,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setInputText('');
      setPriority('Medium');
    }
  };

  const deleteItems = (index) => {
    const newList = [...todos];
    newList.splice(index, 1);
    setTodos(newList);
  };

  const toggleTaskComplete = (index) => {
    const updatedTasks = [...todos];
    if (updatedTasks[index]) {
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTodos(updatedTasks);
    }
  };

  const handleEdit = (index) => {
    setEditing(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editing].text = editText;
    setTodos(updatedTodos);
    setEditing(null);
    setEditText('');
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTodos = [...todos].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="todo_container">
        <h1>Todo List</h1>

        {/* Dark Mode Toggle */}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Input + Priority */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Add a task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button onClick={addList}>Add</button>
        </div>

        <h3 className="heading">TASKS</h3>
        <hr />

        {/* Task List */}
        {sortedTodos.map((task, index) => (
          <div
            key={index}
            className={`task ${task.completed ? 'completed' : ''}`}
          >
            {editing === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTaskComplete(index)}>
                  {task.text} — <strong>{task.priority}</strong>
                </span>
                <div className="btns">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => deleteItems(index)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
