import React, { Component } from 'react';
import Todo from './todo.js';

class TodoList extends Component {
  constructor() {
    super();
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }
  addTodo() {
    const todos = [...this.props.todos, {
      thingToDo: '',
      isDone: false
    }];
    this.props.updateTodos( todos );
  }
  updateTodo(todo, index) {
    let todos = this.props.todos;
    todos = [ ...todos.slice(0, index), todo, ...todos.slice(index + 1) ];
    this.props.updateTodos( todos );
  }
  deleteTodo(index) {
    const todos = this.props.todos.slice(0,index).concat(this.props.todos.slice(index+1));
    this.props.updateTodos( todos );
  }
  getTodos() {
    return this.props.todos.map( (todo, i) => {
      return <Todo key={todo.thingToDo + i} thingToDo={todo.thingToDo}
        isDone={todo.isDone} index={i} deleteTodo={this.deleteTodo}
        updateTodo={this.updateTodo}/>
    })
  }
  shouldComponentUpdate(nextProps) {
    // if a todo was added or deleted then rerender the todo list component
    if (nextProps.todos.length !== this.props.todos.length) return true;

    // only rerender todo list if a different trip is selected
    if (nextProps.tripID === this.props.tripID) return false;

    return true;
  }
  render() {
    return (
      <div className="todo-list form-div">
        <label>Todo</label>
        <button type="button" onClick={this.addTodo}>+</button>
        <div className="todos">
          {this.getTodos()}
        </div>
      </div>


    )
  }
}

export default TodoList;
