import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Column from './Column/Column';
import { addNewTask, moveTask } from '../reduxStore/actions';
import Sidebar from './Sidebar/Sidebar';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AddNewStatus from './AddNewStatusForm/AddNewStatus';
import AddTaskDialog from './AddTaskDialog/AddTaskDialog';

const KanbanBoard = (props) => {
  const [openColumns, setOpenColumns] = useState([]);
  const [isAddNewTaskFormOpen, setisAddNewTaskFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

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

  const handleOpenDialog = (status) => {
    setSelectedStatus(status);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddTask = (status, newTask) => {
    props.addNewTask({ status, ...newTask });
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
          onAddTask={handleOpenDialog}
        />
      ))}
       <AddTaskDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        columnName={selectedStatus}
        onSubmit={handleAddTask}
      />
      <IconButton className='add-new-status' onClick={handleOpenAddTaskForm}>
        <Add />
      </IconButton>
      <AddNewStatus open={isAddNewTaskFormOpen} handleClose={handleCloseAddTaskForm} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  moveTask,
  addNewTask
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
