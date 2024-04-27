import React from 'react'
import icon4 from '../../assets/icon4.png'
import style from './UserName.module.css'


import { useAuth } from "../../hooks/AuthProvider";



function UserName() {
  //const user = useAuth();

  const username = localStorage.getItem('user');
  //const user = username?.username;
  //const name = user?.user?.username ? 'user50' : 'user50';
  //console.log(user.user.username);

  return (
    <div className={style.container}>
        <img src={icon4} className={style.image}></img>
        <p className={style.texte}>{username}</p>
    </div>
  )
}

export default UserName