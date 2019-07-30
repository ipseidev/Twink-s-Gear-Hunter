import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";

class Items extends Component {
  state = {
    auctions: [{ auctions: [] }]
  };

  componentDidMount() {
    try {
      axios
        .get("../api/scanner/get/all")
        .then(response => {
          this.setState({ auctions: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let currentAuction = this.state.auctions[0].auctions.map(auction => {
      console.log(auction);
      return (
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="https://cdn.arstechnica.net/wp-content/uploads/2014/12/wowgold-640x481.png" />
              <span class="card-title">Id de l'item : {auction.item}</span>
            </div>
            <div class="card-content">
              <p>Serveur : {auction.ownerRealm}</p>
              <p>Vendeur : {auction.owner}</p>
              <p>Temps restant : {auction.timeLeft}</p>
              <p>Ilvl : 28</p>
            </div>
            <div class="card-action">
              <a href="#">Disponible..</a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div style={{ minHeight: "75vh" }} className="container">
        <div className="row" style={{ width: "100%" }}>
          <div className="landing-copy col s12 center-align">
            <h4>
              <p className="flow-text grey-text text-darken-1">
                Enchères en <b>cours..</b>
              </p>
            </h4>
          </div>
        </div>
        <div class="row">{currentAuction}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Items);