import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, moveTask, columnName }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.column !== columnName) {
        moveTask(item.id, item.column, columnName);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        padding: '10px',
        border: '1px solid #ccc',
        minHeight: '400px',
        backgroundColor: '#f9f9f9',
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
