import { dataTypes } from "./dataTypes";
import { actionTypes } from "./actionTypes";

export const addTodo = (todo) => {
    return {
        dataType: dataTypes.TODO,
        type: actionTypes.ADD,
        payload: todo
    }
}

export const deleteTodo = (todoId) => {
    return {
        dataType: dataTypes.TODO,
        type: actionTypes.DELETE,
        payload: todoId
    }
}

export const sorteTodo = () => {
    return {
        dataType: dataTypes.TODO,
        type: actionTypes.SORTE,
        payload: null
    }
}

export const checkTodo = (todoId) => {
    return {
        dataType: dataTypes.TODO,
        type: actionTypes.CHECK,
        payload: todoId
    }
}