import React, { Fragment, Component } from "react";
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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";


class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
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
      <div>
        <Navbar color="dark" dark expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">TRV</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
