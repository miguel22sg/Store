/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import "./Card.css";
import React from "react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";



function Card(props) {
  const [articulos, setArticulos] = useState([]);
  const [fake, setFake] = useState([]);
  const [busqueda, setBusqueda] = useState();
 

  const fakestore=async()=>{
     await axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setFake(response.data);
        setArticulos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange =e=> {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    var resultadosBusqueda = fake.filter((elemento)=>{
      if (
        elemento.title
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setArticulos(resultadosBusqueda);
  };
  useEffect(() => {
  fakestore();
  }, []);

  return (
    <div>
      <div className="BuscarArticulos">
        <input
          placeholder="Buscar"
          type="search"
          value={busqueda}
          onChange={handleChange}
        />
        <button><i><BiSearch/></i></button>
      </div>
      <div className="containerSS">
        {articulos.map((values) => {
          return (
            <div>
              <div className="cardProducts">
                <div className="cardImage">
                  <img src={values.image} />
                </div>
                <div className="cardContenido">
                  <div className="cardTitle">
                    <h2>{values.title}</h2>
                  </div>
                  <div className="cardDescripcion">
                    <p>{values.description}</p>
                  </div>
                </div>
                <div className="cardfooter">
                  <button className="btnDetallesDelProducto" type="">
                    Detalles
                  </button>
                  <button className="btnAgregarAlCarrito" type="">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
