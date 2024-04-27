import React from 'react'
import './Pollandquestion.css'
import { Link } from 'react-router-dom'



function PollandQues() {
  return (
   <div className='page22'>
         <div className='container22'>
         <Link to='/Poll' style={{textDecoration:"none",color:"black"}}>
         <div className='com1'>
            New Poll
        </div>
         </Link>
        
           
           <Link to="/Question" style={{textDecoration:"none",color:"black"}}>
           <div  className='com1'>
            New Question
            </div>
           </Link>
           
          </div>
          <button className='button222'>
             Cancel
          </button>

   </div>
  )
}

export default PollandQues