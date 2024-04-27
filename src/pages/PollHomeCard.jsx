import React, { useEffect, useState  } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

function PollHome(props) {
  let linkP = '/AnswerPoll/'+props.id;
  let linkR = '/createdpoll/'+props.id;
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('site')
  const [owner, setOwner] = useState(false)
  const [responded, setResponded] = useState('Pending')

  const fetchOwner = async () => {
    const response = await fetch('http://localhost:8000/pools/'+props.id+'/owner/'+user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        Authorization: `Bearer ${token}`,
        },
        });
    const data = await response.json()
    console.log(data)
    if (data?.data === "YES")
    {
      setOwner(true)
      setResponded('Owner')
    }
  }

  const IsRespondedTo = async () => {
    const response = await fetch('http://localhost:8000/pools/'+props.id+'/has-responded/'+user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        Authorization: `Bearer ${token}`,
        },
        });
    const data = await response.json()
    console.log(data)
    if (data === true)
    {
      setResponded('Submitted')
    }
  }


  useEffect(() => {
    IsRespondedTo()
    fetchOwner()

  }
    , []);


  return (
    
        
            <div className='Box77'>
                <p>Invited On:{props.date}</p>
                <p>Topic:{props.question}</p>
                <p>Status:{ responded  }</p>
                <p>Id : {props.id}</p>
                {
                  responded === 'Pending' && <Link to={linkP} style={{textDecoration:"none"}}><button className='Button77'>Answer</button></Link>
                }
                {
                  !owner && responded  === 'Submitted' && <button className='Button77'>Edit</button>
                }
                {
                  owner && <Link to={linkR} style={{textDecoration:"none"}}><button className='Button77'>Results</button></Link>
                }


            </div>

        
    
  )
}

export default PollHome