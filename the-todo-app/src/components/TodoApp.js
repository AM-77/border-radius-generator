import React, { Component } from "react"
import TodoList from "./TodoList"
import { connect } from "react-redux"
import { addTodo, deleteTodo, sorteTodo, checkTodo } from "./../todoStore"

import dataStore from "./../todoStore"

const mapStateToProps = (todoStore) => ({
    todoList: todoStore.todo
})

const mapDispatchToProps = {
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    sorteTodo: sorteTodo,
    checkTodo: checkTodo
}

const connectStore = connect(mapStateToProps, mapDispatchToProps);

const TodoApp = connectStore(class extends Component {

    componentDidMount() {
        this.props.sorteTodo()
    }

    onCheck = (id) => {
        this.props.checkTodo(id)
        this.props.sorteTodo()
    }

    onDelete = (id) => {
        this.props.deleteTodo(id)
    }

    addItem = () => {
        let newItem_content = document.querySelector("input.add-todo").value
        if (newItem_content !== "" && newItem_content !== undefined) {
            this.props.addTodo({
                id: new Date().getTime(),
                content: newItem_content,
                checked: false
            })

            this.props.sorteTodo()

            document.querySelector("input.add-todo").value = null
        }

    }

    onTyping = (e) => {
        if (e.keyCode === 13)
            this.addItem()
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>The-Todo-App</h1>
                    <div className="input">
                        <input onKeyDown={this.onTyping} type="text" name="add-todo" id="add-todo" className="add-todo" placeholder="Add a todo" />
                        <button onClick={this.addItem} className="add-btn fa fa-plus"></button>
                    </div>
                </div>
                <div className="main">
                    <TodoList onCheck={this.onCheck} onDelete={this.onDelete} todolist={this.props.todoList} />
                </div>
                <div className="footer"></div>
            </div>
        )
    }
})

export default TodoApp