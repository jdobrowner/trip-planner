import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import saveTrip from '../actions/save-trip.action';
import deleteTrip from '../actions/delete-trip.action';

class DetailsPanel extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      destination: '',
      description: '',
      category: 'none'
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
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
  saveTrip(event) {
    event.preventDefault();
    const trip = { ...this.state }
    console.log(trip);
    this.props.saveTrip(trip);
  }
  cancelTrip() {
    console.log('trip canceled');
    browserHistory.push('/');
  }
  deleteTrip() {
    const tripTitle = this.state.title;
    this.props.deleteTrip(tripTitle);
    console.log('trip deleted');
    browserHistory.push('/');
  }
  render() {
    return (
      <div className="details-panel">
        <h2>Details Panel</h2>

        <form onSubmit={this.saveTrip}>
          <label>Title
            <input type="text" value={this.state.title} onChange={this.onTitleChange} autoFocus="autofocus" />
          </label>

          <label>Destination
            <input type="text" value={this.state.destination} onChange={this.onDestinationChange} />
          </label>

          <label>Description
            <textarea value={this.state.description} onChange={this.onDescriptionChange} />
          </label>

          <label>Category
            <select value={this.state.category} onChange={this.onCategoryChange}>
              <option value="none">None</option>
              <option value="vacation">Vacation</option>
              <option value="business">Business</option>
            </select>
          </label>

          <button type="submit">Save</button>

        </form>

        <button onClick={this.cancelTrip}>Cancel</button>
        <button onClick={this.deleteTrip}>Delete</button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { selectedTrip: state.selectedTrip };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    saveTrip,
    deleteTrip
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);
