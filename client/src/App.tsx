import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';


import Admin from './components/admin/Admin';
import Login from './components/account/Login';
import UserView from './components/user/UserView';
import CreateExam from './components/createExam/CreateExam';


function App() {
  return (
    <div className="App">


     <BrowserRouter>

     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/user' element={<UserView/>}/>

      <Route path='/admin' element={<Admin/>}/>
      <Route path='/exam' element={<CreateExam/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
