import { GET_DOGS, GET_DOG_DETAIL, CREATE_DOG, GET_TEMPERAMENTS,FILTRAR_TEMPERAMENTO,ORDENAR_ALFABETICO,FILTRAR_RAZA,ORDENAR_PESO} from "../action";

const initialState ={
    dogs:[],
    detailDog:[],
    temperaments:[],
    dogsfiltrados:[],
    tempFiltrados:[],
    copiDogs:[],
    temperamentosF:[]
}

const rootReducer= (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                copiDogs: action.payload
            };
        case GET_DOG_DETAIL:
            if(!action.payload){
                return {
                    ...state,
                    detailDog:[],
                }
            };
            return {
                ...state,
                detailDog: action.payload
            };
        case CREATE_DOG:
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
            case FILTRAR_TEMPERAMENTO:
                const tempfilter = state.dogs.filter((e)=> {
                    if(typeof(e.temperamentos) === 'string'){
                        return e.temperamentos.includes(action.payload)
                    }
                    if(Array.isArray(e.temperamentos)){
                        let temp = e.temperamentos.map(e => e.name)
                        return temp.includes(action.payload)
                    }
                })
                return {
                    ...state,
                    dogsfiltrados: tempfilter
                }
            case ORDENAR_ALFABETICO:
                let dogsNombre = !state.dogsfiltrados.length ? state.dogs : state.dogsfiltrados
                if(action.payload === 'az'){
                    dogsNombre.sort((a,b) => {
                        if(a.Nombre > b.Nombre) return 1
                        else if (a.Nombre < b.Nombre) return -1
                        else return 0
                    })
                }else if(action.payload === 'za'){
                    dogsNombre.sort((a,b) => {
                        if(a.Nombre > b.Nombre) return -1
                        else if(a.Nombre < b.Nombre) return 1
                        else return 0
                    })
                }
                return{
                    ...state,
                    dogsfiltrados: dogsNombre
                }
            case ORDENAR_PESO:
                let dogsPeso = !state.dogsfiltrados.length ? state.dogs : state.dogsfiltrados
                if(action.payload === 'asc'){
                    dogsPeso.sort((a,b) => {
                        if(a.Pesomin && a.Pesomin && b.Pesomin && b.Pesomin){
                            if(a.Pesomax === b.Pesomax && a.Pesomin > b.Pesomin) return 1
                            if(a.Pesomax === b.Pesomax && a.Pesomin < b.Pesomin) return -1
                            if(a.Pesomin > b.Pesomin) return 1
                            else return -1
                        }else{
                            let pesoAmin = !a.Pesomin ? a.Pesomax : a.Pesomin
                            let pesoAmax = !a.Pesomax ? a.Pesomin : a.Pesomax
                            let pesoBmin = !b.Pesomin ? b.Pesomax : b.Pesomin
                            let pesoBmax = !b.Pesomax ? b.Pesomin : b.Pesomax
                            if(pesoAmin === pesoBmin && pesoAmax > pesoBmax) return 1
                            if(pesoAmin === pesoBmin && pesoAmax < pesoBmax) return -1
                            if(pesoAmin > pesoBmin) return 1
                            else return -1
                        }
                    })
                }else if(action.payload === 'des'){
                    dogsPeso.sort((a,b) => {
                        if(a.Pesomin && a.Pesomin && b.Pesomin && b.Pesomin){
                            if(a.Pesomin === b.Pesomin && a.Pesomax > b.Pesomax) return -1
                            if(a.Pesomin === b.Pesomin && a.Pesomax < b.Pesomax) return 1
                            if(a.Pesomin > b.Pesomin) return -1
                            else return 1
                        }else{
                            let pesoAmin = !a.Pesomin ? a.Pesomax : a.Pesomin
                            let pesoAmax = !a.Pesomax ? a.Pesomin : a.Pesomax
                            let pesoBmin = !b.Pesomin ? b.Pesomax : b.Pesomin
                            let pesoBmax = !b.Pesomax ? b.Pesomin : b.Pesomax
                            if(pesoAmin === pesoBmin && pesoAmax > pesoBmax) return -1
                            if(pesoAmin === pesoBmin && pesoAmax < pesoBmax) return 1
                            if(pesoAmin > pesoBmin) return -1
                            else return 1
                        }
                    })
                }
                return{
                    ...state,
                    dogsfiltrados : dogsPeso
                }
            case FILTRAR_RAZA:
                const razafilter = 
                state.copiDogs.map((e) => {
                    if(typeof(e.temperamentos) === 'string'){
                        return e.temperamentos
                    }
                }).join(', ').split(',')
                let eliminarRepetidos = []
                razafilter.map(e => {
                    if(eliminarRepetidos.indexOf(e) == -1){
                        eliminarRepetidos.push(e)
                    }
                })
                let razafilterobj = state.temperaments.filter(e => {
                    if(eliminarRepetidos.includes(e.name))return e
                })
            return{
                ...state,
                tempFiltrados: razafilterobj,
                temperamentosF: razafilterobj
            }
        default:
            return {...state};
    }
}

export default rootReducer;