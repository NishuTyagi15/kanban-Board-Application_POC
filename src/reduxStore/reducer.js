import { MOVE_TASK, ADD_NEW_TASK, EDIT_TASK, ADD_COMMENT, ADD_NEW_STATUS } from '../constants/utility';

const initialState = {
    taskStatus: {},
    tasks: {
        backlog: [
            { id: 1, title: 'Test new authentication service', tags: ['webix', 'jet', 'easy'], comments: [], image: 'https://images.unsplash.com/photo-1560453798-12b95c2e94aa' },
        ],
        inProgress: [
            { id: 2, title: 'Performance tests', tags: ['webix'], comments: [], image: 'https://images.unsplash.com/photo-1523306853964-11c9d8f17d8b' },
        ],
        testing: [
            { id: 3, title: 'Portlets view', tags: ['jet', 'hard'], comments: [], image: 'https://images.unsplash.com/photo-1524253488124-191b9a1cc0a2' },
        ],
        done: [
            { id: 4, title: 'SpreadSheet NodeJS', tags: ['easy'], comments: [], image: 'https://images.unsplash.com/photo-1542705825-528c5a38b8e1' },
        ]
    }
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
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
                    ? { ...task, comments: [...(task.comments || []), comment] }
                    : task
            );
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [commentColumn]: updatedTasks
                }
            };
        case ADD_NEW_STATUS: {
            const { status, title, tags, image } = action.payload.newStatus;
            console.log("tags", tags)
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [status]: [
                        { id: state.tasks?.length + 1, title, tags, comments: [], image }
                    ]
                }
            };
        }
        case ADD_NEW_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.status]: [
                        ...state.tasks[action.payload.status],
                        action.payload
                    ]
                }
            };

        default:
            return state;
    }
};

export default taskReducer;
