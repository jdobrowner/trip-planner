import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectTrip from '../actions/select-trip.action';
import filterTrips from '../actions/filter-trips.action';


class FilterPanel extends Component {
  constructor() {
    super();
    this.state = { keyword: '', category: 'None' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.filterGrid = this.filterGrid.bind(this);
    this.onNewTripClicked = this.onNewTripClicked.bind(this);
  }
  onTextChange(event) {
    this.setState({ keyword: event.target.value });
  }
  onCategoryChange(event) {
    const category = event.target.value;
    this.setState({ category });
    this.props.filterTrips({ ...this.state, category });
  }
  onNewTripClicked() {
    this.props.selectTrip({});
  }
  filterGrid(event) {
    event.preventDefault();
    this.props.filterTrips({ ...this.state });
  }
  render() {
    return (
      <div className="filter-panel">

        <div className="logo">
          <h1>Trip Planner</h1>
        </div>

        <button className="new-trip" onClick={this.onNewTripClicked}>New Trip</button>

        <form onSubmit={this.filterGrid}>
          <h2>Filter Your Trips</h2>

          <div>
            <label>Keyword<br/>
              <input className="keyword" type="text" value={this.state.keyword} onChange={this.onTextChange} placeholder="Thailand" />
            </label>
            <button className="go" type="submit">Go</button>
          </div>

          <div>
            <label>Category<br/>
              <select value={this.state.category} onChange={this.onCategoryChange}>
                <option value="None">None</option>
                <option value="Vacation">Vacation</option>
                <option value="Business">Business</option>
              </select>
            </label>
          </div>

        </form>



      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actions = { selectTrip, filterTrips };
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(FilterPanel);
