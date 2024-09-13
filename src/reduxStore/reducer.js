import { TASKS_STATUS } from "../constants/utility";

const initialState = {
    taskStatus: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_STATUS:
            return {
                ...state,
                taskStatus: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
