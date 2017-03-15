import React, { Component } from 'react';
import FilterPanel from './filter-panel';
import GridPanel from './grid-panel';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="app">
        <h1>Trip Planner</h1>
        <FilterPanel />
        <GridPanel />

        {/* display the Details Panel only when the route is set to /details (see ../routes.js) */}
        {this.props.children}

      </div>
    )
  }
}
