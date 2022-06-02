import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getDogs, getDogsDetail, getDogsTemperaments} from '../Redux/action';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import Search from './Search';
import dogrunninggif from '../img/dog-running-gif-5.gif'
import est from '../module/card.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector(state=> state.dogs);
    const dogsFiltrados = useSelector(state => state.dogsfiltrados)
    const temp = useSelector(state => state.temperaments)
    const [busqueda, setBusqueda] = useState('');
    const [paginas, setPaginas] = useState(0)

    const paginado = busqueda === ''? allDogs.slice(paginas, paginas + 8): dogsFiltrados.slice(paginas, paginas + 8);

    const nextPage = () => {
        if(allDogs.slice(paginas + 8,paginas + 16).length > 0 && dogsFiltrados.length < 1){
            setPaginas(paginas + 8)
        }
        if(dogsFiltrados.slice(paginas + 8,paginas + 16).length > 0 && allDogs.slice(paginas + 8,paginas + 16).length > 0){
            setPaginas(paginas + 8)
        }
    }
    
    const prevPage = () => {
        if(paginas > 0){
            setPaginas(paginas - 8)
        }
    }

    useEffect(()=>{
        dispatch(getDogs())
        dispatch(getDogsDetail())
        dispatch(getDogsTemperaments())
    },[dispatch])

    return (
        <div>
            <NavBar/>
            <Search setPaginas={setPaginas} setBusqueda={setBusqueda} temp={temp}/>
            <h1>inicio</h1>
            <div>
            <button onClick={prevPage}>Anterior</button>
            <button onClick={nextPage}>Sigiente</button>
            </div>
            <div className={est.contenedor}>
            {
                paginado.length?
                paginado.map(e =>{
                    return (
                        <div className={est.card} key={e.id}>
                            <Link to={`/dogs/${e.id}`}><img className={est.tamaño} src={e.Imagen} alt={e.nombre}/></Link>
                            <h2>Nombre: {e.Nombre}</h2>
                            <h3>Temperamentos: {e.temperamentos}</h3>
                            <h3>Peso Min: {e.Pesomin} kg</h3>
                            <h3>Peso Max: {e.Pesomax} Kg</h3>
                        </div>
                    )
                }):
                <img src={dogrunninggif} alt="Cargando..." />
            }
            </div>
        </div>
    );
}

export default Home;