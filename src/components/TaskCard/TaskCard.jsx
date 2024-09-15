import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';
import { addComment, editTask } from '../../reduxStore/actions';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import './TaskCard.css';
import { Edit, ModeComment } from '@mui/icons-material';

const TaskCard = ({ task, columnName, addComment, editTask }) => {
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false); // For Edit Dialog
  const [commentText, setCommentText] = useState('');

  // State to hold the task details when editing
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
  const [editedTaskImage, setEditedTaskImage] = useState(task.image);
  const [editedTaskTags, setEditedTaskTags] = useState(task.tags.join(', '));

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, column: columnName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handle opening the edit dialog and pre-populating the fields
  const handleEditClick = () => {
    setEditedTaskTitle(task.title);
    setEditedTaskImage(task.image);
    setEditedTaskTags(task.tags.join(', '));
    setShowEditDialog(true);
  };

  // Handle editing the task and submitting the changes
  const handleEditSubmit = () => {
    const updatedTask = {
      title: editedTaskTitle,
      image: editedTaskImage,
      tags: editedTaskTags.split(',').map(tag => tag.trim()),
    };
    editTask(task.id, columnName, updatedTask);
    setShowEditDialog(false);
  };

  //Handle the comments dialog to show comment with add comment option
  const toggleCommentsDialog = () => {
    setShowCommentsDialog(prevState => !prevState);
  };

  //Funtion to open the add comment dialog
  const toggleAddCommentDialog = () => {
    setShowAddCommentDialog(prevState => !prevState);
  };

  //function to handle the add comment and store it
  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(task.id, columnName, commentText);
      setCommentText('');
      toggleAddCommentDialog();
    }
  };

  return (
    <div
      ref={drag}
      className="task"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className='card-title'>
        <h4>{task.title}</h4>
        <Avatar alt="avatar-image" src={task.image !== '' ? task.image : "/static/images/avatar/1.jpg"} />
      </div>
      <div className="task-tags">
        <div>
          {task?.tags.map((tag, index) => (
            <span className={`task-tag ${tag}`} key={index}>
              {tag}
            </span>
          ))}
        </div>
        <div className='edit-comment-task'>
          <div className="task-comments" onClick={toggleCommentsDialog}>
            <ModeComment /> {task.comments.length || ''}
          </div>
          <div className="task-edit" onClick={handleEditClick}>
            <Edit />
          </div>
        </div>
      </div>

      {/* Comments Dialog */}
      <Dialog open={showCommentsDialog} onClose={toggleCommentsDialog} fullWidth maxWidth="sm">
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {task.comments.length > 0 ? (
            <div className="comments-container">
              {task.comments.map((comment, index) => (
                <div key={index} className={`comment ${index % 2 === 0 ? 'comment-even' : 'comment-odd'}`}>
                  <Typography variant="body1">
                    {comment}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography>No comments yet.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCommentsDialog}>Close</Button>
          <Button onClick={toggleAddCommentDialog}>Add Comment</Button>
        </DialogActions>
      </Dialog>

      {/* Add Comment Dialog */}
      <Dialog open={showAddCommentDialog} onClose={toggleAddCommentDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddCommentDialog}>Cancel</Button>
          <Button onClick={handleAddComment}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editedTaskTitle}
            onChange={(e) => setEditedTaskTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Image URL"
            fullWidth
            value={editedTaskImage}
            onChange={(e) => setEditedTaskImage(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            value={editedTaskTags}
            onChange={(e) => setEditedTaskTags(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  editTask,
  addComment,
};

export default connect(null, mapDispatchToProps)(TaskCard);
