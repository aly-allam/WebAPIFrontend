import React, {useState} from 'react'
import './navbar.css'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'
import { BrowserRouter as Router, Switch, 
  Route, Redirect,} from "react-router-dom";

const Navbar = () => {
  const[active, setActive] = useState('navBar')
  const showNav = ()=>{
    setActive('navBar activeNavbar')
  }

  const removeNavbar = ()=>{
    setActive('navBar')
  }

  return (
    <section className='navBarSection'>
      <header className="header flex">

        <div className="logoDiv">
          <a href="/" className="logo flex">
            <h1><MdOutlineTravelExplore className="icon"/> Travel.</h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">

          <li className="navItem">
              <a href="admin" className="navLink">Admin</a>
            </li>
            
            <li className="navItem">
              <a href="/" className="navLink">Home</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Packages</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">About</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Pages</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">New</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Contact</a>
            </li>

            {/* <button className='btn'>
              <a href="/admin">ADMIN</a>
            </button> */}
          </ul>

          <div onClick={removeNavbar} className="closeNavBar">
            <AiFillCloseCircle className ="icon"/>
          </div>
        </div>

        <div onClick={showNav} className="toggleNavBar">
          <TbGridDots className = "icon"/>
        </div>

      </header>
    </section>
  )
}

export default Navbar