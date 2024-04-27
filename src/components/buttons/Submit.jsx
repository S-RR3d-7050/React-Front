import React from 'react'
import style from './Create.module.css'
import icon7 from '../../assets/icon7.png'

function Create({ onClick }) {
  return (
    <div className={style.container}>
        <button className={style.bouton} onClick={onClick} >
            <div className={style.texte}>Submit</div>
            <img src={icon7} className={style.image}></img>
        </button>
    </div>
  )
}

export default Create