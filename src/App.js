import './App.css';
import Layout from './pages/Layout/Layout';
import { useState } from 'react';
import Card from './components/card';


function App() { 
    const [allProducts, setAllProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [contProducts, setCountProducts] = useState(0)
  return (
    <div className="App">      
      <Layout allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} contProducts={contProducts} setCountProducts={setCountProducts}/>
      
      <Card allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} contProducts={contProducts} setCountProducts={setCountProducts}/>
      
    </div>
  );
}

export default App;
