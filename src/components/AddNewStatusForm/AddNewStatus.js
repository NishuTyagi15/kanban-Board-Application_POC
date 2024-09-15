import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Chip } from '@mui/material';
import { addNewStatus } from '../../reduxStore/actions';
import { Add, Delete } from '@mui/icons-material';

const AddNewStatus = ({ open, handleClose, addNewStatus }) => {
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState('');

  //function to submit the new status details and storing the same in the store
  const handleSubmit = () => {
    if (title.trim()) {
      addNewStatus({ status, title, tags, image });
      handleFormClose();
    }
  };

  //function to handle the tags inputs data and store it in array
  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  //function to remove tag data when delete button clicked
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  //function to close the add status form and reset the form data
  const handleFormClose = () => {
    handleClose();
    setStatus(''); setTitle(''); setTags([]); setImage([])
  }

  return (
    <Dialog open={open} onClose={handleFormClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Task Tags"
          fullWidth
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent form submission on Enter
              handleAddTag();
            }
          }}
        />
        <IconButton className='addtag' onClick={handleAddTag}>
          <Add />
        </IconButton>
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              deleteIcon={<Delete />}
              style={{ margin: '4px' }}
            />
          ))}
        </div>
        <TextField
          required
          margin="dense"
          label="Image URL"
          fullWidth
          multiline
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  addNewStatus
};

export default connect(null, mapDispatchToProps)(AddNewStatus);
