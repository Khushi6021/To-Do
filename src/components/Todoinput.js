import React, { useState } from 'react';


function Todoinput(props) {
  const [inputText, setInputText] = useState(''); 

  
  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && inputText !== "") { 
      e.preventDefault();
      props.addList(inputText,priority);  
      setInputText(''); 
      setPriority('Medium');
    }
  };
 const handleAddClick=(e)=>{
  if(inputText !==""){
    e.preventDefault();
    props.addList(inputText);
    setInputText(' ')
  }
 };
  return (
    <form  className="task-form">
      <div className='input_box'>
      <input type="text"value={inputText}
        placeholder="Add a new task"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <button className='add_task'
      onClick={handleAddClick}
        

      >add</button>
        <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
         <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      
    </div>
    </form>
    
  );
}

export default Todoinput;
