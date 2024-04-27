import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import QuestionHomeCard from './QuestionHomeCard'
import { useAuth } from "../hooks/AuthProvider";


function PollHome() {

  const name = localStorage.getItem('user');
  const token = localStorage.getItem("site")
  const [questions, setQuestions] = useState([]);
  const auth = useAuth();

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/questions/by-user/"+name, {
      method: "GET",
      headers: {
        "Content-Type": "application",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    /*
    if (data.StatusCode === 401)
    {
      auth.logOut();
    }
    */
    setQuestions(data);
  }


  useEffect(() => {
    fetchData()
  }
    , []);

  return (
    <div className='container99'>
      {
        questions &&
        <>
        <Navbar></Navbar>
        <div className='Boxcontainer99'>
            {questions?.map((question) => {
              return <QuestionHomeCard date={question.created_at} question={question.content} Status=" Pending" id={question._id} ></QuestionHomeCard>
            })}   
           
        </div>
        </>
      }
      {
        !questions &&
        <div>
          <Navbar></Navbar>
          <div className='Boxcontainer99'>
            <h1>No Questions Found</h1>
          </div>
        </div>
      }
       

    </div>
  )
}

export default PollHome