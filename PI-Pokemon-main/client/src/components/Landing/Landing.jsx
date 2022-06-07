import React from 'react';
import { Link } from "react-router-dom";
import styles from './Landing.module.css';
import main from '../../images/mainLanding1.png'
import logo from '../../images/logoPokemon.png'

export default function Landing(){

    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <img className={styles.logo} src= {logo} alt = 'Pikachu'/>
                <Link to ='/home'>
                    <button className={styles.btn}>Let's go!</button>
                </Link>
            </div>
            <div className={styles.item2}>
                <img className={styles.img} src= {main} alt = 'Pikachu'/>
            </div>
        </div>
    )
}
