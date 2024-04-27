import React, { useEffect, useState } from 'react';
import Submit from '../components/buttons/Submit';
import Cancel from '../components/buttons/Cancel';
import { useParams, useNavigate } from 'react-router-dom';

function AnswerQuestion() {
  const [answer, setAnswer] = useState('');
  let { id } = useParams();
  const user = localStorage.getItem('user');
  const history = useNavigate();
  const [question, setQuestion] = useState('');

  const token = localStorage.getItem('site');

  const Answer = async (answer) => {
    const response = await fetch(
      'http://localhost:8000/responses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: answer,
          user_id: user,
          question_id: id,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/questions/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setQuestion(data.content);
  };


  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    console.log(answer);
    Answer(answer);

    // Redirect to the home page
    history('/HOME');

    //setAnswer('');
  };

  const handleCancel = () => {
    setAnswer(''); // Clear the input field
  };

  useEffect(() => {
    fetchData();
  }
    , []);
  

  return (
    <div className='container335'>
      <div>
        <p className='text33'>{question}</p>
        <br></br>
        <br></br>
        <br></br>
        <input
          type='text'
          className='input33'
          placeholder='Answer with one word...'
          value={answer}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="buttons445">
        {/* Pass the event handlers to the custom components */}
        <Cancel onClick={handleCancel} />
        <Submit onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AnswerQuestion;
