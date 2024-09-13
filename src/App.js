import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
    <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
    </DndProvider>
  </React.StrictMode>
  );
}

export default App;
