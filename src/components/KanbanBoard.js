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
  const [isAddNewTaskFormOpen, setIsAddNewTaskFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  //to handle the open state of first task status by default
  useEffect(() => {
    if (props.tasks.done && !openColumns.includes('done')) {
      setOpenColumns(['done']);
    }
  }, [props.tasks, openColumns]);

  //function to open the task column and to close the sidebar panel
  const handleTaskClick = (status) => {
    setOpenColumns((prevColumns) => {
      const updatedColumns = prevColumns.filter((col) => col !== status);
      return [status, ...updatedColumns];
    });
  };

  //function to close the task column and show sidebar
  const handleColumnClose = (status) => {
    setOpenColumns((prevColumns) => prevColumns.filter((col) => col !== status));
  };

  //function to open the add task form
  const handleOpenAddTaskForm = () => {
    setIsAddNewTaskFormOpen(true);
  };

  //function to close the add task form
  const handleCloseAddTaskForm = () => {
    setIsAddNewTaskFormOpen(false);
  };

  //function to open the add task dialog
  const handleOpenDialog = (status) => {
    setSelectedStatus(status);
    setIsDialogOpen(true);
  };

  //function to close the add task dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  //function to handle the add task functionality
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
