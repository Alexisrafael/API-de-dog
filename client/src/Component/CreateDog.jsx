import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getDogsTemperaments } from '../Redux/action';
import NavBar from './NavBar';


const CreateDog = () => {
    const dispatch = useDispatch();
    const stateTemp = useSelector(state => state.temperaments)
    const [temp, setTemp] = useState([]);
    const [dog, setDog] = useState({
        Imagen:"",
        Nombre:"",
        temperamentos:[],
        Pesomin:0,
        Pesomax:0,
        Alturamin:0,
        Alturamax:0,
        Años_de_vida:"",
    });
    const [error, setError] = useState({
        Imagen:"Debe terner una imagen",
        Nombre:"Debe tener un nombre",
        Pesomin:"Debe terner un peso min",
        Pesomax:"Debe tener un peso max",
        Alturamin:"Debe tener una altura min",
        Alturamax:"Debe tener una altura max",
        Años_de_vida:"Debe tener años de vida"
    });

    /* const validarCampos = (e) => {
        let error = {}
        if(!e.Imagen){
            error.Imagen = 'Debe contener una imagen'
        }
        if(!e.Nombre){
            error.Nombre = 'Debe contener un nombre'
        }else if(!(/^[a-zA-Z]+$/)){
            error.Nombre = 'Debe contener solo letras'
        }
        if(!e.alturamin || e.Alturamin < 1){
            error.Alturamin = 'Debe contener una altura min valida'
        }
        if(!e.Alturamax || e.Alturamax < e.Alturamin){
            error.Alturamax = "Deber contener una altura max valida"
        }
        if(!e.Pesomin || e.Pesomin < 1){
            error.Pesomin = "Debe contener un peso min valido"
        }
        if(!e.Pesomax || e.Pesomax < e.Pesomin){
            error.Pesomax = "Debe contener un peso max valido"
        }
        if(!e.Años_de_vida){
            error.Años_de_vida = "Debe contener un tiempo de vida valido"
        }else if(e.Años_de_vida < 1){
            error.Años_de_vida = "Debe contener un tiempo de vida valido"
        }
        return error
    } */

    const handelOnChange = (e)=>{
        e.preventDefault()
        setDog({
            ...dog,
            [e.target.name]:e.target.value
        })
        setError({
            ...dog,
            [e.target.name]: e.target.value
        })
        console.log(dog)
    }

    const handelOnChangeTemp = (e)=>{
        let tem = temp.indexOf(e)
        if(tem === -1){
                setTemp(temp => [...temp,e]);
                setDog({...dog, 
                    temperamentos: [...dog.temperamentos, e]})
                    console.log(temp)
            }else{
                temp.splice(tem,1)
                setDog({...dog, temperamentos:temp})
            }
    }

    const handelOnSubmi = () =>{
        /* if(error.hasOwnProperty('Imagen') || error.hasOwnProperty('Nombre') || error.hasOwnProperty('Alturamin')
        || error.hasOwnProperty('Alturamax') || error.hasOwnProperty('Pesomin') || 
        error.hasOwnProperty('Pesomax') || error.hasOwnProperty('Años_de_vida')){
            console.log('Hay errores en los datos')
        } */
        dispatch(createDog(dog))
        setDog({
            nombre:"",
            alturamin: "",
            alturamax: "",
            pesomin: "",
            pesomax: "",
            Años_de_vida: "",
            temperamentos : []
        })
        setTemp([])
    
    }

    useEffect(()=>{
        dispatch(getDogsTemperaments())
    },[dispatch])

    return (
        <div>
            <NavBar/>
            <h3>Llena el formulario para crear tu propia raza de perro</h3>
            <form onSubmit={(e) => {e.preventDefault();handelOnSubmi()}} >
                <label>Imagen</label>
                <input name='Imagen' type='text' value={dog.Imagen} onChange={handelOnChange}></input>
                <label>Nombre</label>
                <input name='Nombre' type='text' value={dog.Nombre} onChange={handelOnChange}></input>
                <label>Temperamentos</label>
                <select onChange={e => handelOnChangeTemp(e.target.value)}>
                    {stateTemp.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                            ))}
                </select>
                <label>Peso min</label>
                <input name='Pesomin' type='number' value={dog.Pesomin} onChange={handelOnChange}></input>
                <label>Peso max</label>
                <input name='Pesomax' type='number' value={dog.Pesomax} onChange={handelOnChange}></input>
                <label>Altura min</label>
                <input name='Alturamin' type='number' value={dog.Alturamin} onChange={handelOnChange}></input>
                <label>Altura max</label>
                <input name='Alturamax' type='number' value={dog.Alturamax} onChange={handelOnChange}></input>
                <label>Años de vida</label>
                <input name='Años_de_vida' type='text' value={dog.Años_de_vida} onChange={handelOnChange}></input>
                <button type='submit'>Crear Perro</button>
                <div>
                    <h4>Temperamentos selecionados</h4>
                    {
                    temp.length?
                    temp.map(e =>(
                    <div key={e}>
                        <button>x</button>
                        <p >{e}</p>
                        </div>
                    )):<>Seleccione los temperamentos</>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreateDog;