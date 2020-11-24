import React, { Component } from "react";
import {
    Popover,
    PopoverHeader,
    PopoverBody,
  } from "reactstrap";

class InfoPopover extends Component {
  state = {
    popoverOpen: false,
  };

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  render() {
    return (
      <>
        <i
          id={"cardPopover-" + this.props.card.id}
          style={{
            cursor: "pointer",
            color: "#1E90FF",
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
          className="material-icons"
        >
          info_outline
        </i>

        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          target={"cardPopover-" + this.props.card.id}
          toggle={this.toggle}
        >
          <PopoverHeader></PopoverHeader>
          <PopoverBody>{this.props.card.info}</PopoverBody>
        </Popover>
      </>
    );
  }
}

export default InfoPopover;
