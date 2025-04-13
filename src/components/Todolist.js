function Todolist({
  item,
  completed,
  index,
  deleteItem,
  toggleComplete,
  onEdit,
  isEditing,
  editText,
  setEditText,
  onSaveEdit,
}) {
  return (
    <li className={`list_items ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleComplete(index)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={onSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <span className="task-text">{item}</span>
          <span className="icons">
            <i
              className="fa-solid fa-pen"
              style={{ marginRight: 10, cursor: 'pointer' }}
              onClick={() => onEdit(index)}
            ></i>
            <i
              className="fa-solid fa-trash"
              style={{ cursor: 'pointer' }}
              onClick={() => deleteItem(index)}
            ></i>
          </span>
        </>
      )}
    </li>
  );
}

export default Todolist;
