import React from 'react';
import CardPokemon from '../CardPokemon/CardPokemon.jsx'
import styles from './CardsP.module.css';

export default function CardsPokemon({pokemons}){
    console.log(pokemons)
    return(
        <div>
            {pokemons?.map((p) => {
                return <CardPokemon 
                    id = {p.id}
                    img = {p.img}
                    name = {p.name}
                    key = {p.id}
                    type = {p.type ? p.type : p.tipos.map((t) => t.name)}
                />
            })}
        </div>
    )
}