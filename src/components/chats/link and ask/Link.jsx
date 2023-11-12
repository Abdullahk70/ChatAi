import React, { useState } from 'react'
import './Link.css'
import Linkpic from '../../../assets/images/link.svg'
import pluspic from "../../../assets/images/Plus.svg";
import sendpic from "../../../assets/images/send.svg";
const Link = () => {

  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(text => setUrl(text))
      .catch(err => console.error('Failed to read clipboard contents: ', err));
  };


  const handleSummarize = async () => {
    if (!url) {
      alert('Please paste a URL first');
      return;
    }
    // Replace with actual API call
    const summarizedData = await summarizeURL(url);
    setSummary(summarizedData);
  };
  return (
    <div className="link-container">
      <h1>Link & Ask</h1>
      <div className="link">
        <img src={Linkpic} alt="link-pic" width={100} /> <br />
        <input type="text" placeholder='Place your link here....' value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className='p-btn' onClick={handlePaste}
          style={{ cursor: "pointer" }}

        >Paste

        </button> <br />
        <button className="s-btn" onClick={handleSummarize}>Summarize</button>

      </div>
      <div className='input-text'>
        <img src={pluspic} alt="" />
        <input type="text" placeholder="Enter Your Prompt"

        />
        <img src={sendpic} alt="" />
      </div>
    </div>
  )
}

export default Link