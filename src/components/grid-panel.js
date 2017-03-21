import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectTrip from '../actions/select-trip.action';

class GridPanel extends Component {
  constructor() {
    super();
    this.generateTableRows = this.generateTableRows.bind(this);
    this.getPlanningState = this.getPlanningState.bind(this);
  }
  generateTableRows() {
    // filteredTrips returns an array of saved trip that pass the filter keyword
    const filteredTrips = this.props.savedTrips.filter( trip => {
      let passThrough = true;

      // if category filter is set, check each trip's category
      if (this.props.filter.category === 'Vacation') {
        passThrough = trip.category === 'Vacation';
      }
      if (this.props.filter.category === 'Business') {
        passThrough = trip.category === 'Business';
      }
      // if the trip is not of the same category as the filter, move on to next trip
      if (!passThrough) return false;

      const keyword = this.props.filter.keyword.toLowerCase();

      const todoFilterPass = trip.todos.reduce((pass, todo) => {
        return pass || todo.thingToDo.toLowerCase().includes(keyword);
      }, false);

      // if the filter keyword exists within the todo list, title, or destination
      // add the trip to the filtered list by returning true
      return todoFilterPass || trip.title.toLowerCase().includes(keyword) || trip.destination.toLowerCase().includes(keyword);
    });

    // filteredTripsRows returns an array of html table rows of the filtered Trips
    // and also counts the number to be displayed in the 'Items Needed' cell for each row
    const filteredTripsRows = filteredTrips.map( (trip, i) => {
      // count the todos that are unchecked
      const thingsToDo = trip.todos.reduce((sum, todo) => {
        if (!todo.isDone) return sum + 1;
        else return sum;
      }, 0);

      return (
        <tr key={trip.ID}
          className={ i%2 === 0 ? '' : 'odd-row' }
          onClick={ () => { this.props.selectTrip({...trip}); }}>
          <td className="wide-cell">{trip.title}</td>
          <td className="wide-cell">{trip.destination}</td>
          <td className="narrow-cell">{trip.duration}</td>
          <td className="medium-cell">{trip.category}</td>
          <td className="narrow-cell">{trip.isReminderOn ? <i className="fa fa-check" onClick={this.props.previousSlide} aria-hidden="true"></i> : null }</td>
          <td className="medium-cell">{this.getPlanningState(trip, thingsToDo)}</td>
          <td className="narrow-cell last-cell">{thingsToDo}</td>
        </tr>
      )
    });
    return filteredTripsRows;
  }
  getPlanningState(trip, thingsToDo) {
    if (!thingsToDo) return 'Ready';
    else if (thingsToDo === trip.todos.length) return 'Created';
    else return 'In Progress';
  }
  render() {
    return (
      <div className="grid-panel">
        <table>
          <thead>
            <tr className="odd-row">

              <th className="wide-cell">Trip Title</th>
              <th className="wide-cell">Destination</th>
              <th className="narrow-cell">Duration</th>
              <th className="medium-cell">Category</th>
              <th className="narrow-cell">Reminder Set</th>
              <th className="medium-cell">Planning State</th>
              <th className="narrow-cell last-cell">Items Needed</th>

            </tr>
          </thead>
          <tbody>{this.generateTableRows()}</tbody>
        </table>
      </div>
    )
  }
}

// Map the local props to chosen parts of the global state.
// Global state.savedTrips will be refered to as this.props.savedTrips in GridPanel(read only)
function mapStateToProps(state) {
  return {
    filter: state.filter,
    savedTrips: state.savedTrips,
    selectedTrip: state.selectedTrip
   };
}

// Map action creators to this.props
// Calling this.props.selectTrip(trip) will dispatch an action that will update the global state
function mapDispatchToProps(dispatch) {
  const actions = { selectTrip };
  return bindActionCreators(actions, dispatch);
}

// Connect the GridPanel to global state and imported action creators
export default connect(mapStateToProps, mapDispatchToProps)(GridPanel);
