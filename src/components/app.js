import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilterPanel from './filter-panel';
import GridPanel from './grid-panel';
import DetailsPanel from './details-panel';
import Popup from 'react-popup';
import selectTrip from '../actions/select-trip.action';
import saveTrip from '../actions/save-trip.action';

class App extends Component {
  constructor() {
    super();
    this.onPopup = this.onPopup.bind(this);
  }
  checkForReminders() {
    Popup.alert('reminder here about your trip!');
  }
  onPopup() {
    Popup.create({
    title: null,
    content: 'This popup uses the create method directly to get more control. This popup demonstrates custom buttons.',
    buttons: {
        left: [{
            text: 'Cancel',
            className: 'danger',
            action: function () {
                Popup.alert('You pressed the Cancel btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }],
        right: [{
            text: 'Alt',
            action: function () {
                Popup.alert('You pressed the Alt btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }, {
            text: 'Save',
            className: 'success',
            action: function () {
                Popup.alert('You pressed the Save btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }]
    }
});
  }
  componentDidMount() {
    // check for reminders immediately when app mounts to the DOM
    this.checkForReminders();
    // call the checkForReminders method every minute after app mounts
    this.interval = setInterval(this.checkForReminders, 60000);
  }
  componentWillUnmount() {
    // stop the recurring calls to checkForReminders when app leaves the dom
    clearInterval(this.interval);
  }
  render() {
    return (

      <div className="app">
        <FilterPanel />
        <GridPanel />
        <DetailsPanel />
        <Popup className="popup" />
        <button type="button" onClick={this.onPopup}>popup</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const remind = state.savedTrips.filter( trip => trip.isReminderOn );
  console.log('remind', remind);
  return { remind };
}

function mapDispatchToProps(dispatch) {
  const actions = { selectTrip, saveTrip };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
