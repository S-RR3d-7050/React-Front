import React from 'react'
import style from './Buttonnav.module.css'

function Buttonnav(props) {
  return (
    <div>
        <button className={style.container} onClick={onclick}>
            
            <img src={props.source} className={style.icon}></img>
            <p className={style.texte}>{props.text}</p>
           
        </button>
    </div>
  )
}

export default Buttonnav