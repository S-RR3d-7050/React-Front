import React, {useEffect, useState} from 'react'
import './Tableau.css'
import icon9 from '../../assets/icon9.png'
import { Link } from 'react-router-dom';

const mockData = [
    { itemId: '#1233548', type: 'Poll', count: 55, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Poll', count: 55, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Poll', count: 55, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Poll', count: 55, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Poll', count: 55, creationDate: '25/02/2024' },
    { itemId: '#1233548', type: 'Question', count: 552, creationDate: '25/02/2024' },
   
   
    
    
    // ... add the rest of your data here
  ];


  
  const Tableau = () => {
    //const user = localStorage.getItem('user');
    const token = localStorage.getItem('site');
    const [items, setItems] = useState([]);

    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/auth/datatable', {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setItems(data);
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    }

    const formatId = (id) => {
      // return the only 5 letters of id with a '#' in front of it
      return '#' + id.slice(0, 5);
    }

    useEffect(() => {
      fetchData();
    }
      , []);


    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Count</th>
            <th>Creation Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{formatId(item._id)}</td>
              {
                item.type === 'pool' && <td>{item.title}</td>
              }
              {
                item.type === 'question' && <td>{item.content}</td>
              }
              <td>{item.type}</td>
              <td>{item.response_count}</td>
              <td>{formatDate(item.created_at)}</td>
              <td>
              {
                item.type === 'pool' && <Link to={ '/createdpoll/'+item._id } style={{textDecoration:"none"}}>                <button className="view-button">
                  <span className="eye-icon"><img src={icon9}></img></span>
                </button></Link>
              }
              {
                item.type === 'question' && <Link to={ '/createdquestion/'+item._id } style={{textDecoration:"none"}}>                <button className="view-button">
                  <span className="eye-icon"><img src={icon9}></img></span>
                </button></Link>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default Tableau