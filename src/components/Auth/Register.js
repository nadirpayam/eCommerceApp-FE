import React, { useState } from "react";
import "./Register.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleName = (value) => {
    setName(value);
  };

  const handleSurname = (value) => {
    setSurname(value);
  };

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleRegister = () => {
    sendRequest("register");
    setName("");
    setSurname("");
    setUsername("");
    setPassword("");
  };

  const sendRequest = (path) => {
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email,
        role: "USER",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("username", username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section class="vh-100" style={{ backgroundColor: "#eee" }}>
      <div class="container h-70">
        <div class="row d-flex justify-content-center align-items-center h-70">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      KAYDOL
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            placeholder="Adınız"
                            onChange={(i) => handleName(i.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            placeholder="Soyadınız"
                            onChange={(i) => handleSurname(i.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            placeholder="Kullanıcı Adınız"
                            onChange={(i) => handleUsername(i.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            placeholder="Emailiniz"
                            onChange={(i) => handleEmail(i.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            placeholder="Şifreniz"
                            onChange={(i) => handlePassword(i.target.value)}
                          />
                        </div>
                      </div>

                      <div class="form-check d-flex justify-content-center mb-5">
                        <label class="form-check-label" for="form2Example3">
                          Hesabın var mı?  <Link to="/giris" className="dtext-white-50 fw-bold">
                        Giriş Yap
                      </Link>
                         
                        </label>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          onClick={handleRegister}
                        >
                          KAYDOL
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
