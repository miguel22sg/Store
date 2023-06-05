import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';


function App() { 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element= {<Home/>}/>
          <Route path='/About' element= {<About/>}/>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
