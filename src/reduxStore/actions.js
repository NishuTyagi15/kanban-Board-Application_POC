import { TASKS_STATUS, MOVE_TASK, ADD_TASK, EDIT_TASK, ADD_COMMENT } from '../constants/utility';

export const editFormStatus = (status) => ({
    type: TASKS_STATUS,
    payload: status,
});

export const moveTask = (taskId, fromColumn, toColumn) => ({
    type: MOVE_TASK,
    payload: { taskId, fromColumn, toColumn },
});

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task 
});

export const editTask = (taskId, column, updatedTask) => ({
    type: EDIT_TASK,
    payload: { taskId, column, updatedTask }
});

export const addComment = (taskId, column, comment) => ({
    type: ADD_COMMENT,
    payload: { taskId, column, comment }
});