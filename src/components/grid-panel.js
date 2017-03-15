import React, { Component } from 'react';
import { connect } from 'react-redux';

class GridPanel extends Component {
  constructor() {
    super();
    this.generateTableRows = this.generateTableRows.bind(this);
  }
  generateTableRows() {
    const savedTripsRows = this.props.savedTrips.map( trip => {
      return (
        <tr key={trip.title}>
          <td>{trip.title}</td>
          <td>{trip.destination}</td>
          <td>{trip.description}</td>
          <td>{trip.category}</td>
        </tr>
      )
    });
    return savedTripsRows;
  }
  render() {
    return (
      <div className="grid-panel">
        <h2>Grid Panel</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Destination</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{this.generateTableRows()}</tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    savedTrips: state.savedTrips,
    selectedTrip: state.selectedTrip
   };
}

export default connect(mapStateToProps)(GridPanel);
