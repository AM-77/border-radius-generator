import React, { Component } from "react"

export default class TodoItem extends Component {
    render(){
        return (
            <div className={this.props.todo.checked ? "todo-item done" : "todo-item not-yet" }>
                <div className="todo-checked">
                    <input  type="checkbox" name="todo-checked" id="todo-checked" checked={ this.props.todo.checked } onChange={() => this.props.onCheck(this.props.todo.id)}/>
                </div>
                <div className="todo-content">
                    <p>{this.props.todo.content}</p>
                </div>    
                <div className="todo-delete">
                    <button  onClick={() => this.props.onDelete(this.props.todo.id)}><span className="fa fa-trash"></span></button>
                </div>
            </div>
        )
    }
}