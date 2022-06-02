import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogs, getDogsDetail } from '../Redux/action';
import NavBar from './NavBar';
import dogrunninggif from '../img/dog-running-gif-5.gif';
import est from '../module/card.module.css'


const DogDetail = () => {
    const dispatch = useDispatch();
    const dogsDetail = useSelector(state => state.detailDog);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDogs())
        dispatch(getDogsDetail(id))
    },[dispatch,id])

    return (
        <div>
            <NavBar/>
            {
                dogsDetail.length < 1?
                <img src={dogrunninggif} alt="Cargando..." />:
                dogsDetail.map(e =>{
                    return (
                        <div key={e.id}>
                            <h1>detalle de perro</h1>
                            <h2>Nombre: {e.Nombre}</h2>
                            <img className={est.tamaño} src={e.Imagen} alt={e.Nombre} />
                            <h3>Temperamentos: {e.temperamentos}</h3>
                            <h3>Altura: Min {e.Alturamin}cm - Max {e.Alturamax}cm</h3>
                            <h3>Peso: Min {e.Pesomin}kg - Max {e.Pesomax}kg</h3>
                            <h3>Años de vida: {e.Años_de_vida}</h3>
                            <h3>Origen: {e.Origen}</h3>
                            <h3>Criado para: {e.Criado_para}</h3>
                            <h3>Grupo o raza: {e.Grupo_o_raza}</h3>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default DogDetail;