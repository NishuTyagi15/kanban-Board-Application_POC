import React from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { moveTask } from '../reduxStore/actions';

const KanbanBoard = ({ tasks, moveTask }) => {
  return (
    <div className="board">
      <Column title="Backlog" tasks={tasks.backlog} moveTask={moveTask} columnName="backlog" />
      <Column title="In Progress" tasks={tasks.inProgress} moveTask={moveTask} columnName="inProgress" />
      <Column title="Testing" tasks={tasks.testing} moveTask={moveTask} columnName="testing" />
      <Column title="Done" tasks={tasks.done} moveTask={moveTask} columnName="done" />
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({
  tasks: state.tasks, // Adjust if your state structure differs
});

// Map Redux dispatch actions to component props
const mapDispatchToProps = {
  moveTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
