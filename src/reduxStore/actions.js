import { TASKS_STATUS } from "../constants/utility";

export const editFormStatus = (status) => ({
    type: TASKS_STATUS,
    payload: status,
});
