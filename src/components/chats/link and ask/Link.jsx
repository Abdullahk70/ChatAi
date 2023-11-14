import React, { useRef, useState } from 'react'
import './Link.css'
import Linkpic from '../../../assets/images/link.svg'
import pluspic from "../../../assets/images/Plus.svg";
import sendpic from "../../../assets/images/send.svg";
import chatbot from "../../../assets/images/chatbot.PNG";
import pending from "../../../assets/images/pending.PNG";
import axios from 'axios';
const API_KEY = import.meta.env.VITE_OPEN_API_API_KEY;

console.log(API_KEY);
const Link = () => {

  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [iconSrc, setIconSrc] = useState(sendpic); // sendpic and cancelIcon are the paths to your icons
  const abortControllerRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [messageData, setMessageData] = useState([
    {
      message: "Hello I'm NOAH BOT",
      role: "assistant",
    },
   

  ]);
  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(text => setUrl(text))
      .catch(err => console.error('Failed to read clipboard contents: ', err));
  };

  const summarizeURL = async (url) => {
    const response = await axios.post("https://attractgame.com/backend/api/getUrlData", {
      url: url
    });
    return response.data;

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

  console.log(API_KEY);
 
  const handleSend = async () => {
    setIsSending(true);
    setIconSrc(pending);

    if (!url || !question) {
      alert('Please enter both a URL and a question');
      setIsSending(false);
      setIconSrc(sendpic);
      return;
    }

    setMessageData([...messageData, { message: question, role: "user" }]);
    setUrl('');
    setQuestion('');
    const summarizedData = await summarizeURL(url);

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: summarizedData?.content },
        { role: "user", content: question }
      ]
    };

    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
        signal: abortControllerRef.current.signal
      });

      const data = await response.json();

      setMessageData([...messageData, { message: data.choices[0].message.content, role: "assistant" }]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      if (error.name !== 'AbortError') {
        setMessageData([...messageData, { message: "Error in processing request", role: "user" }]);
      }
    } finally {
      setIsSending(false);
      setIconSrc(sendpic);
    }
  };
  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the fetch request
    }
    setIconSrc(sendpic); // Reset the icon to the original
    setMessageData([
      ...messageData,
      { message: "Request canceled", role: "user" }
    ]);
  };
  return (
    <div >
      <div className="link-container">


        <div
          className='link-main'
        >
          <h1>Link & Ask</h1>


          <div className="link">
            <img src={Linkpic} alt="link-pic" className='link-img' /> <br />
            <input type="text" placeholder='Place your link here....' value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className='p-btn' onClick={handlePaste}
              style={{ cursor: "pointer" }}

            >Paste

            </button> <br />
            <button className="s-btn" onClick={handleSummarize}>Summarize</button>

          </div>
        </div>

        <div className="message_screen_main">
          {messageData.map((data) => {
            return (
              <div
                className="message_container"
                style={{
                  flexDirection:
                    data.role === "user" &&
                    "row-reverse",
                }}
              >
                <div className="message-container-profile">
                  {data.role === "assistant" && <img src={chatbot} alt="profile" className='bot-profile-img' />

                  }

                </div>
                <div className={data.role === "assistant" ? "message_text_container personOne" : "message_text_container personTwo"}>
                  {data.message}
                </div>
              </div>
            );
          })}

        </div>
        <div className='input-text'>
          {/* <img src={pluspic} alt="" /> */}
          <input type="text" placeholder="Enter Your Prompt"
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSend();
              }
            }}
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          {/* <img src={iconSrc} alt="send" onClick={handleSend} /> */}
          <img src={iconSrc} alt="send" onClick={isSending ? handleCancel : handleSend} />
        </div>
      </div>
    </div>
  )
}

export default Link