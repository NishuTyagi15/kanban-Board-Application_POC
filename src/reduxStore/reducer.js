import { TASKS_STATUS, MOVE_TASK, ADD_TASK, EDIT_TASK, ADD_COMMENT  } from '../constants/utility';

const initialState = {
    taskStatus: {},
    tasks: {
        backlog: [
            { id: 1, title: 'Test new authentication service', tags: ['webix', 'jet', 'easy'], comments: [], image: 'https://via.placeholder.com/30' },
        ],
        inProgress: [
            { id: 2, title: 'Performance tests', tags: ['webix'], comments: [], image: 'https://via.placeholder.com/30' },
        ],
        testing: [
            { id: 3, title: 'Portlets view', tags: ['jet', 'hard'], comments: [], image: 'https://via.placeholder.com/30' },
        ],
        done: [
            { id: 4, title: 'SpreadSheet NodeJS', tags: ['easy'], comments: [], image: 'https://via.placeholder.com/30' },
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
        case ADD_TASK:
            const { title, tags, column } = action.payload;
            const newTask = {
                id: Date.now(),
                title,
                tags,
                comments: 0,
                image: 'https://via.placeholder.com/30'  
            };
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [column]: [...state.tasks[column], newTask]
                }
            };
        case EDIT_TASK:
            const { taskId: editTaskId, column: editColumn, updatedTask } = action.payload;
            return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [editColumn]: state.tasks[editColumn].map(task =>
                            task.id === editTaskId ? { ...task, ...updatedTask } : task
                        )
                    }
            };
            case ADD_COMMENT:
    const { taskId: commentTaskId, column: commentColumn, comment } = action.payload;
    const updatedTasks = state.tasks[commentColumn].map(task =>
        task.id === commentTaskId
            ? { ...task, comments: [...(task.comments || []), comment] } // Ensure comments is an array
            : task
    );
    return {
        ...state,
        tasks: {
            ...state.tasks,
            [commentColumn]: updatedTasks
        }
    };
        default:
            return state;
    }
};

export default taskReducer;
