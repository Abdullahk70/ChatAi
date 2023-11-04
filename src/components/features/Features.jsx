import React from 'react'
import './Features.css'
import chatbot from '../../assets/images/chatbot.png'
import link from '../../assets/images/link.png'
import page from '../../assets/images/page.png'
import material from '../../assets/images/material.png'
import {Link} from 'react-router-dom'
const Features = () => {
  return (
    <div className='feature-container'>
      <div className='feature-heading'>
         Features
      </div>
      <div className='div-container'>
      <div className='box1'>
           <img src={chatbot} alt="ChatBot"/> <br />
           <Link to='chats' className="lnk">ChatBot </Link>
           <p>Choose your doctor from thousands of specialist, general, and trusted hospitals</p>
        </div>
        <div className='box1'>
           <img src={page} alt="ChatBot"/> <br />
           <Link to='#' className="lnk">Upload & Ask </Link>
           <p>Buy your medicines with our mobile application with a simple delivery system</p>
        </div>
        <div className='box1'>
           <img src={link} alt="ChatBot"/> <br />
           <Link to='#' className="lnk">Link & Ask </Link>
           <p>Free consultation with our trusted doctors and get the best recomendations</p>
        </div>
        <div className='box1'>
           <img src={material} alt="ChatBot"/> <br />
           <Link to='#' className="lnk">MarketPlace </Link>
           <p>Free consultation with our trusted doctors and get the best recomendations</p>
        </div>
      </div>
    </div>
  )
}

export default Features