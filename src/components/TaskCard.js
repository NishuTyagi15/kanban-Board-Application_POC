import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaCommentAlt } from 'react-icons/fa'; 

const TaskCard = ({ task, columnName, editTask, addComment }) => {
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

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const toggleComments = () => {
    setShowComments(prevState => !prevState);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(task.id, columnName, commentText);
      setCommentText('');
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
      <h4>{task.title}</h4>
      <div className="task-tags">
        {task.tags && task.tags.map((tag, index) => (
          <span key={index} className={`task-tag ${tag}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="task-meta">
        {task.image && (
          <img
            src={task.image}
            alt="avatar"
            className="task-avatar"
          />
        )}

        <div className="task-comments" onClick={toggleComments}>
          <FaCommentAlt /> {task.comments.length || 0}
        </div>

        <div className="task-edit" onClick={handleEditClick}>
          <FaEdit />
        </div>
      </div>
      {showComments && (
        <div className="task-comments-section">
          <ul>
            {task.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
