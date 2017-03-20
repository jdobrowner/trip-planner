import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar, DateTimePicker } from 'react-widgets';
import Moment from 'moment';
var momentLocalizer = require('react-widgets/lib/localizers/moment');
momentLocalizer(Moment);

import saveTrip from '../actions/save-trip.action';
import updateTrip from '../actions/update-trip.action';
import selectTrip from '../actions/select-trip.action';
import deleteTrip from '../actions/delete-trip.action';
import TodoList from './todo-list.js';

class DetailsPanel extends Component {
  constructor() {
    super();
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.setTripDuration = this.setTripDuration.bind(this);
    this.onReminderDateChange = this.onReminderDateChange.bind(this);
    this.onReminderCheckboxChange = this.onReminderCheckboxChange.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.cancelTrip = this.cancelTrip.bind(this);
    this.deleteTrip = this.deleteTrip.bind(this);
  }
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onDestinationChange(event) {
    this.setState({ destination: event.target.value });
  }
  onDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  onCategoryChange(event) {
    this.setState({ category: event.target.value });
  }
  onStartDateChange(value) {
    this.setState({ startDate: value });
    this.setTripDuration(value, this.state.endDate);
  }
  onEndDateChange(value) {
    this.setState({ endDate: value });
    this.setTripDuration(this.state.startDate, value);
  }
  setTripDuration(startDay, endDay) {
    if (startDay && endDay) {
      const tripLengthMil = endDay.getTime() - startDay.getTime();
      let tripLengthDays = Math.ceil(tripLengthMil / (1000 * 60 * 60 * 24 ));
      // if (tripLengthDays > 1) tripLengthDays += ' days';
      // else tripLengthDays += ' day';
      this.setState({ duration: tripLengthDays });
    }
  }
  onReminderDateChange(value) {
    this.setState({ reminderDate: value });
  }
  onReminderCheckboxChange(event) {
    console.log('reminder input event', event)
    this.setState({ isReminderOn: !this.state.isReminderOn });
  }
  updateTodos(todos) {
    this.setState({ todos });
  }
  saveTrip(event) {
    event.preventDefault();
    const trip = { ...this.state };

    if (trip.isReminderOn && !trip.reminderDate) {
      alert('Please pick a reminder date and time.');
    }
    else {
      // if the trip already exists
      if (this.props.selectedTrip.ID) this.props.updateTrip(trip);

      // if it is a new trip
      else this.props.saveTrip(trip);

      // reset the currently selected trip
      this.props.selectTrip(trip);
    }
  }
  cancelButton() {
    if (this.props.selectedTrip.ID) return <button type="button" onClick={this.cancelTrip}>Cancel</button>
  }
  cancelTrip() {
    this.setTripState({ ...this.props.selectedTrip });
  }
  deleteTrip() {
    const tripID = this.state.ID;
    this.props.deleteTrip(tripID);
    this.props.selectTrip({});
  }
  setTripState(trip) {
    this.setState({
      ID: trip.ID || new Date().getTime(),
      title: trip.title || '',
      destination: trip.destination || '',
      description: trip.description || '',
      category: trip.category || 'none',
      todos: trip.todos || [],
      startDate: trip.startDate ? new Date(trip.startDate) : null,
      endDate: trip.endDate ? new Date(trip.endDate) : null,
      duration: trip.duration || 'No Dates',
      reminderDate: trip.reminderDate ? new Date(trip.reminderDate) : null,
      isReminderOn: trip.isReminderOn || false
    });
  }
  componentWillMount() {
    this.setTripState({ ...this.props.selectedTrip });
  }
  componentWillReceiveProps(nextProps) {
    this.setTripState({ ...nextProps.selectedTrip });
  }
  render() {
    return (
      <div className="details-panel">

        <form onSubmit={this.saveTrip}>
          <div className="form-div">
            <label>Trip Title<br/>
              <input type="text" value={this.state.title} onChange={this.onTitleChange} autoFocus="autofocus" />
            </label>
          </div>

          <div className="form-div">
            <label>Destination<br/>
              <input type="text" value={this.state.destination} onChange={this.onDestinationChange} />
            </label>
          </div>

          <div className="form-div">
            <label>Description<br/>
              <textarea value={this.state.description} onChange={this.onDescriptionChange} />
            </label>
          </div>

          <div className="form-div">
            <label>Category<br/>
              <select value={this.state.category} onChange={this.onCategoryChange}>
                <option value="None">None</option>
                <option value="Vacation">Vacation</option>
                <option value="Business">Business</option>
              </select>
            </label>
          </div>

          <div className="form-div">
            <label>Start Date<br/>
              <DateTimePicker time={false} min={new Date()} value={this.state.startDate}
                onChange={ this.onStartDateChange }/>
            </label>
          </div>

          <div className="form-div">
            <label>End Date<br/>
              <DateTimePicker time={false} min={this.state.startDate || new Date()}
                value={this.state.endDate} onChange={ this.onEndDateChange }/>
            </label>
          </div>

          <div className="form-div">
            <label>Set Reminder<input type="checkbox" checked={this.state.isReminderOn} onChange={this.onReminderCheckboxChange} /></label>
              <DateTimePicker min={new Date()} value={this.state.reminderDate} onChange={ this.onReminderDateChange }/>
          </div>

          <TodoList updateTodos={this.updateTodos} todos={this.state.todos} tripID={this.state.ID}/>

          <div className="buttons form-div">
            <button type="submit">Save</button>
            { this.cancelButton() }
            <button type="button" onClick={this.deleteTrip}>Delete</button>
          </div>

        </form>


      </div>
    )
  }
}


function mapStateToProps(state) {
  const props = {
    savedTrips: state.savedTrips,
    selectedTrip: state.selectedTrip
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    saveTrip,
    updateTrip,
    selectTrip,
    deleteTrip
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);
