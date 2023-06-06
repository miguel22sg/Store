/* eslint-disable array-callback-return */
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
//Desectructuramos las constantes
function Layout({
  allProducts,
  setAllProducts,
  total,
  contProducts,
  setCountProducts,
  setTotal,
}) {
  //Utilizamos estas constantes para desplegar y ocultar el carrito
  const [active, setActive] = useState(false);
  //Funcion para borrar los productos del carrito
  const onDeleteProduct = (product) => {
    const result = allProducts.filter((item) => item.id !== product.id);
    setAllProducts(result);
    setCountProducts(contProducts - 1);
    setTotal(total - product.price);
  };
  //Funcion para vaciar todo el carrito
  const onClearCart = () =>{
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  }

  return (
    <div className="Main">
      <div className="navbar">
        <div className="leftNavbar">
          <h2>SHOP</h2>
        </div>
        <div className="centerNavbar">
          <div className="barraDeBusqueda">
            <input placeholder="Buscar" name="search"></input>
            <button type="">
              <i>
                <BiSearch />
              </i>
            </button>
          </div>
        </div>
        <div className="rightNavbar">
          <div className="container-icon">
            <div
              className="container-cart-icon"
              onClick={() => setActive(!active)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="icon-cart"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <div className="count-products">
                <span id="contador-productos">{contProducts}</span>
              </div>
            </div>

            <div
              className={`container-cart-products ${
                active ? "" : "hidden-cart"
              }`}
            >
              {
                // Utilizamos esta logica para que cuando el carrito tenga algo muestre los productos pero cuando este en 0 osea que este vacio muestre "El carrito esta vacio"
                allProducts.length ? (
                  <>
                    <div className="row-product">
                      {allProducts.map((product) => {
                        return (
                          <div className="cart-product" key={product.id}>
                            <div className="info-cart-product">
                              <span className="cantidad-producto-carrito">
                                {product.quantity}
                              </span>
                              <p className="titulo-producto-carrito">
                                {product.title}
                              </p>
                              <span className="precio-producto-carrito">
                                ${Math.round(product.price)}
                              </span>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="icon-close"
                              onClick={() => onDeleteProduct(product)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        );
                      })}
                    </div>

                    <div className="cart-total">
                      <h3>Total:</h3>
                      <span className="total-pagar">${Math.round(total)}</span>
                    </div>
                    <button onClick={onClearCart} className="btn-clear-all">Vaciar Carrito</button>
                  </>
                ) : (
                  <p className="cart-empty">El carrito está vacío</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
