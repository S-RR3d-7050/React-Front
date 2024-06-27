import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import QuestionHomeCard from './QuestionHomeCard';
import { useAuth } from '../hooks/AuthProvider';

function PollHome() {
  const name = localStorage.getItem('user');
  const token = localStorage.getItem('site');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/questions/by-user/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      /*
      if (data.StatusCode === 401) {
        auth.logOut();
      }
      */
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container99'>
      <Navbar />
      <div className='Boxcontainer99'>
        {loading ? (
          <p>Loading...</p>
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <QuestionHomeCard
              key={question._id}
              date={question.created_at}
              question={question.content}
              Status="Pending"
              id={question._id}
            />
          ))
        ) : (
          <h3>No Questions Found</h3>
        )}
      </div>
    </div>
  );
}

export default PollHome;
