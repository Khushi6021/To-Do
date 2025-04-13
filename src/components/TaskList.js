import React, { useState } from 'react';


const TaskList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSave = (id) => {
    if (editText.trim() !== '') {
      editTask(id, editText);
      setEditId(null);
      setEditText('');
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''} ${task.priority.toLowerCase()}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSave(task.id)}>💾</button>
              <button onClick={handleCancel}>❌</button>
            </>
          ) : (
            <>
              <span>{task.text}</span>
              <div className="task-actions">
                <button onClick={() => { setEditId(task.id); setEditText(task.text); }}>
                  ✏️
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  🗑️
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
