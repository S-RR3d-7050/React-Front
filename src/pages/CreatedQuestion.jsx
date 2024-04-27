import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Export from '../components/buttons/Export'
import Delete from '../components/buttons/Delete'
import { useParams, useNavigate } from 'react-router-dom';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';



function CreatedQuestion() {
    let { id } = useParams();
    const token = localStorage.getItem('site');
    const [questions, setQuestions] = useState([]);
    const [results , setResults] = useState([]);


    // question_id


    const fetchResults = async () => {
        const response = await fetch('http://localhost:8000/responses/count/question/choice/' + id, {
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


    const fetchQuestion = async () => {
        const response = await fetch('http://localhost:8000/questions/' + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setQuestions(data);
      }

      const deleteQuestion = async () => {
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
        deleteQuestion()
        navigate('/HOME')
      }

      useEffect(() => {
        fetchResults()
        fetchQuestion()
      }
        , []);
    
/*
    const words = [
        { text: 'Cool', size: 24, color: 'blue', top: '20%', left: '10%', fontWeight: 300 },
        { text: 'Happy', size: 30, color: 'green', top: '10%', left: '50%', fontWeight: 800 },
        { text: 'okay', size: 20, color: 'red', top: '50%', left: '20%', fontWeight: 400 },
        { text: 'Tired', size: 22, color: 'blue', top: '40%', left: '70%', fontWeight: 700 },
        { text: 'relaxed', size: 26, color: 'green', top: '70%', left: '30%', fontWeight: 600 },
        { text: 'Busy', size: 18, color: 'blue', top: '80%', left: '60%', fontWeight: 900 },
        { text: 'fine', size: 16, color: 'red', top: '60%', left: '10%', fontWeight: 500 },
        { text: 'good', size: 28, color: 'green', top: '30%', left: '80%', fontWeight: 300 },
    ];
    */
    return (
        <div className='layout-container55'>
            <Navbar></Navbar>
            <div className='container777'>
                <div className='Cont44'>
                    <p className='text33'>{questions.content}</p>
                </div>
                <br></br>
                <br></br>
                <div className="word-cloud">
                <ReactWordcloud words={results} />
                </div>

                <div class="buttons777">

                <Delete onClick={handleDelete} ></Delete>

                </div>

            </div>
        </div>


    )
}

export default CreatedQuestion