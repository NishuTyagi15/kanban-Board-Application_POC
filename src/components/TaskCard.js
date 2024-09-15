import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
// import { FaEdit, FaCommentAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { addComment, editTask } from '../reduxStore/actions';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import './TaskCard.css'
import { Edit, ModeComment } from '@mui/icons-material';

const TaskCard = ({ task, columnName, addComment, editTask }) => {
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, column: columnName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleEditClick = () => {
    editTask(task.id, columnName);
  };

  const toggleCommentsDialog = () => {
    setShowCommentsDialog(prevState => !prevState);
  };

  const toggleAddCommentDialog = () => {
    setShowAddCommentDialog(prevState => !prevState);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(task.id, columnName, commentText);
      setCommentText('');
      toggleAddCommentDialog(); // Close the add comment dialog
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
        {task.tags && task.tags.map((tag, index) => (
          <span key={index} className={`task-tag ${tag}`}>
            {tag}
          </span>
        ))}
        <div className='edit-comment-task'>
          <div className="task-comments" onClick={toggleCommentsDialog}>
            <ModeComment /> {task.comments.length || ''}
          </div>
          <div className="task-edit" onClick={handleEditClick}>
            <Edit />
          </div>
        </div>
      </div>

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
    </div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  editTask,
  addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
