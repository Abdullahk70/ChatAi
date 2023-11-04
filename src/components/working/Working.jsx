import React from 'react'
import './Working.css'
import oneplus1 from '../../assets/images/OnePlus1.png';
import oneplus2 from '../../assets/images/OnePlus2.png';
import oneplus3 from '../../assets/images/OnePlus3.png';
import oneplus4 from '../../assets/images/OnePlus4.png';

const Working = () => {
  return (
    <div className='working-container'>
      <div className='working-heading'>
      How it works?
      </div>
      <div className='main-div'>
        <div className='div1'>
          <img src={oneplus1} alt="" />
        </div>
        <div className='div2'>
          <h1>ChatBot</h1>
          <p>Engage in dynamic conversations with our AI-powered chat bot, GPT-3 and GPT-4. Get real-time responses, answers, and have meaningful dialogues on a wide range of topics. </p>
        </div>
      </div>
      {/*  2nd  */}
      <div className='main-div'>
        <div className='div3'>
        <h1>Upload & Ask</h1>
          <p>Unlock the knowledge within your documents. Upload a document, and our AI can process it, answer questions, and provide insights, making information retrieval effortless.</p>
        </div>
        
        <div className='div4'>
        <img src={oneplus2} alt="" />     
      </div>
      </div>
      {/*  */}
      <div className='main-div'>
        <div className='div1'>
          <img src={oneplus3} alt="" />
        </div>
        <div className='div2'>
          <h1>Link & Ask</h1>
          <p>Streamline your research with our website summarization tool. Simply provide a link, and our AI will generate concise, easy-to-read summaries, saving you time and effort.</p>
        </div>
      </div>
      {/*  */}
      <div className='main-div'>
        <div className='div3'>
        <h1>MarketPlace</h1>
          <p>Explore our marketplace for AI prompts. Access a wide array of pre-built prompts for various AI platforms, enhancing your projects and accelerating development.</p>
        </div>
        
        <div className='div4'>
        <img src={oneplus4} alt="" />     
      </div>
      </div>

    </div>
  )
}

export default Working