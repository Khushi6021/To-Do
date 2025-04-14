import React from 'react';

const TaskList = ({ tasks, toggleTask, deleteTask, editTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)} // This calls the toggleTask function when the checkbox is clicked
          />
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => {
            const newText = prompt('Edit task:', task.text);
            if (newText) editTask(task.id, newText);
          }}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
