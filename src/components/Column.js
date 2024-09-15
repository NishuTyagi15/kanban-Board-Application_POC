import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { IconButton, Paper } from '@mui/material';
import './Column.css';
import { ArrowBackIos } from '@mui/icons-material';

const Column = ({ title, tasks, moveTask, columnName, onClose, style }) => {
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
        width: '100%',
        padding: '10px',
        minHeight: '400px',
        backgroundColor: isOver ? '#e0ffe0' : '#f9f9f9',
        transition: 'background-color 0.3s ease',
        position: 'relative',
      }}
    >
      <Paper className='task-stack-title'>{title} <IconButton
        onClick={onClose}
        style={{ position: 'absolute', top: '10px', right: '8px' }}
      >
        <ArrowBackIos className='back-arrow-icon'/>
      </IconButton>
      </Paper>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} columnName={columnName} />
      ))}
    </div>
  );
};

export default Column;
