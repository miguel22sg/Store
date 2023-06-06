import React from "react";
import "bulma/css/bulma.min.css";
import "./Pagination.css";

//Desestructuramiento del componente paginacion
function Pagination({
  productosPorPagina,
  totalProductos,
  currentPage,
  setCurrentPage,
}) {

  //Constante del numero de paginas que tenemos
  const numeroPaginas = [];

  //Hacemos esta operacion para saber cual es el numero de paginas que tenemos. dividiendo el total de productos por los productos que queremos mostrar por pagina. Utilizamos Math.cell para que lo redonde y pueda dar un numero entero
  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroPaginas.push(i);
  }

  //Funcion para que el boton Anterior retroseda las paginas

  const onPreviusPage = () =>{
    //Este if es para que no siga retrosediendo cuando la pagina seleccionada sea 1
    if(currentPage === 1){      
    }else{
      setCurrentPage(currentPage - 1)
    }
  }
  //Funcion para que el boton Siguiente Avance las paginas
  const onNextPage = () =>{
    //Este if es para que no siga avanzando de pagina cuando la pagina actual sea igual al numero de paginas
    if(currentPage === numeroPaginas.length){
    }else{
      setCurrentPage(currentPage + 1)
    }
  }
  //Utilizamos esta funcion para movernos por los numeros de paginas especificos
  const onSpecificPage = (n) =>{
    setCurrentPage(n)
  }
  return (
    <div>
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <button onClick={onPreviusPage} className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`}>Anterior</button>
        <button onClick={onNextPage} className={`pagination-next ${ currentPage >= numeroPaginas.length ? 'is-disabled' : ''}`}>Siguiente</button>
        <ul className="pagination-list">
          {numeroPaginas.map((noPage) => (
            <li key={noPage}>
              <button
                className={`pagination-link ${
                  noPage === currentPage ? "is-currents" : ""
                }`}
                //Como la funcion esta tomando un parametro tenemos que regresar un Call Back
                onClick={()=> onSpecificPage(noPage)}
              >
                {noPage}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default Pagination;
