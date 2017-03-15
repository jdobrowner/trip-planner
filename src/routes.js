import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import DetailsPanel from './components/details-panel';

export default (
  <Route path="/" component={App}>

    {/* display the Details Panel only when the route is set to /details (see ./components/app.js) */}
    <Route path="details" component={DetailsPanel} />
    
  </Route>
);
