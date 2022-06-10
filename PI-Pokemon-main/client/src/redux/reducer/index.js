import { GET_POKEMONS, 
    GET_POKEMON_DETAIL, 
    CLEAN_POKEMON_DETAIL, 
    GET_TYPES, 
    SELECT_TYPE, 
    FILTER_POKEMON_TYPE, 
    FILTER_POKEMON_ORIGIN, 
    ORDER_BY_NAME,
    ORDER_BY_STRENGTH,
    CLEAN_FILTERS,
    SEARCH_POKEMON,
    CLEAN_SEARCH_POKEMON, 
    //DELETE_POKEMON
} from '../action-types/index.js';
   
const initialState = {
    pokemons : [],
    pokemonDetail : {},
    types: [],
    pokemonesFilteredType : [],
    pokemonesFilteredOrigin : [],
    pokemonesFiltered : [],
    pokemonesSearch : [],
}

export function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload,
            }
        case CLEAN_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload,
            }
        case CLEAN_FILTERS:
            return{
                ...state,
                pokemonesFilteredType : action.payload,
                pokemonesFilteredOrigin : action.payload,
                pokemonesFiltered : action.payload
            }    
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        case SELECT_TYPE:
            return {
                ...state,
                types: state.types.filter((type) => type.name !== action.payload)
            }
        case FILTER_POKEMON_TYPE:
            // eslint-disable-next-line array-callback-return
            let pokemonsByType = action.payload === 'todosTipo' ? state.pokemons : state.pokemons.filter((p) => {
                if (p.tipos){
                    let tipos = p.tipos.map((tiposPDb) => tiposPDb.name)
                    if(tipos.includes(action.payload)){
                        return p
                    }
                }else if(p.type.includes(action.payload)){
                    return p
                }
            })
            let joinFilters = []
            if(state.pokemonesFilteredOrigin.length > 0){
                for(let i = 0; i < state.pokemonesFilteredOrigin.length; i++){
                    for(let j = 0; j < pokemonsByType.length; j++){
                        if(state.pokemonesFilteredOrigin[i] === pokemonsByType[j]){
                            joinFilters.push(pokemonsByType[j])
                            break
                        }
                    }
                }
            }
            return{
                ...state,
                pokemonesFilteredType: pokemonsByType,
                pokemonesFiltered: state.pokemonesFilteredOrigin.length && pokemonsByType.length ? joinFilters : []
            }
        case FILTER_POKEMON_ORIGIN:
            let pokemonsByOrigin = action.payload === 'api' ? state.pokemons.filter((p) => 
            Number.isInteger(Number(p.id))) : state.pokemons.filter((p) => !Number.isInteger(Number(p.id)))
            pokemonsByOrigin = action.payload === 'todos' ? state.pokemons : pokemonsByOrigin
            let joinFilters2 = []
            if(state.pokemonesFilteredType.length > 0){
                for (let i = 0; i < state.pokemonesFilteredType.length; i++) {
                    for (let j = 0; j < pokemonsByOrigin.length; j++) {
                        if(state.pokemonesFilteredType[i] === pokemonsByOrigin[j]){
                            joinFilters2.push(pokemonsByOrigin[j])
                            break
                        }
                    }   
                }
            }
            return{
                ...state,
                pokemonesFilteredOrigin: pokemonsByOrigin,
                pokemonesFiltered: state.pokemonesFilteredType.length && pokemonsByOrigin.length ? joinFilters2 : []
            }
        case ORDER_BY_NAME:
            let pokemonesFilter = state.pokemonesFiltered?.sort(function (a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    if(action.payload === 'asc') return -1
                    else return 1
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    if(action.payload === 'dsc') return -1
                    else return 1
                }
                return 0
            })
            let pokemones = state.pokemons?.sort(function (a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    if(action.payload === 'asc') return -1
                    else return 1
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    if(action.payload === 'dsc') return -1
                    else return 1
                }
                return 0
            })
            console.log(pokemonesFilter)
            return {
                ...state,
                pokemonesFiltered: pokemonesFilter,
                pokemons: pokemones
            }
        case ORDER_BY_STRENGTH:
            let pokemons = state.pokemons.sort((a,b) => action.payload === 'asc' ? a.fuerza-b.fuerza : b.fuerza-a.fuerza)
            let pokemonsFilter = state.pokemonesFiltered.sort((a,b) => action.payload === 'asc' ? a.fuerza-b.fuerza : b.fuerza-a.fuerza)
            return{
                ...state,
                pokemonesFiltered: pokemonsFilter,
                pokemons : pokemons
            }
        case SEARCH_POKEMON:
            return{
                ...state,
                pokemonesSearch: action.payload
            }
        case CLEAN_SEARCH_POKEMON:
            return{
                ...state,
                pokemonesSearch: action.payload
            }
        //case DELETE_POKEMON:
        //    return{
        //        
        //    }
        default: return state;
    }
}