import React from "react";

export default function Items(props) {
  console.log(props);
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          <img
            src="https://cdn.arstechnica.net/wp-content/uploads/2014/12/wowgold-640x481.png"
            alt=""
          />
          <span
            className="card-title"
            style={{
              backgroundColor: "grey",
              width: "100%",
              fontSize: "1.2rem"
            }}
          >
            Item Name :
            {props.item === 12987
              ? " Brai des ombres"
              : props.item === 12994
              ? " Gantelet de thorbia"
              : props.item === 2911
              ? " Ceinturon de Keller"
              : props.item === 1121
              ? " Bottes du lynx"
              : props.item === 12977
              ? " Gants poing-de-mage"
              : props.item === 4446
              ? " Lame de venin noir"
              : " error"}
          </span>
        </div>
        <div className="card-content">
          <p>Server : {props.ownerRealm}</p>
          <p>Seller : {props.owner}</p>
          <p>Price : {props.buyout / 10000} POs</p>
          <p>Time left : {props.timeLeft}</p>
          <p>Ilvl : 28</p>
          <p>id item : {props.item} </p>
        </div>
        <div className="card-action">
          <a href="#">Available..</a>
        </div>
      </div>
    </div>
  );
}
