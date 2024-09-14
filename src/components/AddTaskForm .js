import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [column, setColumn] = useState('backlog');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && column) {
      addTask({ title, tags: tags.split(',').map(tag => tag.trim()), column });
      setTitle('');
      setTags('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Task title" 
      />
      <input 
        type="text" 
        value={tags} 
        onChange={(e) => setTags(e.target.value)} 
        placeholder="Tags (comma separated)" 
      />
      <select value={column} onChange={(e) => setColumn(e.target.value)}>
        <option value="backlog">Backlog</option>
        <option value="inProgress">In Progress</option>
        <option value="testing">Testing</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;