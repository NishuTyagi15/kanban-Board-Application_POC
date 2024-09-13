// src/App.js
import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'; 
import store from './reduxStore/store';
function App() {
  return (
    <React.StrictMode>
      <Provider store={store}> 
        <DndProvider backend={HTML5Backend}>
          <KanbanBoard />
        </DndProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
