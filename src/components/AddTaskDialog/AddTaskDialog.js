import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import './AddTaskDialog.css';

const AddTaskDialog = ({ open, onClose, columnName, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskImage, setTaskImage] = useState('');
  const [taskTags, setTaskTags] = useState('');

  //function to submit and store the new task data
  const handleSubmit = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      image: taskImage,
      tags: taskTags.split(',').map(tag => tag.trim()),
      comments: [],
    };
    onSubmit(columnName, newTask);
    handleialogClose();
  };

  //function to close the add task dialog and reset the dialog data
  const handleialogClose = () => {
    onClose();
    setTaskTitle(''); setTaskImage(''); setTaskTags('');
  }

  return (
    <Dialog className='dialog-main' open={open} onClose={handleialogClose}>
      <DialogTitle className='dialog-title'>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className='dialogTextfield'
        />
        <TextField
          label="Image URL"
          fullWidth
          value={taskImage}
          onChange={(e) => setTaskImage(e.target.value)}
          className='dialogTextfield'
        />
        <TextField
          label="Tags (comma separated)"
          fullWidth
          value={taskTags}
          onChange={(e) => setTaskTags(e.target.value)}
          className='dialogTextfield'
        />
        <TextField
          label="Status"
          fullWidth
          value={columnName}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginTop: '10px' }}
          className='dialogTextfield'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleialogClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
