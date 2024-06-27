import React from 'react'
import {Routes,Route, Router} from 'react-router-dom'
import Login  from './pages/Login.jsx'
import Newaccount from './pages/Newaccount.jsx'
import Home from './pages/Home.jsx'
import PollandQues from './pages/PollandQues.jsx'
import Poll from './pages/Poll.jsx'
import Question from './pages/Question.jsx'
import AnswerPoll from './pages/AnswerPoll.jsx'
import AnswerQuestion from './pages/AnswerQuestion.jsx'
import PollHome from './pages/PollHome.jsx'
import QuestionHome from './pages/QuestionHome.jsx'
import CreatedPoll from './pages/CreatedPoll.jsx'
import CreatedQuestion from './pages/CreatedQuestion.jsx'
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";


function App() {
  return (
    <AuthProvider>
     
      <Routes>
      <Route path='login' element={<Login/>}></Route>
      <Route path ='register' element={<Newaccount/>}></Route>
      <Route path="/poll" element={<PrivateRoute component={Poll} />} />
      <Route path="/question" element={<PrivateRoute component={Question} />} />
      <Route path="/answerpoll" >
        <Route path=":id" element={<PrivateRoute component={AnswerPoll} />} />
      </Route>

        <Route path="/answerquestion" >
          <Route path=":id" element={<PrivateRoute component={AnswerQuestion} />} />
        </Route>
      <Route path="/pollhome" element={<PrivateRoute component={PollHome} />} />
      <Route path="/questionhome" element={<PrivateRoute component={QuestionHome} />} />
      <Route path="/createdquestion">
        <Route path=":id" element={<PrivateRoute component={CreatedQuestion} />} />
      </Route>
      <Route path="/createdpoll" element={<PrivateRoute component={CreatedPoll} />} >
        <Route path=":id" element={<PrivateRoute component={CreatedPoll} />} />
      </Route>
      <Route path="/HOME" element={<PrivateRoute component={Home} />} />
      <Route path="/Choice" element={<PrivateRoute component={PollandQues} />} />

      </Routes>
    </AuthProvider>
   
  )
}

export default App