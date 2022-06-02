import React from 'react'
import {Link} from 'react-router-dom'

const Landingpage = ()=>{
    return (
        <div >
            <h1>PROYECTO INDIVIDUAL</h1>
            <h2>DOGS</h2>
            <div>
                <Link to='/dogs'><button>Home</button></Link>
            </div> 
        </div>
    )
}

export default Landingpage;