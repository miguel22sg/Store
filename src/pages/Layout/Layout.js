import './Layout.css'
import { Outlet } from "react-router-dom"
import { BiSearch,} from 'react-icons/bi';


function Layout(){
    return(
    <div className='Main'>
        <div className='navbar'>
            <div className='leftNavbar'>
                <h2>SHOP</h2>
            </div>
            <div className='centerNavbar'>
                <div className='barraDeBusqueda'>
                    <input placeholder='Buscar' name='search'></input>
                    <button type=""><i><BiSearch/></i></button>
                </div>
            </div>
            <div className='rightNavbar'>
               
            </div>
        </div>
        <Outlet/>
    </div>    
    );
}

export default Layout;