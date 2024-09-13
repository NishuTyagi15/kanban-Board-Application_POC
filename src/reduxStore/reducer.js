import { TASKS_STATUS, MOVE_TASK } from '../constants/utility';

const initialState = {
    taskStatus: {},
    tasks: {
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
    }
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_STATUS:
            return {
                ...state,
                taskStatus: action.payload
            };
        case MOVE_TASK:
            const { taskId, fromColumn, toColumn } = action.payload;
            const taskToMove = state.tasks[fromColumn].find(task => task.id === taskId);
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [fromColumn]: state.tasks[fromColumn].filter(task => task.id !== taskId),
                    [toColumn]: [...state.tasks[toColumn], taskToMove]
                }
            };
        default:
            return state;
    }
};

export default taskReducer;
