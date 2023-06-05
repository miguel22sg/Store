/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import "./Card.css";
import React from "react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Pagination from "./Pagination";

function Card({
  allProducts,
  setAllProducts,
  contProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  //Constantes para el listado y la busqueda de los articulos
  const [articulos, setArticulos] = useState([]);
  const [fake, setFake] = useState([]);
  const [busqueda, setBusqueda] = useState();

  //Constantes para la paginacion
  const [productosPorPagina] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProductos = articulos.length;
  const lastIndex = currentPage * productosPorPagina;
  const firstIndex = lastIndex - productosPorPagina;

  //Constantes para el carrito de compras
  // Utilizamos esta funcion para que no se puede agregar el mismo producto dos veces
  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item } : item
      );
      return setAllProducts([...products]);
    }

    setTotal(total + product.price);
    setCountProducts(contProducts + 1);
    setAllProducts([...allProducts, product]);
  };
  const fakestore = async () => {
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
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    // eslint-disable-next-line array-callback-return
    var resultadosBusqueda = fake.filter((elemento) => {
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
        <button>
          <i>
            <BiSearch />
          </i>
        </button>
      </div>
      <div className="containerSS">
        {articulos
          .map((values) => {
            return (
              <div>
                <div className="cardProducts" key={values.id}>
                  <div className="cardImage">
                    <img src={values.image}  />
                  </div>
                  <div className="cardContenido">
                    <div className="cardTitle">
                      <h2>{values.title}</h2>
                    </div>
                    <div className="cardDescripcion">
                      <p>
                        <b>{Math.round(values.price)}$</b>
                      </p>
                    </div>
                  </div>
                  <div className="cardfooter">
                    <button className="btnDetallesDelProducto" type="">
                      Detalles
                    </button>
                    <button
                      onClick={() => onAddProduct(values)}
                      className="btnAgregarAlCarrito"
                      type=""
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            );
            //Utilizamos la funcion .slice para decir el numero de productos que queremos por pagina
          })
          .slice(firstIndex, lastIndex)}
      </div>
      <Pagination
        productosPorPagina={productosPorPagina}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProductos={totalProductos}
      />
    </div>
  );
}

export default Card;
