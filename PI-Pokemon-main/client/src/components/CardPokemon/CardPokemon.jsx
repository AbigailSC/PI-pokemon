import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardPokemon.module.css';

export default function CardPokemon(props){
    let name = props.name.split('').map((letra, i) => {
        if(i === 0) return letra.toUpperCase()
        return letra
    })
    let clase = props.type.length > 1 ? 'Mixto' : props.type.join('-');
    console.log(clase)
    return(
        <div>
            <div>
                <img src={props.img} alt= 'Imagen del pokemon'/>
            </div>
            <div>
                <Link to={`/detail/${props.id}`}>
                    <h1>{name.join('')}</h1>
                </Link>
                <div>
                    {props.type.map((tipo, i) => 
                    <span key = {i}>{tipo}</span>)
                    }
                </div>
            </div>
        </div>
    )
}