import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AddProduct from './components/admin/AddProduct';
import Product from './components/Home/Product';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import UserData from './components/user/UserData';
import Sepet from './components/user/Sepet';
import A from './components/Auth/A';
import Nav from './components/nav/Nav';
import Nav2 from './components/nav/Nav2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   {localStorage.getItem("currentUser") == 18 ? <Nav2/> : <Nav/>}
  <Routes>
    <Route path="/" element={<Product />}>       </Route>
    <Route path="/addproduct" element={<AddProduct />}></Route>
    <Route path="/giris" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/userdata" element={<UserData />}></Route>
    <Route path="/sepet" element={<Sepet />}></Route>
  </Routes>
</BrowserRouter>
);



