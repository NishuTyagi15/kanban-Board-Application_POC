import React from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { moveTask, addTask, editTask, addComment, editFormStatus } from '../reduxStore/actions';
import AddTaskForm from './AddTaskForm ';

const KanbanBoard = (props) => {
  return (
    <div className="board">
      <AddTaskForm addTask={props.addTask} />
      <Column title="Backlog" tasks={props.tasks.backlog} moveTask={props.moveTask} columnName="backlog" />
      <Column title="In Progress" tasks={props.tasks.inProgress} moveTask={props.moveTask} columnName="inProgress" />
      <Column title="Testing" tasks={props.tasks.testing} moveTask={props.moveTask} columnName="testing" />
      <Column title="Done" tasks={props.tasks.done} moveTask={props.moveTask} columnName="done" />
    </div>
  );
};


const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  moveTask,
  addTask,
  editTask,
  editFormStatus,
  addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);