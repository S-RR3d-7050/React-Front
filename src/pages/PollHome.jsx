import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import PollHomeCard from './PollHomeCard'

function PollHome() {
  const name = localStorage.getItem('user');
  const token = localStorage.getItem("site")
  const [questions, setQuestions] = useState([]);
  //const [owner, setOwner] = useState('')

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/pools/by-user/"+name, {
      method: "GET",
      headers: {
        "Content-Type": "application",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setQuestions(data);
  }


  useEffect(() => {
    fetchData()
  }
    , []);

  return (
    <div className='container99'>
        <Navbar></Navbar>
        <div className='Boxcontainer99'>
            {questions.map((question) => {
              return <PollHomeCard date={question.created_at} question={question.title} Status=" Pending" id={question._id}></PollHomeCard>
            })}
      

        </div>

    </div>
  )
}

export default PollHome