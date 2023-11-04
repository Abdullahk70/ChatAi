import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-div'>
      <div className='column1'>
          <h1>NOAH</h1>
      </div>
      <div className='column2'>
          <h2>CHAT-BOT</h2>
          <a href="#" className='achor'>Home</a> <br />
          <a href="#" className='achor'>Chat With AI</a> <br />
      </div>
      <div className='column3'>
          <h2>MARKETPLACE</h2>
                <a href="#" className='achor'>Terms of Use</a> <br />
                <a href="#" className='achor'>Privacy Policy</a> <br />
                <a href="#" className='achor'>Cookie Policy</a> <br />
      </div>
      <div className='column4'>
                <h2>NEWSLETTER</h2>
                <p>Stay up to date</p>
                <input type="email" placeholder='Enter your email' className='textfield'/> <br />
                <button className='btn'>Subscribe</button>
      </div>
    </div>
  )
}
export default Footer