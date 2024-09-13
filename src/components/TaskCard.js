import React from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaCommentAlt } from 'react-icons/fa'; 

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

        <div className="task-comments">
          <FaCommentAlt /> {task.comments || 0}
        </div>

        <div className="task-edit">
          <FaEdit />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
