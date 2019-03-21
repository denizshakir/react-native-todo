import { createStore } from 'redux';
import { TASK_ACTION_TYPES, TASK_STATUS } from './constants/taskActionTypes';

const defaultTodos = [
    {
        task: 'Initial todo in store',
        state: TASK_STATUS.PENDING
    }
]

const defaultState = {
    todos: defaultTodos,
    allTodos: defaultTodos,
    filter: TASK_STATUS.PENDING
};

function addTodo(state, task) {
    const newTodo = { task, state: TASK_STATUS.PENDING};
    const newAllTodos = state.allTodos.concat(newTodo);
    const newTodos = newAllTodos.filter(t => t.state === state.filter);

    return Object.assign({}, state, { todos: newTodos, allTodos: newAllTodos });
}

function doneTodo(state, task) {
    const updatedAllTodos = state.allTodos.map(t => {
        return t.task === task ? { ...t, state: TASK_STATUS.DONE } : t;
    });
    const updatedTodos = updatedAllTodos.filter(t => t.state === state.filter);

    return { ...state, todos: updatedTodos, allTodos: updatedAllTodos };
}

function toggleFilter(state) {
    const newFilter = state.filter === TASK_STATUS.PENDING ? TASK_STATUS.DONE : TASK_STATUS.PENDING;
    const newTodos = state.allTodos.filter(todo => todo.state === newFilter);
    return { ...state, todos: newTodos, filter: newFilter };
}

function todoStore(state = defaultState, action) {
    switch (action.type) {
        case TASK_ACTION_TYPES.ADD_TODO:
            return addTodo(state, action.task);
        case TASK_ACTION_TYPES.DONE_TODO:
            return doneTodo(state, action.task);
        case TASK_ACTION_TYPES.TOGGLE_STATE:
            return toggleFilter(state);
        default:
            return state;
    }
}

export default createStore(todoStore);