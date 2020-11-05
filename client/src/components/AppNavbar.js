import React, { Fragment, Component } from "react";
//import {Navbar} from 'react-bootstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { HashLink, NavHashLink } from "react-router-hash-link";
import "./AppNavBar.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import styled from "styled-components";
import tw from "twin.macro";
const ContainerCustom = styled.div`
  ${tw`fixed -mx-8 -mb-12 -mt-8`};
  z-index: 5;
  width: 100%;
  margin-right: -50rem;
  color: rgb(82, 82, 80);
`;

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <NavLink>
          <HashLink className="customHashLink" smooth to={`${this.props.location.pathname}#newsSlider`}>
            News
          </HashLink>
        </NavLink>
        <NavLink>
          <HashLink className="customHashLink" smooth to={`${this.props.location.pathname}#activities`}>
            Aktivitäten
          </HashLink>
        </NavLink>
        <NavLink>
          <HashLink className="customHashLink" smooth to={`${this.props.location.pathname}#cardSlider`}>
            Rudertage
          </HashLink>
        </NavLink>
        <NavLink>
          <HashLink className="customHashLink" smooth to={`${this.props.location.pathname}#gallerySlider`}>
            Gallery
          </HashLink>
        </NavLink>
        <NavLink>
          <HashLink className="customHashLink" smooth to={`${this.props.location.pathname}#contacts`}>
            Kontakt
          </HashLink>
        </NavLink>
        <NavItem style={{alignSelf: "flex-end"}}>
          <LoginModal />
        </NavItem>
      </div>
    );

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>
              {user ? `Welcome ${user.name || user.user.name}` : ""}
            </strong>
          </span>
        </NavItem>
        <NavLink href="/admin">Admin</NavLink>
        <NavLink href="/time_table">Rudertage</NavLink>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            My Profile
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Logout />
            </DropdownItem>
            <DropdownItem>Edit profile</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );

    return (
      <ContainerCustom id="stickyContainer" className="stickyContainer">
        <Navbar
          style={{ backgroundColor: "rgba(215, 231, 245, 0.7)" }}
          fixed="false"
          expand="sm"
          className="mb-5"
        >
          <NavbarBrand href="/">TRV</NavbarBrand>
          <NavbarToggler
            style={{ color: "rgb(82,82,80)" }}
            onClick={this.toggle}
          >
            <i className="material-icons">menu</i>
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar >
            <Nav className="ml-auto"  style={{marginLeft: "0"}} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </ContainerCustom>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
