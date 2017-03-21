import React, { Component } from 'react';

class Todo extends Component {
  constructor() {
    super();
    this.onThingToDoChange = this.onThingToDoChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }
  // This method is called when text is typed in the todo text input, it update the thingToDo value in this particular
  // todo object in the todos array of the trip state that lives in the local state of datails-panel.js
  onThingToDoChange(event) {
    this.setState({ thingToDo: event.target.value });
    this.props.updateTodo({ ...this.state, thingToDo: event.target.value }, this.props.index);
  }
  // This method is called when the checkbox is clicked, it update the isDone value in this particular
  // todo object in the todos array of the trip state that lives in the local state of datails-panel.js
  onCheckboxChange() {
    this.props.updateTodo({ ...this.state, isDone: !this.state.isDone }, this.props.index);
    this.setState({ isDone: !this.state.isDone });
  }
  // Before the todo mounts to the DOM,
  // map its local state to the props that were passed down from todo-list.js
  componentWillMount() {
    this.setState({ thingToDo: this.props.thingToDo, isDone: this.props.isDone});
  }
  render() {
    return (
      <div className="todo">
        <input type="checkbox" className="todo-checkbox" checked={this.state.isDone} onChange={this.onCheckboxChange} />
        <input type="text" className="todo-text" value={this.state.thingToDo} onChange={this.onThingToDoChange} />
        <button type="button" className="todo-delete"
          onClick={()=>this.props.deleteTodo(this.props.index)}>x</button>
      </div>
    )
  }
}

export default Todo;
