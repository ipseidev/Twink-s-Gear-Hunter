import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hi,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are connected. What do you want to dp ?
              </p>
            </h4>
            <Link to="/dashboard/auctions">
              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Check sells
              </button>
            </Link>
            <br />
            {/*<Link to="/dashboard/listItems">
              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Gérer mes objets
              </button>
              </Link>*/}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
