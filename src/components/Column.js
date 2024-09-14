import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, moveTask, columnName }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.column !== columnName) {
        moveTask(item.id, item.column, columnName);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        padding: '10px',
        border: '1px solid #ccc',
        minHeight: '400px',
        backgroundColor: isOver ? '#e0ffe0' : '#f9f9f9', // Add drop feedback
        transition: 'background-color 0.3s ease',
      }}
    >
      <h3>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} columnName={columnName} />
      ))}
    </div>
  );
};

export default Column;
