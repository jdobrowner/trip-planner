import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilterPanel from './filter-panel';
import GridPanel from './grid-panel';
import DetailsPanel from './details-panel';
import Modal from 'react-modal';
import selectTrip from '../actions/select-trip.action';
import updateTrip from '../actions/update-trip.action';

class App extends Component {
  constructor() {
    super();
    this.state = {
      remindQ: [],
      modalIsOpen: false,
      modalTrip: {},
      snoozeDuration: 'hour'
    }
    this.checkForReminders = this.checkForReminders.bind(this);
    this.showReminder = this.showReminder.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDisplayTripClicked = this.onDisplayTripClicked.bind(this);
    this.onSnoozeClicked = this.onSnoozeClicked.bind(this);
    this.onSnoozeChange = this.onSnoozeChange.bind(this);
  }
  checkForReminders() {
    const now = new Date().getTime();
    const remindQ = this.props.remind.filter( trip => {
      return new Date(trip.reminderDate).getTime() < now;
    });
    this.setState({ remindQ });
    if (remindQ[0]) this.showReminder(remindQ[0]);
  }
  showReminder(trip) {
    this.setState({modalIsOpen: true, modalTrip: trip});
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({modalIsOpen: false});
    let remindQ = [...this.state.remindQ];
    remindQ.shift();
    this.setState({ remindQ });
    if (remindQ[0]) this.showReminder(remindQ[0]);
  }
  onDisplayTripClicked(event) {
    event.preventDefault();
    this.props.selectTrip(this.state.modalTrip);
    this.closeModal();
  }
  onSnoozeClicked(event) {
    event.preventDefault();
    const trip = this.state.modalTrip
    let snooze = this.state.snoozeDuration;
    if (snooze === 'hour') snooze = 1000*60*60 // one hour in miliseconds
    else if (snooze === 'day') snooze = 1000*60*60*24 // one day in milliseconds
    else snooze = 1000*60*60*24*7 // one week in milliseconds
    const updatedTrip = { ...trip, reminderDate: new Date(new Date(trip.reminderDate).getTime() + snooze)};
    this.props.updateTrip(updatedTrip);
    //
    if (this.props.selectedTrip.ID === trip.ID) {
      this.props.selectTrip(updatedTrip);
    }
    this.closeModal();
  }
  onSnoozeChange(event) {
    const snoozeDuration = event.target.value;
    this.setState({ snoozeDuration });
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
    const modalStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (

      <div className="app">
        <FilterPanel />
        <GridPanel />
        <DetailsPanel />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >

          <h2 ref="subtitle">Reminder for {this.state.modalTrip.title}</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <button onClick={this.onDisplayTripClicked}>Display Trip</button>
            <button onClick={this.onSnoozeClicked}>Snooze</button>
            <select value={this.state.snoozeDuration} onChange={this.onSnoozeChange}>
              <option value="hour">1 Hour</option>
              <option value="day">1 Day</option>
              <option value="week">1 Week</option>
            </select>
          </form>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const remind = state.savedTrips.filter( trip => trip.isReminderOn ) || [];
  const props = { selectedTrip: state.selectedTrip, remind };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = { selectTrip, updateTrip };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
