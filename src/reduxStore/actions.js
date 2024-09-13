import { TASKS_STATUS, MOVE_TASK } from '../constants/utility';

export const editFormStatus = (status) => ({
    type: TASKS_STATUS,
    payload: status,
});

export const moveTask = (taskId, fromColumn, toColumn) => ({
    type: MOVE_TASK,
    payload: { taskId, fromColumn, toColumn },
});
