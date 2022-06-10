import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styles from './DetailP.module.css';
import { cleanPokemonDetail, getPokemonDetail } from '../../redux/actions/actions.js';
import Loader  from '../Loader/Loader.jsx';
import attack from '../../images/icons/attack.png';
import defense from '../../images/icons/defense.png';
import height from '../../images/icons/height.png';
import hp from '../../images/icons/hp.png';
import speed from '../../images/icons/speed.png';
import weight from '../../images/icons/weight.png';
import stats from '../../images/icons/stats.png';

export default function DetailPokemon(){
    const dispatch = useDispatch(); //extrae datos de una store de Redux
    const id = useParams(); //referencia a la función dispatch procedente del store
    
    useEffect(() => {
        dispatch(getPokemonDetail(id.id))
        return () => dispatch(cleanPokemonDetail())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    //recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice
    const detail = useSelector((state) => state.pokemonDetail)
    let tipos = []
    if(detail.type){
        tipos = detail.type.map((tipo, i) => <span key= {i}>{tipo}</span>)
    }else if(detail.tipos){
        tipos = detail.tipos.map((tipo) => <span key={tipo.id}>{tipo.name}</span>)
    }
    return(
        <div>
            {tipos.length > 0 ? 
            <div className={styles.container}>
                <div className={styles.column1}>
                    <div className={styles.nameColumn}>
                        <h1 className={styles.name}>{detail?.name}</h1>
                    </div>
                    <img className={styles.img} src={detail?.img} alt = 'Imagen del pokemon'/>
                    <div>
                        <span>Types</span>
                        <div className={tipos.length > 1 ? styles.tiposConteiner : styles.tipoUnique}>    
                            {tipos}
                        </div>
                    </div>
                </div>
                <div className={styles.column2}>
                    <div className={styles.subContainer}>
                        <div className={styles.stats}>
                            <div className={styles.backStats}>
                                <img className={styles.icons} src = {stats} alt='stats'/>
                            </div>
                            <h3 className={styles.nameStats}>STATISTICS</h3>
                        </div>
                        <div>
                            <div>
                                <img className={styles.icons} src = {hp} alt='hp icon'/>
                                <span>HP</span>
                            </div>
                            <span>{detail?.vida}</span>
                        </div>
                        <div>
                            <div>
                                <img className={styles.icons} src = {attack} alt='attack icon'/>
                                <span>STRENGTH</span>
                            </div>
                            <span>{detail?.fuerza}</span>
                        </div>
                        <div>
                            <div>
                                <img className={styles.icons} src = {defense} alt='defense icon'/>
                                <span>DEFENSE</span>
                            </div>
                            <span>{detail?.defensa}</span>
                        </div>
                        <div>
                            <div>
                                <img className={styles.icons} src = {speed} alt='speed icon'/>
                                <span>SPEED</span>
                            </div>
                            <span>{detail?.velocidad}</span>
                        </div>
                        <div>
                            <div>
                                <img className={styles.icons} src = {height} alt='height icon'/>
                                <span>HEIGHT</span>
                            </div>
                            <span>{detail?.altura}m</span>       
                        </div> 
                        <div>
                            <div>
                                <img className={styles.icons} src = {weight} alt='weight icon'/>
                                <span>WEIGHT</span>
                            </div>
                            <span>{detail?.peso}kg</span>       
                        </div> 
                        <div>
                            <Link to = '/home'>
                                <span>Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> : 
            <Loader/>}
        </div>
    )
}
