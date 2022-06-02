import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterRaza, filterTemperament, getDogs, ordenAlfabetico, ordenPorPeso } from '../Redux/action'
import {GET_DOGS} from '../Redux/action/index'

const Search = ({setPaginas, setBusqueda,temp}) => {
    const dispatch = useDispatch()
    const razas = useSelector((state) => state.dogs)
    const razasfiltradas = useSelector((state) => state.dogsfiltrados)
    const tempF = useSelector((state)=> state.temperamentosF)
    const tem = useSelector((state) => state.tempFiltrados)

    let showraza = razasfiltradas.length < 1 ? razas : razasfiltradas
    let showtemp = tem.length < 1 ? temp : tem
    let showtempe = tempF.length < 1 ? temp : tempF

    const [searchn, setsearchn] = useState('');

    const onSearchChange = async (event) => {
        setPaginas(0)
        setsearchn(event.target.value)
        setBusqueda('')
        /* let espera =dispatch(getDogs(event.target.value)) .then(e => {return e.type})
        if(espera === GET_DOGS ){
            dispatch(filterRaza())
        } */ 
        dispatch(getDogs(event.target.value))
        dispatch(filterRaza())
        
        setBusqueda('')
    }

    const onSearchChangeTemp = (event) => {
        setPaginas(0)
        setBusqueda(event.target.value)
        dispatch(filterTemperament(event.target.value))
    }

    const organizateData = (event) => {
        if(event.target.value === "asc" || event.target.value === "des"){
            setPaginas(0)
            setBusqueda(event.target.value)
            dispatch(ordenPorPeso(event.target.value))
        }else{
            setPaginas(0)
            setBusqueda(event.target.value)
            dispatch(ordenAlfabetico(event.target.value))
        }
    }
    
    return (
        <div className="InputBusqueda">
            <select name="select" onChange={e => organizateData(e)}>
                <option key="ordenar" value=''>Ordenar</option>
                    <option key="pesomin" value="asc" >PesoAscendente</option>
                    <option key="pesomax" value="des">PesoDescendente</option>
                    <option key="a-z" value="az">AlfabeticoAscendente</option>
                    <option key="z-a" value="za">alfabeticoDescendente</option>
            </select>
            <select name="select" onChange={e => onSearchChange(e)}>
                <option key="razaDog" value=''>Raza</option>
                {showraza.map(e => (
                    <option key={e.id} value={e.Nombre}>{e.Nombre}</option>
                ))}
            </select>
            <select name="select" onChange={e => onSearchChangeTemp(e)}>
                <option key="tempera" value=''>Temperamentos:</option>
                {showtempe.map(e => (
                    <option  key={e.id} value={e.name}>{e.name}</option>
                ))}
            </select>
            <input type="text" value={searchn} onChange={onSearchChange} placeholder="Nombre de Raza"/>
        </div>    
    )
}

export default Search;