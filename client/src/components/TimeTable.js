import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getAppointmentCards} from "../actions/appointmentActions";


class TimeTable extends Component {
  componentDidMount() {
    console.log("TimeTable did mount");
    this.props.getAppointmentCards();
  }

  

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getAppointmnetCards: PropTypes.func.isRequired,
    cards: PropTypes.object.isRequired,
  };


  render() {
      console.log("CALENDAR STUFF")
      var year = new Date().getFullYear();
    console.log(year);
    var month = new Date().getMonth();
    console.log(month);
    var days = new Date(year, month + 1, 0).getDate();
    console.log(days);
    var weekday = new Date(year, month, 27);
    console.log(weekday.getDay());
    console.log(new Date(year, month, 1));



    return (
      <div>
       Hello
      </div>
    );
  }
}

TimeTable.propTypes = {
 
};

const mapStateToProps = (state) => ({
    cards: state.cards,
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps, { getAppointmentCards })(TimeTable);
