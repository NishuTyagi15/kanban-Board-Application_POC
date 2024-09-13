import React from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaCommentAlt } from 'react-icons/fa'; // For icons

const TaskCard = ({ task, columnName }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, column: columnName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {/* Task Title */}
      <h4>{task.title}</h4>

      {/* Task Tags */}
      <div className="task-tags">
        {task.tags && task.tags.map((tag, index) => (
          <span key={index} className={`task-tag ${tag}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Task Metadata (Comments, Edit, and Image) */}
      <div className="task-meta">
        {/* Image or Avatar */}
        {task.image && (
          <img
            src={task.image}
            alt="avatar"
            className="task-avatar"
          />
        )}

        {/* Comment Count */}
        <div className="task-comments">
          <FaCommentAlt /> {task.comments || 0}
        </div>

        {/* Edit Icon */}
        <div className="task-edit">
          <FaEdit />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
