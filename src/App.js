import './App.css';
import Layout from './pages/Layout/Layout';
import { useState } from 'react';
import Card from './components/card';
import Detalles from './components/Detalles';

function App() { 
    const [allProducts, setAllProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [contProducts, setCountProducts] = useState(0)
    const [productoSelecionado, setProductoSeleccionado] = useState([]);
    const [detallesActive, setDetallesActive] = useState(false);
  return (
    <div className="App">      
      <Layout allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} contProducts={contProducts} setCountProducts={setCountProducts}/>      
      <Card allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} contProducts={contProducts} setCountProducts={setCountProducts} productoSelecionado ={productoSelecionado} setProductoSeleccionado={setProductoSeleccionado} detallesActive ={detallesActive} setDetallesActive={setDetallesActive}/>
      <Detalles articulos={productoSelecionado} detallesActive={detallesActive} setDetallesActive={setDetallesActive}/>
      {console.log(productoSelecionado)}
      
    </div>
  );
}

export default App;
