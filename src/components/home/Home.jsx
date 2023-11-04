import React from 'react'
import './Home.css'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import robot1 from '../../assets/images/robot1.png'
import Features from '../features/Features'
import Working from '../working/Working'
import Footer from '../footer/Footer'

const Home = () => {
  return (
    <>
    <div className='home-container'>
        <Navbar />
        <div className='main-container'>
      {/* //create two div one for content and one for image :  */}
        <div className='content-container'>
        <div className='content-text'>
          <div className='main-heading'>
              NOAH AI
          </div>
          <div className='heading'>
          Your Gateway to Intelligent Assistance
          </div>
          <div className='sub-heading'>
          Welcome to an AI-Powered World, Where Every Interaction Unlocks the Infinite Potential of Technology
          </div>
          <Link to='chats' className="btn">ChatBot </Link>
        </div>
        </div>
        <div className='image-container'>
            <img src={robot1} alt="robot"  className='img'/>
        </div>
        </div>
    </div>
        <Features />
        <Working />
        <Footer />
    </>
  )
}

export default Home