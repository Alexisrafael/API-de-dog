import axios from 'axios'
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTRAR_TEMPERAMENTO = 'FILTRAR_TEMPERAMENTO';
export const ORDENAR_ALFABETICO = 'ORDENAR_ALFABETICO';
export const ORDENAR_PESO = 'ORDENAR_PESO';
export const FILTRAR_RAZA = 'FILTRAR_RAZA';

export const getDogs = (Nombre)=> async (dispatch)=>{
    try {
        if(Nombre){
        return await fetch(`http://localhost:3001/dogs/?name=${Nombre}`)
        .then(res => res.json())
        .then(json =>{
            dispatch({type: GET_DOGS, payload: json})
        })
        .catch(error =>{
            return dispatch({type: GET_DOGS, payload: error})
        })
    }else{
        return await fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(res=>{
            dispatch({type: GET_DOGS, payload: res})
        })
    }
    } catch (error) {
        console.log(error)
    }
}

export const getDogsDetail = (id)=> async (dispatch)=>{
    if(id){
        return await fetch(`http://localhost:3001/dogs/${id}`)
    .then(res => res.json())
    .then(res =>{
        dispatch({type: GET_DOG_DETAIL, payload: res})
    })
    .catch(err=>{
        dispatch({type: GET_DOG_DETAIL, payload: err})
    })
    }else{
        dispatch({type: GET_DOG_DETAIL, payload: id})
    }
    
}

export const getDogsTemperaments = ()=> async (dispatch)=>{
    return await fetch('http://localhost:3001/temperament')
    .then(res => res.json())
    .then(res =>{
        dispatch({type: GET_TEMPERAMENTS, payload: res})
    })
}

export const createDog = (value) => async (dispatch)=>{
    let crear = await axios.post('http://localhost:3001/dog',value).then(res=> res.json())
    return crear
}

export function filterTemperament(temeperamento){
    return {type: FILTRAR_TEMPERAMENTO, payload: temeperamento}
}

export function ordenAlfabetico(value){
    return {type: ORDENAR_ALFABETICO, payload: value}
}

export function ordenPorPeso(peso){
    return {type: ORDENAR_PESO,payload: peso}
}

export function filterRaza(raza){
    return{type: FILTRAR_RAZA , payload:raza}
}