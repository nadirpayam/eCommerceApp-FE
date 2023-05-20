import React, { useEffect, useState } from "react";
import { RefreshToken } from "../services/HttpService";
import "./Product.css";
import { useNavigate, Link } from "react-router-dom";
import Confetti from 'react-confetti';


function Product() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("tokenKey");
  const [countdown, setCountdown] = useState(10);
  const [timer, setTimer] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [clicked, setClicked] = useState(false);

 

  const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKEy");
    localStorage.removeItem("username");
    navigate(0);
    navigate("/");
  };

  useEffect(() => {
    const url = "/products";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          setProduct(json);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  const handleOffer = (event, product) => {
    event.preventDefault();
    const newPrice = event.target.elements.offerInput.value;
    fetch(`/products/${product.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        price: parseFloat(newPrice),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          RefreshToken()
            .then((res) => {
              if (!res.ok) {
                logout();
              } else {
                return res.json();
              }
            })

            .then((data) => {
              console.log(data); // updated product object returned by the API
              if (data != undefined) {
                localStorage.setItem("tokenKey", data.accessToken);
                handleOffer();
                setProduct((prevState) => {
                  const updatedProductIndex = prevState.findIndex(
                    (p) => p.productId === product.productId
                  );
                  const updatedProducts = [...prevState];
                  updatedProducts[updatedProductIndex] = data;
                  return updatedProducts;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    event.target.elements.offerInput.value = "";
  };

  const handleOffer2 = (event, product) => {
    event.preventDefault();
    fetch(`/products/${product.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        sold: true,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          RefreshToken()
            .then((res) => {
              if (!res.ok) {
                logout();
              } else {
                return res.json();
              }
            })

            .then((data) => {
              console.log(data); // updated product object returned by the API
              if (data != undefined) {
                localStorage.setItem("tokenKey", data.accessToken);
                handleOffer2();
                setProduct((prevState) => {
                  const updatedProductIndex = prevState.findIndex(
                    (p) => p.productId === product.productId
                  );
                  const updatedProducts = [...prevState];
                  updatedProducts[updatedProductIndex] = data;
                  return updatedProducts;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ position: 'relative' }}>
  {clicked && <Confetti width={window.innerWidth} height={window.innerHeight} wind={0.05} gravity={0.1} />}
  {clicked && <h1 style={{ position: 'absolute', zIndex: '1', top: '0', left: '50%', transform: 'translateX(-50%)' }}>SATIŞ YAPILDI!!!</h1>}

  <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginBottom: "70px",
      }}
    > 
    
      {product.map((product) => (
        <div
          key={product.productId}
          className="card car"
          style={{
            width: "18rem",
            margin: "0.5rem",
            overflow: "hidden",
          }}
        > 
     <h5 className="card-title">{product.name}</h5>
          <img
            src={product.imagePath}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
          <div className="card-body">
            <b className="card-text">Güncel Fiyat: {product.price} TL</b>{" "}
            <hr></hr>
          </div>
          <form onSubmit={(event) => handleOffer(event, product)}>
            {localStorage.getItem("currentUser") == null ? (
              <b>
                Ürünleri almak için giriş yapmalısın!
                <Link
                  to="/giris"
                  className="dropdown-item"
                  href="#"
                  style={{ fontSize: "1.1em", color: "blue" }}
                >
                  Giriş Yapın
                </Link>
              </b>
            ) : (
              <b>Kategori: {product.category}</b>
            )}
          </form>

          <form
            onSubmit={(event) => {
              handleOffer2(event, product);
              setCountdown(10);
            }}
          >
            {localStorage.getItem("currentUser") == null ? (
              <b>
                <Link
                  to="/giris"
                  className="dropdown-item"
                  href="#"
                  style={{ fontSize: "1.1em", color: "blue" }}
                ></Link>
              </b>
            ) : (
              <div className="input-group mb-3" style={{ marginBottom: "1px" }}>
                <div> 
                  <button className= "btn btn-outline-warning btn-danger" style={{marginLeft: '100px', color: 'white'}} >Sepete Ekle</button>                  
                   </div>
              
              </div>
            )}
          </form>
         
        </div>
      ))}
    </div>
    </div>
  );
}

export default Product;