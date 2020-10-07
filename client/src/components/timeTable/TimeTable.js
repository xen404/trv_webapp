import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import { getAppointmentCards } from "../../actions/appointmentActions";
import AddNewCardModal from "./AddNewCardModal";
import EditCardModal from "./EditCardModal";

class TimeTable extends Component {
  componentDidMount() {
    console.log("TimeTable did mount");
    this.props.getAppointmentCards();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getAppointmnetCards: PropTypes.func.isRequired,
    appointments: PropTypes.object.isRequired,
  };

  render() {
    return this.renderCards();
  }

  renderCards() {
    if (this.props.appointments) {
      const cardsInput = this.props.appointments.cards;
      console.log("CARD EXAMPLE");
      console.log(cardsInput);

      return (
        <div
          className="cardsContainer"
          style={{
            marginTop: "70px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {cardsInput.map((card, index) => {
            const formatDate = new Date(card.date);
            const year = formatDate.getFullYear();
            const month = formatDate.getMonth();
            const date = formatDate.getDate();
            var day = formatDate.getDay();
            switch (day) {
              case 1:
                 day = "Montag";
                 break;
              case 3:
                 day = "Mittwoch";
                 break;
              case 6:
                 day = "Samstag";
                 break;
              default:
                 day = "wtf";
            }

            return (
              <Card
                key={index}
                body
                inverse
                style={{
                  backgroundColor: "#333",
                  borderColor: "#333",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <CardTitle>{day} {date}-{month}-{year}</CardTitle>
                <CardText>{card.name}</CardText>
                {card.name === "tba" ? (
                             <AddNewCardModal cardDate={date} cardMonth={month} cardYear={year} cardDay={day} cardName={card.name} cardDateFormat={card.date}/>

            ) : <EditCardModal cardId={card.id} cardDate={date} cardMonth={month} cardYear={year} cardDay={day} cardName={card.name} cardDateFormat={card.date}/>}
              </Card>
            );
          })}
        </div>
      );
    } else {
      return <div>Fuuuuuucke</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  appointments: state.appointments,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAppointmentCards })(TimeTable);
