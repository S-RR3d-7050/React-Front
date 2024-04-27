import React from 'react'
import style from './Cancel.module.css'


function Delete({ onClick }) {
  return (
    <div className={style.container}>
        <button className={style.bouton} onClick={onClick}>
            <div className={style.texte}>Cancel</div>
            {/* <img src={icon6} className={style.image}></img> */}
        </button>
    </div>
  )
}

export default Delete