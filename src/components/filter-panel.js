import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class FilterPanel extends Component {
  constructor() {
    super();
    this.state = { keyword: '', category: 'none' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.filterGrid = this.filterGrid.bind(this);
    this.onNewTripClicked = this.onNewTripClicked.bind(this);
  }
  onTextChange(event) {
    this.setState({ keyword: event.target.value });
  }
  onCategoryChange(event) {
    this.setState({ category: event.target.value });
  }
  onNewTripClicked() {
    console.log('new trip created');
    browserHistory.push('/details');
  }
  filterGrid(event) {
    event.preventDefault();
    console.log(this.state.keyword);
    console.log(this.state.category);
  }
  render() {
    return (
      <div className="filter-panel">

        <h2>Filter Panel</h2>

        <form onSubmit={this.filterGrid}>
          <label>Filter by Keyword
            <input type="text" value={this.state.keyword} onChange={this.onTextChange} placeholder="Thailand" />
          </label>
          <button type="submit">Go</button>
          <label>Category
            <select value={this.state.category} onChange={this.onCategoryChange}>
              <option value="none">None</option>
              <option value="vacation">Vacation</option>
              <option value="business">Business</option>
            </select>
          </label>
        </form>

        <button onClick={this.onNewTripClicked}>New Trip</button>

      </div>
    )
  }
}

export default FilterPanel;
