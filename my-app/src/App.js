import React from 'react'
import './app.css';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Components/Admin/Admin';
import Page from './Components/Page';
import {BrowserRouter as Router , Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div className='page'>
        <Navbar/>

        <div className='Component'>
          <Routes>
            <Route path='/' element ={<Page/>}/>
            <Route path='/admin' element ={<Admin/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App