import React from 'react'
import style from './Export.module.css'
import icon8 from '../../assets/icon8.png'

function Delete() {
  return (
    <div className={style.container}>
        <button className={style.bouton}>
            <div className={style.texte}>Export</div>
            <img src={icon8} className={style.image}></img>
        </button>
    </div>
  )
}

export default Delete