import React, { useState } from 'react';
import Column from './Column';

const initialTasks = {
    backlog: [
      { id: 1, title: 'Test new authentication service', tags: ['webix', 'jet', 'easy'], comments: 3, image: 'https://via.placeholder.com/30' },
    ],
    inProgress: [
      { id: 2, title: 'Performance tests', tags: ['webix'], comments: 2, image: 'https://via.placeholder.com/30' },
    ],
    testing: [
      { id: 3, title: 'Portlets view', tags: ['jet', 'hard'], comments: 1, image: 'https://via.placeholder.com/30' },
    ],
    done: [
      { id: 4, title: 'SpreadSheet NodeJS', tags: ['easy'], comments: 0, image: 'https://via.placeholder.com/30' },
    ]
  };
  

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find(task => task.id === taskId);
    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter(task => task.id !== taskId),
      [toColumn]: [...tasks[toColumn], taskToMove]
    });
  };

  return (
    <div className="board">
      <Column title="Backlog" tasks={tasks.backlog} moveTask={moveTask} columnName="backlog" />
      <Column title="In Progress" tasks={tasks.inProgress} moveTask={moveTask} columnName="inProgress" />
      <Column title="Testing" tasks={tasks.testing} moveTask={moveTask} columnName="testing" />
      <Column title="Done" tasks={tasks.done} moveTask={moveTask} columnName="done" />
    </div>
  );
};

export default KanbanBoard;
