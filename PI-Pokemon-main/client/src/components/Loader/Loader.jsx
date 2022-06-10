import React from "react";
import pikachu from "../../images/pikachuLoader.gif"
import styles from "./Loader.module.css"

export default function Loader(){
    return(
    <div className={styles.conteiner}>
        <img className={styles.gif} src={pikachu} alt="gif"/>
        <span className={styles.text}>Cargando...</span>
    </div>
    )
}