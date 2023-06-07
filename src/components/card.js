/* eslint-disable jsx-a11y/alt-text */
/*Instalamos la libreria Axio para recibir respuestas faciles de processar de nuestra API*/
import axios from "axios";
import "./Card.css";
import React from "react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import Pagination from "./Pagination";

//Aqui desectruturamos las constantes que creamos en el APP.js 
function Card({
  allProducts,
  setAllProducts,
  contProducts,
  setCountProducts,
  total,
  setTotal,
  setProductoSeleccionado,
  detallesActive,
  setDetallesActive,
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

  //
  const handleProductoSeleccionado = (producto) =>{
    setProductoSeleccionado(producto);
    setDetallesActive(!detallesActive)

  }

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
 
  //Funcion donde para llamar a la API de Fake Store
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
  //Utulizamos esta funcion para una busqueda dinamica de los articulos
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  //Funcion para filtrar los datos del buscador
  const filtrar = (terminoBusqueda) => {
    //Tambien nos aseguramos de que no sea case sensitive
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
    <div className={`${detallesActive ? "hidden-cart" : ""}`}>
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
                    <button className="btnDetallesDelProducto" type="" onClick={()=> handleProductoSeleccionado(values)}>
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
