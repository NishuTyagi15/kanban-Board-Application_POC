import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { moveTask } from '../reduxStore/actions';
import Sidebar from './Sidebar/Sidebar';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AddTaskForm from './AddTaskForm';

const KanbanBoard = (props) => {
  const [openColumns, setOpenColumns] = useState([]);
  const [isAddNewTaskFormOpen, setisAddNewTaskFormOpen] = useState(false);

  useEffect(() => {
    if (props.tasks.done && !openColumns.includes('done')) {
      setOpenColumns(['done']);
    }
  }, [props.tasks, openColumns]);

  const handleTaskClick = (status) => {
    setOpenColumns((prevColumns) => {
      const updatedColumns = prevColumns.filter((col) => col !== status);
      return [status, ...updatedColumns];
    });
  };

  const handleColumnClose = (status) => {
    setOpenColumns((prevColumns) => prevColumns.filter((col) => col !== status));
  };

  const handleOpenAddTaskForm = () => {
    setisAddNewTaskFormOpen(true);
  };

  const handleCloseAddTaskForm = () => {
    setisAddNewTaskFormOpen(false);
  };

  return (
    <div className="board">
      <Sidebar onTaskClick={handleTaskClick} openColumns={openColumns} />

      {openColumns.map((status, index) => (
        <Column
          key={index}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
          tasks={props.tasks[status]}
          moveTask={props.moveTask}
          columnName={status}
          onClose={() => handleColumnClose(status)}
        />
      ))}
      <IconButton className='add-new-status' onClick={handleOpenAddTaskForm}>
        <Add />
      </IconButton>
      <AddTaskForm open={isAddNewTaskFormOpen} handleClose={handleCloseAddTaskForm} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  moveTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
