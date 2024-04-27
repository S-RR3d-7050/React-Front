
import React, { useEffect, useState } from 'react'
import './Poll.css'
import icon10 from '../assets/icon10.png'
import Create from '../components/buttons/Create'
import Cancel from '../components/buttons/Cancel'
import { Link } from 'react-router-dom'
import { useAuth } from "../hooks/AuthProvider";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom'



function Poll() {
    
        //const animatedComponents = makeAnimated();

        const navigate = useNavigate()
        const [answer2, setAnswer2] = useState();
        const [answer3, setAnswer3] = useState('Options...');
        const [answer4, setAnswer4] = useState();
        const [userName, setUsername] = useState([])
        const user = useAuth();
        //const name = user?.user?.username;
        const name = localStorage.getItem('user');



        const handleInputChange1 = (e) => {
            setAnswer2(e.target.value);
        };
        const handleInputChange2 = (e) => {
            setAnswer3(e.target.value);
        };
        const handleInputChange3 = (e) => {
            setAnswer4(e.target.value);
        };

        const handleInput = (e) => {
            let values = Array(e.target.selectedOptions.length).fill().map((_, i) => e.target.selectedOptions.item(i).value);
            console.log("select values", values);
            setUsername(values);
        }

        

        const handleCancel = () => {
            setAnswer2(''); // Clear the input field
            setAnswer3('');
            setAnswer4('');
           
        };


        const [options, setOptions] = useState([
            { id: 1, placeholder: 'option1', value: ''},
            { id: 2, placeholder: 'option2', value: '' }
        ]);

        const addOption = () => {
            // Generate the next option ID and placeholder
            const nextId = options.length + 2;
            const nextPlaceholder = `option${nextId}`;
            // Add the new option to the state
            setOptions(options => [...options, { id: nextId, placeholder: nextPlaceholder, value: ''}]);
        };
        const DeleteOption = () => {
            if (options.length > 1) {  // Ensures at least the first input remains
                setOptions(options => options.slice(0, -1));
            }
        }

        //                 <button className='button33' onClick={addOption}>Add</button>

      

        const [users, setUsers] = useState([{
            _id: 1,
            username: "User1"
        },
        {
            _id: 2,
            username: "User2"
        },
        {
            _id: 3,
            username: "User3"
        },
        {
            _id: 4,
            username: "User4"
        },
        {
            _id: 5,
            username: "User5"
        }
        ]);

        
        const token = localStorage.getItem("site")

        const fetchUsers = async () => {
            const response = await fetch("http://localhost:8000/auth/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setUsers(data);

            // we need to format
        }


        const sendData = async (u, x) => {
            const response = await fetch("http://localhost:8000/pools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: answer2,
                    options: x,
                    created_by: name,
                    assigned_users: u
                }),
            });

            const data = await response.json();
            console.log(data);
        }

     

        const handleSubmitEvent = async (e) => {
            e.preventDefault();
            if (answer2 !== "") {

                const optionValues = options.map(option => option.value);
                console.log(optionValues);
                // make them an array of strings
                //const a = optionValues.join(', ');
                // From the users only return the users.username
                //const us = users.map(us => us.username);
                console.log("usernames", userName);
                sendData(userName, optionValues);
                navigate('/HOME')
                handleCancel();
            } else {
                alert("Please provide a question and at least two options.");
            }
        }

        useEffect(() => {
            fetchUsers();
        }
            , []);

        return (
            <div className='container33'>
                <form onSubmit={handleSubmitEvent}>
                <div>
                    <p className='text33'>Create ur pool here (2 Options Supported)</p>
                    <input type='text' className='input33' placeholder='Enter your title here...' value={answer2}  onChange={handleInputChange1}></input>
                </div>
                <br></br>
                <div>
                    <p className='text332'>Poll Answers</p>
                    <div className='litcont33'>
                        <input type='text' className='input332' placeholder='option1' value={answer3} 
                        
                            onChange={handleInputChange2}
                         ></input>
                        <img src={icon10} className='image33' onClick={DeleteOption}></img>
                    </div>
                    <br></br>
                    {options.map(option => (
                        <div key={option.id} className='litcont33'>
                            <input type='text' className='input333' placeholder={`Eg. ${option.placeholder}`} value={option.value}
                            
                                onChange={e => {
                                    const value = e.target.value;
                                    setOptions(options => options.map(o => {
                                        if (o.id === option.id) {
                                            return { ...o, value };
                                        }
                                        return o;
                                    }));
                                }
                                }
                            ></input>
                            <img src={icon10} className='image33' onClick={DeleteOption}></img>
                        </div>
                    ))}
                    <br></br>
                </div>
                <br></br>
                <br></br>

                <div>
                    <p className='text33'>Add Participants</p>
                </div>

                <div class="dropdown">
                    <select value={userName} onChange={handleInput} multiple>
                    {
                        users.map(user => (
                            <option key={user._id} value={user.username}>{user.username}</option>
                        ))
                    }

                    </select>
                </div>
                <div class="buttons">

                    <Link to='/HOME'><Cancel onClick={handleCancel}></Cancel></Link>
                    <Create ></Create>
                    
                </div>
                </form>
            </div>

        )
    }

    export default Poll
