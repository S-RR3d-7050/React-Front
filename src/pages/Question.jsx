import React from 'react'
import Create from '../components/buttons/Create'
import Cancel from '../components/buttons/Cancel'
import './Question.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Question() {
  const [answer, setAnswer] = useState('');
  const [userName, setUsername] = useState([]);


  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    console.log(answer);
    setAnswer('');
  };

  const handleCancel = () => {
    setAnswer(''); // Clear the input field
  };

  const name = localStorage.getItem('user');
  const token = localStorage.getItem("site");
  
  const [users, setUsers] = useState([{
    _id: 1,
    username: "User1"
},
{
    _id: 2,
    username: "User2"
},
{
    _id: 3,
    username: "User3"
},
{
    _id: 4,
    username: "User4"
},
{
    _id: 5,
    username: "User5"
}
]);

const handleInput = (e) => {
  let values = Array(e.target.selectedOptions.length).fill().map((_, i) => e.target.selectedOptions.item(i).value);
  console.log("select values", values);
  setUsername(values);
}

  const fetchUsers = async () => {
      const response = await fetch("http://localhost:8000/auth/users", {
          method: "GET",
          headers: {
              "Content-Type": "application",
              Authorization: `Bearer ${token}`,
          },
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
  }

  const sendData = async (u) => {
    const response = await fetch("http://localhost:8000/questions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            content: answer,
            created_by: name,
            assigned_users: u
        }),
    });

    const data = await response.json();
    console.log(data);
}

const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (answer !== "") {
      const us = users.map(us => us.username)
        console.log("usernames", userName);
        sendData(us);
        navigate('/HOME')

    }
}

useEffect(() => {
  fetchUsers();
}
  , []);

  return (
   
  <div className='container33'>
                  <form onSubmit={handleSubmitEvent}>

    <div>
      <p className='text33'>What do you want to know </p>
      <input type='text' className='input33' placeholder='Enter your question here...' value={answer} onChange={handleInputChange}></input>
    </div>
    <br></br>
    <div>
      <p className='text33'>Add Participants</p>
    </div>
    <div class="dropdown">
    <select value={userName} onChange={handleInput} multiple>
                    {
                        users.map(user => (
                            <option key={user._id} value={user.username}>{user.username}</option>
                        ))
                    }

                    </select>
    </div>
    <div class="buttons2">

    <Link to='/HOME'><Cancel onClick={handleCancel}></Cancel></Link>
      <Create></Create>
    </div>
    </form>
  </div>
  )
}

export default Question