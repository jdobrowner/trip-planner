import React, { Component } from 'react';
import FilterPanel from './filter-panel';
import GridPanel from './grid-panel';
import DetailsPanel from './details-panel';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="app">
        <FilterPanel />
        <GridPanel />
        <DetailsPanel />
      </div>
    )
  }
}
