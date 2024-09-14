import { createStore } from 'redux';
import taskReducer from './reducer';

const store = createStore(
  taskReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For using Redux DevTools
);

export default store;
