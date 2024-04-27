import React from 'react'
import style from './Login.module.css'

function LoginInput(props) {
  return (
    <div className={style.container}>
         <p className={style.texte}>{props.text}</p>
         <input type={props.type} className={style.input}></input>
    </div>
  )
}

export default LoginInput