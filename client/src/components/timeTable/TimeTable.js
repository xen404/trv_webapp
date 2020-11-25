import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import { getAppointmentCards } from "../../actions/appointmentActions";
import AddNewCardModal from "./AddNewCardModal";
import EditCardModal from "./EditCardModal";
import "./Cards.css";

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
            
          }}
        >
          {cardsInput.map((card, index) => {
            const formatDate = new Date(card.date);
            const year = formatDate.getFullYear();
            const month = formatDate.getMonth();
            const date = formatDate.getDate();
            var day = formatDate.getDay();
            switch (day) {
              case 0:
                    day = "Sonntag";
                    break;
                  case 1:
                    day = "Montag";
                    break;
                  case 2:
                    day = "Dienstag";
                    break;
                  case 3:
                    day = "Mittwoch";
                    break;
                  case 4:
                    day = "Donnerstag";
                    break;
                  case 5:
                    day = "Freitag";
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
                  backgroundColor: "white",
                  borderRadius: "0",
                  borderWidth: "3px",
                  borderColor: "#333",
                  marginRight: "50px",
                  marginBottom: "50px",
                  width: "220px"
                }}
              >
                <div style={{display: "flex", flexDirection: "column", alignContent: "space-between", justifyContent: "space-between"}}>
                  <div>
                <CardTitle style={{color: 'black'}}><b>{day} {date}-{month + 1}-{year}</b><br/>
                      <p><b>18:00</b></p></CardTitle>
                <CardText style={{color: 'black'}}>{card.name}</CardText>
                <CardText style={{fontSize: "12px",color: 'black'}}><i>{card.info}</i></CardText>
                </div>
                
                <div>
                {card.name === "tba" ? (
                             <AddNewCardModal style={{alignSelf: "flex-end"}} cardDate={date} cardMonth={month} cardYear={year} cardDay={day} cardName={card.name} cardDateFormat={card.date}/>

            ) : <EditCardModal style={{alignSelf: "flex-end"}} cardId={card.id} cardDate={date} cardMonth={month} cardYear={year} cardDay={day} cardName={card.name} cardDateFormat={card.date}/>}
            </div>
            </div>
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
