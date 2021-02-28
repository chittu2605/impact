import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";
import WalletNavItem from "components/Atom/WalletNavItem";
import { apiHandler } from "config/apiConfig";
import SmartMartNavItem from "components/Atom/SmartMartNavItem";
import ADPDetails from "components/Atom/ADPDetails";

import { childLoginAction, childLogoutAction } from "../../redux/actions/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SearchResultsComponent } from "components/Atom/SearchResultsComponent";
import { Button } from "reactstrap";

class Header extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
    searchValue: "",
    searchResults: [],
    showSearchResults: false,
  };
  sidebarToggle = React.createRef();
  searchRef = React.createRef();

  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "white",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  dropdownToggle = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  };

  handleSarch = (e) => {
    const inputValue = e.target.value;
    this.setState({ searchValue: inputValue });
    if (inputValue.length > 2) {
      searchAdp(inputValue).then(({ data }) => {
        if (data.length > 0) {
          this.setState({ showSearchResults: true, searchResults: data });
        } else {
          this.resetSearch();
        }
      });
    } else {
      this.setState({ showSearchResults: false });
    }
  };

  resetSearch = () => {
    this.setState({ showSearchResults: false, searchValue: "" });
  };

  changeSession = (childId) => {
    const childLoginBody = {
      params: {
        childId,
      },
    };
    this.props.childLoginAction(childLoginBody, (res) => {
      if (res.status == 200) {
        this.props.history.push("/adp");
        this.resetSearch();
      }
    });
  };

  logOutChild = () => {
    this.props.childLogoutAction(() => this.props.history.push("/adp"));
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    const { showSearchResults, searchResults, searchValue } = this.state;
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <ADPDetails adpId={this.props.adpId} name={this.props.name} />
          {/* <div>
             <WalletNavItem walletBalance={this.props.walletBalance} /> 
            <SmartMartNavItem />
          </div> */}
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>

          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            {this.props.parentId === "" ? (
              <form>
                <InputGroup className="no-border">
                  <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={this.handleSarch}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_zoom-bold" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {showSearchResults && (
                    <SearchResultsComponent
                      data={searchResults}
                      onSelect={this.changeSession}
                    />
                  )}
                </InputGroup>
              </form>
            ) : (
              <Button color="danger" onClick={this.logOutChild}>EXIT CHILD</Button>
            )}
            <Nav navbar>
              <NavItem>
                <Link to="#pablo" className="nav-link">
                  <i className="now-ui-icons media-2_sound-wave" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons media-1_button-power" />
                  <p>
                    <span className="d-lg-none d-md-block">Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  {/* <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem> */}
                  <DropdownItem
                    tag="button"
                    onClick={() => {
                      logoutApi().then(() => {
                        window.location.href = `${window.location.origin}/adp`;
                      });
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#pablo" className="nav-link">
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adpId: state.updateLoginStatus.adpId,
    name: state.updateLoginStatus.name,
    parentId: state.updateLoginStatus.parentId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    childLoginAction: bindActionCreators(childLoginAction, dispatch),
    childLogoutAction: bindActionCreators(childLogoutAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Header);

function searchAdp(searchTerm) {
  return apiHandler.get(`/search-adp/${searchTerm}`).catch((err) => {
    console.log(err);
  });
}

function logoutApi(body) {
  return apiHandler.post(`/logout`, body).catch((err) => {
    console.log(err);
  });
}
