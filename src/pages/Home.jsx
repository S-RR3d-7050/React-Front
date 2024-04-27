import React from 'react'
import './Home.css'
import Navbar from '../components/Navbar/Navbar'
import Tableau from '../components/Tableau/Tableau'
import Create from '../components/buttons/Create'
import { Link } from 'react-router-dom'
import { useAuth } from "../hooks/AuthProvider";


function Home() {

  const user = useAuth();
  /*
  console.log(user.user._id);
  token = localStorage.getItem("site")

  const fetchData = async () => {
    // fetch with bearer token 
    const response = await fetch("http://localhost:3001/api/poll", {
      method: "GET",
      headers: {
        "Content-Type": "application",
        // Bearer token
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  }
  */
  return (
    <div class="layout-container55">
       
        <Navbar></Navbar>
        <div className='container55'>
            <div class="button55"> <Link to='/Choice' style={{textDecoration:"none"}}><Create></Create></Link></div>
            <div class="tabcont55">
               <Tableau></Tableau>
            </div>
            
        </div>
       
    </div>
  )
}

export default Home