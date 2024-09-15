import { TASKS_STATUS, MOVE_TASK, ADD_NEW_TASK, EDIT_TASK, ADD_COMMENT, ADD_NEW_STATUS } from '../constants/utility';

export const editFormStatus = (status) => ({
    type: TASKS_STATUS,
    payload: status,
});

export const moveTask = (taskId, fromColumn, toColumn) => ({
    type: MOVE_TASK,
    payload: { taskId, fromColumn, toColumn },
});

export const addNewTask = (task) => ({
    type: ADD_NEW_TASK,
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

export const addNewStatus = (statusName) => ({
    type: ADD_NEW_STATUS,
    payload: { statusName }
});