import React, { Component } from "react"
import TodoList from "./TodoList"

export default class TodoApp extends Component {

    constructor(props){
        super(props)
        this.state = {
            todoList: [{
                    id: 1,
                    content: "Add a README file.",
                    checked: true
                },
                {
                    id: 2,
                    content: "Add a documentation.",
                    checked: false
                },
                {
                    id: 3,
                    content: "Update the dependencies.",
                    checked: true
                }]
        }
    }

    componentDidMount(){
        this.sorteList()
    }

    onCheck = (id) => {
        this.setState({ 
            todoList: this.state.todoList.map((todoItem) => {
                if(todoItem.id === id)
                    todoItem.checked = !todoItem.checked
                
                return todoItem
            })
        }, () => this.sorteList())
    }

    onDelete = (id) => {
        this.setState({
            todoList: this.state.todoList.filter( todoItem =>  todoItem.id !== id )  
        })
    }

    addItem = (e) => {
        console.log(e.target);
        
        let newItem_content = e.target.parentElement.firstElementChild.value

        if (newItem_content !== "" && newItem_content !== undefined ){
            this.setState({
                todoList: [...this.state.todoList, {
                    id: this.state.todoList.length + 1 ,
                    content: newItem_content,
                    checked: false
                }]
            }, () => this.sorteList())
        }        
    }

    sorteList = () =>{
        this.setState({
            todoList: [...this.state.todoList.filter(item => !item.checked), ...this.state.todoList.filter(item => item.checked)]
        })
    }

    render(){
        return (
            <div className="container">
                <div className="header">
                    <h1>The-Todo-App</h1>
                    <div className="input">
                        <input type="text" name="add-todo" id="add-todo" className="add-todo" placeholder="Add a todo"/>
                        <button onClick={this.addItem} className="add-btn fa fa-plus"></button>
                    </div>
                </div>
                <div className="main">
                    <TodoList onCheck={this.onCheck} onDelete={this.onDelete} todolist={this.state.todoList} />
                </div>
                <div className="footer"></div>
            </div>
        )
    }
}