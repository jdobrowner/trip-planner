import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

// action creators
import selectTrip from '../actions/select-trip.action';
import filterTrips from '../actions/filter-trips.action';


class FilterPanel extends Component {
  constructor() {
    super();
    // default state of Filter Panel
    this.state = { keyword: '', category: 'None' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.filterGrid = this.filterGrid.bind(this);
    this.onNewTripClicked = this.onNewTripClicked.bind(this);
  }
  onTextChange(event) {
    this.setState({ keyword: event.target.value });
  }
  onCategoryChange(option) {
    const category = option.value;
    this.setState({ category });

    // The filter-trips action will effect the trips displayed in GridPanel
    // in this case setting the category filter
    this.props.filterTrips({ ...this.state, category });
  }
  onNewTripClicked() {
    this.props.selectTrip({});
  }
  // Called when the form is submitted by clicking the Go button or hitting enter from the keyword text input
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
              <input className="keyword" type="text" value={this.state.keyword} onChange={this.onTextChange} />
            </label>
            <button className="go" type="submit">Go</button>
          </div>

          <div>
            <label>Category<br/>
              <Select
                value={this.state.category} onChange={this.onCategoryChange}
                searchable={false} clearable={false}
                options={[
                  { value: 'None', label: 'None' },
                  { value: 'Vacation', label: 'Vacation' },
                  { value: 'Business', label: 'Business' },
                ]}
              />
            </label>
          </div>

        </form>

      </div>
    )
  }
}

// Map action creators to this.props
// Calling this.props.filterTrips(filter) will dispatch an action that will update the global state
function mapDispatchToProps(dispatch) {
  const actions = { selectTrip, filterTrips };
  return bindActionCreators(actions, dispatch);
}

// Connect the FilterPanel to imported action creators
export default connect(null, mapDispatchToProps)(FilterPanel);
