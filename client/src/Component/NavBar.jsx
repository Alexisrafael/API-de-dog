import React from 'react'
import { Link } from 'react-router-dom';


const NavBar = ()=> {
    return (
        <div>
            <Link to='/dogs'>dogs</Link>
            <Link to='/dog'>Create dog</Link>
        </div>
    );
}

export default NavBar;