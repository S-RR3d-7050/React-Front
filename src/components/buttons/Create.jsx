import React from 'react'
import style from './Create.module.css'
import icon5 from '../../assets/icon5.png'

function Create() {
  return (
    <div className={style.container}>
        <button className={style.bouton}>
            <div className={style.texte}>Create</div>
            <img src={icon5} className={style.image}></img>
        </button>
    </div>
  )
}

export default Create