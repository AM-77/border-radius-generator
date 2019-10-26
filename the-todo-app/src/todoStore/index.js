import { createStore } from "redux"
import { modelReducer } from "./modelReducer"

export default createStore(modelReducer)
export { addTodo, deleteTodo, sorteTodo, checkTodo } from "./actionCreators"