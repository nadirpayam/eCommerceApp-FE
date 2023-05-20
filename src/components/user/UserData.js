import axios from "axios";
import React, { useState } from "react";

const UserData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("tokenKey");
  const id = localStorage.getItem("currentUser");

  const handleOffer = (event, product) => {
    event.preventDefault();
    const newPrice = event.target.elements.offerInput.value;
    fetch(`/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        surname,
        username,
        password
      }),
    })
      
      .catch((err) => {
        console.log(err);
      });
    event.target.elements.offerInput.value = "";
  };



  return (
    <div className="container cont1">
    <div className="card card1">
      <div className="card-body body1">
        <h5 className="card-title title1">Güncel Bilgilerinizi Girin</h5>
        <form >
          <label className="lab lab1">
            Ad
            <input
              className="form-control input1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="lab lab1">
            Soyad
            <input
              className="form-control input1"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label className="lab lab1">
            Email
            <input
              className="form-control input1"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="lab lab1">
            Username
            <input
              className="form-control input1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="lab lab1">
            Password
            <input
              className="form-control input1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        
        
        
          
        
          <button type="submit" className="btn btn-success buttonum">
            Bilgilerimi Kaydet
          </button>
        </form>
      </div>
    </div>
  </div>
    
  )
}

export default UserData;