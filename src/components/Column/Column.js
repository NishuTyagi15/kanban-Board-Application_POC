import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';
import { IconButton, Paper } from '@mui/material';
import './Column.css';
import { ArrowBackIos, Add } from '@mui/icons-material';
import { addNewTask } from '../../reduxStore/actions';
import { connect } from 'react-redux';

const Column = ({ title, tasks, moveTask, columnName, onClose, onAddTask }) => {

  //functopn to handle amd store the drag & drop updated data
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

  //function to handle the click to add a new task
  const handleAddClick = () => {
    onAddTask(columnName);
  };

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
      <Paper className='task-stack-title'>{title} 
      <div className='action-buttons'>
      <IconButton
          onClick={handleAddClick}
          style={{ position: 'absolute', top: '10px', right: '40px' }}
        >
          <Add />
      </IconButton>
      <IconButton
        onClick={onClose}
        style={{ position: 'absolute', top: '10px', right: '8px' }}
      >
        <ArrowBackIos className='back-arrow-icon'/>
      </IconButton>
      </div>
      </Paper>
      {tasks?.map(task => (
        <TaskCard key={task.id} task={task} columnName={columnName} />
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  addNewTask
};

export default connect(null, mapDispatchToProps)(Column);
