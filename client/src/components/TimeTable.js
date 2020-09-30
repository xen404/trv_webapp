import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class TimeTable extends Component {
  componentDidMount() {
    
  }

  

  static propTypes = {
    isAuthenticated: PropTypes.bool,
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
  users: state.users,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {  })(TimeTable);
