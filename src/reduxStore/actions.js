import { MOVE_TASK, ADD_NEW_TASK, EDIT_TASK, ADD_COMMENT, ADD_NEW_STATUS } from '../constants/utility';

//function to update and store the drag and dropped task status
export const moveTask = (taskId, fromColumn, toColumn) => ({
    type: MOVE_TASK,
    payload: { taskId, fromColumn, toColumn },
});

//function to store the new task data
export const addNewTask = (task) => ({
    type: ADD_NEW_TASK,
    payload: task 
});

//function to store the updated task data
export const editTask = (taskId, column, updatedTask) => ({
    type: EDIT_TASK,
    payload: { taskId, column, updatedTask }
});

//function to store the comments
export const addComment = (taskId, column, comment) => ({
    type: ADD_COMMENT,
    payload: { taskId, column, comment }
});

//function to store the new status
export const addNewStatus = (newStatus) => ({
    type: ADD_NEW_STATUS,
    payload: { newStatus }
});