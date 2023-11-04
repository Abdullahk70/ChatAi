import React from 'react'
import './Link.css'
import Linkpic from '../../../assets/images/link.svg'
import pluspic from "../../../assets/images/Plus.svg";
import sendpic from "../../../assets/images/send.svg";
const Link = () => {
  return (
    <div className="link-container">
      <h1>Link & Ask</h1>
      <div className="link">
        <img src={Linkpic} alt="link-pic" width={100}/> <br />
        <input type="text" placeholder='Place your link here....'/>
        <button className='p-btn'>Paste</button> <br />
        <button className="s-btn">Summarize</button>

      </div>
      <div className='input-text'>
      <img src={pluspic} alt="" />
          <input type="text" placeholder="Enter Your Prompt" />
          <img src={sendpic} alt="" />
      </div>
    </div>
  )
}

export default Link