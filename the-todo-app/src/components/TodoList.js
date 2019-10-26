import React, { Component } from "react"
import TodoItem from "./TodoItem"

export default class TodoList extends Component {

    render(){
        return this.props.todolist.map(todoItem => <TodoItem onCheck={this.props.onCheck} onDelete={this.props.onDelete} todo={todoItem} key={todoItem.id} /> )
    }
}