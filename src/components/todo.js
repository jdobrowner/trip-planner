import React, { Component } from 'react';

class Todo extends Component {
  constructor() {
    super();
    this.onThingToDoChange = this.onThingToDoChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }
  onThingToDoChange(event) {
    this.setState({ thingToDo: event.target.value });
    this.props.updateTodo({ ...this.state, thingToDo: event.target.value }, this.props.index);
  }
  onCheckboxChange() {
    this.props.updateTodo({ ...this.state, isDone: !this.state.isDone }, this.props.index);
    this.setState({ isDone: !this.state.isDone });
  }
  componentWillMount() {
    this.setState({ thingToDo: this.props.thingToDo, isDone: this.props.isDone});
  }
  render() {
    return (
      <div className="todo">
        <label>
          <input type="checkbox" className="todo-checkbox" checked={this.state.isDone} onChange={this.onCheckboxChange} />
          <input type="text" className="todo-text" value={this.state.thingToDo} onChange={this.onThingToDoChange} />
        </label>
        <button type="button" className="todo-delete"
          onClick={()=>this.props.deleteTodo(this.props.index)}>x</button>
      </div>


    )
  }
}

export default Todo;
