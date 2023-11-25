import React from 'react'
import pp from "./pp.png"
const LoginNavbar = () => {
    const profilePicture=pp;
  return (
    <div id="header">
    <div id="logo">
      <h1 className='text-[33px]'>NOAH</h1>
    </div>
    <div id="search-box">
      <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input type="text" id="search" name="search" placeholder="Search items and collections" />
    </div>
    <div id="buttons">
      <button id="chatbot">ChatBot</button>
      <button id="marketplace">Marketplace</button>
      <button id="sell-button">Sell</button>
      <div className="profile">
        <a href={`path/to/profile.jsx`}>
          <img src={profilePicture} alt="Profile Picture" width="30" height="30" />
        </a>
        <span className="username">Nana Tana</span>
        <div className="dropdown-icon">
          <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginNavbar
