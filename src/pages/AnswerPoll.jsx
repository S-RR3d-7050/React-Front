import React, { useEffect, useState } from 'react';
import Submit from '../components/buttons/Submit'
import Cancel from '../components/buttons/Cancel'
import { useParams, useNavigate } from 'react-router-dom';


function AnswerPoll() {
    let { id } = useParams();
    
    const user = localStorage.getItem('user');

    const history = useNavigate();
    const token = localStorage.getItem('site');

    const [choices, setChoices] = useState([]);
    const [pool , setPool] = useState([]);

    const [selected, setSelected] = useState('');

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
              pool_id: id,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
      }

    const fetchData = async () => {
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

      };
    

    const handleSelect = (choice) => {
        //setSelected(choice);
        /*
        Answer(choice);

        // Redirect to the home page
        history('/HOME');


        */
        setSelected(choice);
       console.log(selected);
    };

    const handleSubmit = () => {
        Answer(selected);
        // Redirect to the home page
        history('/HOME');

       
    };

    useEffect(() => {
        fetchData();
      }
        , []);
    return (
        <div className='container44'>
            <div className='Cont44'>
                <p className='text33'>{pool.title}</p>
                <p className='text44'>{pool.description}</p>
            </div>
            <br />
            <div className='contBox44'>
             {
                // Loop through the choices and display them
                pool.options &&
                pool.options.map((choice) => {
                    return (
                        <div
                            className={`Box44 ${selected === choice ? 'selected' : ''}`}
                            onClick={() => handleSelect(choice)}
                        >
                            {choice}
                        </div>
                    );
                })
             }
   
                <div className="buttons44">
                    <Submit onClick={handleSubmit}></Submit>
                    
                    <Cancel onClick={() => setSelected('')}></Cancel>
                </div>
            </div>
        </div>
    )
}

export default AnswerPoll