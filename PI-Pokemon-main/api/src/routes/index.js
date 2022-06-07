const { Router } = require('express'); //requerimos el framework express
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const router = Router(); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
async function pokemonsApi(){
    try{
    let callPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); //Llamo a la api
    let pokemons = callPokemon.data.results //guardo la url de los 40 pokemons en una variable
    pokemons = await Promise.all(pokemons.map (async (pokemon) =>{ //mapeamos cada data de los 40 pokemons
        let dataResults = await axios.get(`${pokemon.url}`); //guardamos cada url de CADA pokemon
        let imgPokemon = dataResults.data.sprites.other['home'].front_default
        return {
            id: pokemon.url.split('/')[6],//['https:','','pokeapi.co','api','v2','pokemon','1','encounters']
            name : pokemon.name,
            vida : dataResults.data.stats[0].base_stat,
            fuerza : dataResults.data.stats[1].base_stat,
            defensa :dataResults.data.stats[2].base_stat,
            velocidad :dataResults.data.stats[5].base_stat,
            altura :dataResults.data.height,
            peso :dataResults.data.weight,
            img : imgPokemon,
            type :dataResults.data.types.map((tipo) => tipo.type.name),
        }
    })
    )
    return pokemons;
    }catch(e){
        console.error(e);
    }
}
function objectPokemon(pokemon){
    return {
        id: pokemon.data.id,
        name: pokemon.data.name,
        vida: pokemon.data.stats[0].base_stat,
        fuerza: pokemon.data.stats[1].base_stat,
        defensa:pokemon.data.stats[2].base_stat,
        velocidad: pokemon.data.stats[5].base_stat,
        altura: pokemon.data.height,
        peso: pokemon.data.weight,
        img: pokemon.data.sprites.other['home'].front_default,
        type: pokemon.data.types.map((tipo) => tipo.type.name),
    }
}//funcion que recibe la url con el id y trae toda la info como objeto

router.get('/pokemons', async (req, res) => {
    const { name } = req.query;
    if (name){
        try{
            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
            let pokemonBd = await Pokemon.findAll({where:{name: name.toLowerCase()},include: {
                model: Type
            }})//Traemos el nombre del pokemon y su tipo que tenga el nombre pasado por query
            console.log(pokemonBd)
            if(pokemon.data && pokemonBd.length > 0) {
                return res.json([objectPokemon(pokemon)].concat(pokemonBd))
            }
            if(pokemonBd.length > 0) return res.json(pokemonBd);
            if(pokemon.data) return res.json([objectPokemon(pokemon)]);
        }catch(error){
            let pokemonBd = await Pokemon.findAll({where:{name: name.toLowerCase()},include: {
                model: Type
            }})
            if(pokemonBd.length > 0) return res.json(pokemonBd);
            else return res.send('nombre no encontrado');
        }
    }else{
        let pokemones =  await pokemonsApi();
        pokemones = pokemones.concat( await Pokemon.findAll({include: {
            model: Type
        }}));
        res.json(pokemones);   
    }
})

router.get('/pokemons/:id',async (req,res) => {
    const { id } = req.params;
    try{
        if(id){
            let idSearch = Number(id)
            console.log(idSearch)
            if(Number.isInteger(idSearch)){
                let callPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                if(callPokemon.data) return res.json(objectPokemon(callPokemon))
            }else{
                let pokemonDb = await Pokemon.findByPk(id, {include: {
                    model: Type,
                }})
                if(pokemonDb) return res.json(pokemonDb)
            }
            return res.status(404).json('El id que ha ingresado no coincide con ningun Pokemon. Intentelo nuevamente.')
        }
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})

router.post('/pokemons', async (req, res) => {
    try{
        let {name, life, attack, defense, speed, height, weight, img, types} = req.body

        let findPokemon = await Pokemon.findOne({where: { name: name.toLowerCase()}})// buscamos un poke en la db con el mismo name
        if(findPokemon) return res.json({msg: 'El pokemon que intenta crear ya existe.'})
        if(name&&life&&attack&&defense&&speed&&height&&weight&&img&&types){
            if(Array.isArray(types)){
                var typeDb = await Promise.all(types.map(async (tipo) => await Type.findAll({where: {name: tipo}})))
                typeDb = typeDb.flat()
            }else{
                var [typeDb, created] = await Type.findOrCreate({where: {name: types}})
            }
            let insertPokemon = await Pokemon.create({
                name: name.toLowerCase(),
                life,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                types
            })
            await insertPokemon.setTypes(typeDb)
            return res.json(insertPokemon)
        }
    }catch(error){
        return res.status(400).json('Ups! Algo ha salido mal')
    }
})

router.get('/types', async (req, res) => {
    try{
        let types = await Type.finnAll()
        if (types.length > 0) return res.json(types)
        let typesApi = await axios.get('https://pokeapi.co/api/v2/type')
        typesApi = await Promise.all(typesApi.data.results.map(async (t) => {
            let type = await Type.create({name: t.name})
            return type
        }))
        return res.json(typesApi)
    }catch(error){
        return res.status(400).json('Ups! Algo ha salido mal')
    }
})
module.exports = router;
