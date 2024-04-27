import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Export from '../components/buttons/Export'
import Delete from '../components/buttons/Delete'
import { useParams, useNavigate } from 'react-router-dom';
import style from '../components/buttons/Delete.module.css'
import icon6 from '../assets/icon6.png'


function CreatedPoll() {
  let { id } = useParams();
  const token = localStorage.getItem('site');
  const [results , setResults] = useState([]);
  const [pool , setPool] = useState([]);
  const navigate = useNavigate();

  const fetchResults = async () => {
    const response = await fetch('http://localhost:8000/responses/count/pool/choice/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setResults(data);
  }

  const fetchPool = async () => {
    const response = await fetch('http://localhost:8000/pools/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setPool(data);
  }

  const deletePool = async () => {
    const response = await fetch('http://localhost:8000/pools/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    
  }

  const handleDelete = () => {
    deletePool()
    navigate('/HOME')
  }


  useEffect(() => {
    fetchResults()
    fetchPool()
  }
    , []);


  return (
    <div className='layout-container55'>
      <Navbar></Navbar>
      <div className='container777'>
        <div className='Cont44'>
          <p className='text33'>{pool.title}</p>
        </div>
        <br></br>
        <br></br>
        <div className='contBox44'>
        {
          results.map((result) => {
            return <div style={{ display: "flex", alignItems: "center", gap: "10px" }} key={result.option}>
              <div className='Box44'>
                <div style={{ opacity: "50%" }}>{result.option}</div>
              </div>
              <div className='value44' style={{ fontWeight: "420", fontSize: "21px", fontFamily: "'Roboto', sans-serif" }}>
                {result.count}
              </div>
            </div>
          })
        }

          <div class="buttons777">

          <Delete onClick={handleDelete} ></Delete>
          


          </div>

        </div>
      </div>

    </div>
  )
}

export default CreatedPoll