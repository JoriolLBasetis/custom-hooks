import { useEffect, useReducer } from "react";
import { todoReducer } from "../useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos') || [])
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const handleNewTodo = (todo) => {
        const action = { type: 'ADD', payload: todo }
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        const action = { type: 'REMOVE', payload: id }
        dispatch(action);
    }
    const handleToogleTodo = (id) => {
        const action = { type: 'TOGGLE', payload: id }
        dispatch(action);
    }
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    return {
        todos,
        todosCount:todos.length,
        todosPendingCount:todos.filter (todo => !todo.done).length,
        handleDeleteTodo,
        handleNewTodo,
        handleToogleTodo
    };
}
