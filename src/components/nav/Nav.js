import React from "react";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Nav.css";
import AddProduct from "../admin/AddProduct";

function Nav() {
  const navigate = useNavigate();

  const onClick = ()=> {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("username")
    navigate(0);
    navigate("/")

  }

  
  
  return (
<nav className="navbar navbar-expand-lg bg-success nav" >
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ul1" style={{display: 'flex', alignItems: 'center',width:"100%",justifyContent:"space-between"}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <li>
      <Link to="/" className="navbar-brand active" href="#" style={{fontSize: '1.7em'}}>Anasayfa</Link>
      </li>
        <li >
          
        </li>
        </div>

        <li >
          {localStorage.getItem("currentUser") != null && <Link to="/sepet" className="nav-link" style={{fontSize: '1.7em'}}>Sepete Git</Link>  
          
          }
        </li>
        <li >
          {localStorage.getItem("currentUser") != null && <Link to="/userdata" className="nav-link" style={{fontSize: '1.7em'}}>Bilgilerimi Güncelle</Link>  
          
          }
        </li>
        <li >
          {localStorage.getItem("currentUser") == null ? <Link to="/login" className="nav-link" style={{fontSize: '1.7em'}}> Giriş Yap</Link>  :
          <div>
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit" onClick={onClick}>Çıkış Yap</button>          
          </div>
          }
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
}
export default Nav;