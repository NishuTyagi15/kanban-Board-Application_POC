import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, moveTask, columnName }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, item.column, columnName),
  });

  return (
    <div ref={drop} style={{ width: '200px', padding: '10px', border: '1px solid #ccc', minHeight: '400px' }}>
      <h3>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} columnName={columnName} />
      ))}
    </div>
  );
};

export default Column;
