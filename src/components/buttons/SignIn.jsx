import React from 'react'
import style from './SignIn.module.css'

function SignIn(props) {
  return (
    <button className={style.container}>
        {props.text}
    </button>
  )
}

export default SignIn