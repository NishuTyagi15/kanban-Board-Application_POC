import React from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { moveTask, addTask, editTask, addComment, editFormStatus } from '../reduxStore/actions';
import AddTaskForm from './AddTaskForm ';

const KanbanBoard = ({ tasks, moveTask, addTask, editTask, addComment }) => {
  return (
    <div className="board">
      <AddTaskForm addTask={addTask} />
      <Column title="Backlog" tasks={tasks.backlog} moveTask={moveTask} editTask={editTask} addComment={addComment} columnName="backlog" />
      <Column title="In Progress" tasks={tasks.inProgress} moveTask={moveTask} editTask={editTask} addComment={addComment} columnName="inProgress" />
      <Column title="Testing" tasks={tasks.testing} moveTask={moveTask} editTask={editTask} addComment={addComment} columnName="testing" />
      <Column title="Done" tasks={tasks.done} moveTask={moveTask} editTask={editFormStatus} addComment={addComment} columnName="done" />
    </div>
  );
};


const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  moveTask,
  addTask
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);