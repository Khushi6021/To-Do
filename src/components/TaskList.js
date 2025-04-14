// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, toggleTask, deleteTask, editTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTask(task.id)}
          >
            {task.text} (Priority: {task.priority})
          </span>
          <button onClick={() => editTask(task.id, prompt("Edit task:", task.text))}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
