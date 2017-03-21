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
  // adds a todo object in the todos array of the local state of DetailsPanel,
  // called when the add todo button of TodoList is clicked
  addTodo() {
    const todos = [...this.props.todos, {
      thingToDo: '',
      isDone: false
    }];
    this.props.updateTodos( todos );
  }
  // updates a todo object in the todos array of the local state of DetailsPanel,
  // called when a text is changed or checkbox clicked in child Todo
  updateTodo(todo, index) {
    let todos = this.props.todos;
    todos = [ ...todos.slice(0, index), todo, ...todos.slice(index + 1) ];
    this.props.updateTodos( todos );
  }
  // removes a todo object from the todos array of the local state of DetailsPanel,
  // called when a delete button of a child Todo is clicked
  deleteTodo(index) {
    const todos = this.props.todos.slice(0,index).concat(this.props.todos.slice(index+1));
    this.props.updateTodos( todos );
  }
  // for all todo objects in the todos array from the local state of DetailsPanel,
  // create a child Todo
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

    // update TodoList for any other prop change
    return true;
  }
  render() {
    return (
      <div className="todo-list form-div">
        <label>Todo</label>
        <button type="button" className="todo-button" onClick={this.addTodo}>+</button>
        <div className="todos">
          {this.getTodos()}
        </div>
      </div>
    )
  }
}

export default TodoList;
