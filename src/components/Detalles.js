import React from "react";
import './Detalles.css';
const Detalles = ({articulos, detallesActive, setDetallesActive}) =>{

const cerrarVentanaDetalles = () =>{
    setDetallesActive(!detallesActive);
}
    return(
        <div className={`contendorD ${detallesActive ? "": "hidden-cart"}`}>
            <div className="ContenedorDetalles">
                <div className="contenedorImagenDetalles">
                    <img src={articulos.image} alt="Imagen del Producto"/>
                </div>
                <div className="contenedorTituloDetalles">
                    <h2><strong>{articulos.title}</strong></h2>
                </div>
                <div className="contenedorDescripcionDetalles">
                    <p>{articulos.description}</p>
                </div>
                <button className="btncerrarVentanaDetalles" onClick={cerrarVentanaDetalles}>Cerrar ventana de detalles</button>
            </div>
        </div>
    )
}
export default Detalles;