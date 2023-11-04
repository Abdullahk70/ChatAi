import React from 'react'
import Navbar from '../navbar/Navbar'
import ChatBot from './chatbot/ChatBot'
import Upload from './upload and ask/Upload'
import Link from './link and ask/Link'
import { useState } from 'react'
import './Chats.css'

const Chats = () => {
  const [activeComponent, setActiveComponent] = useState('ChatBot');
  const [activeButton, setActiveButton] = useState('ChatBot');
  const [bool, setBool] = useState(true)
  const renderComponent = (componentName) => {
    setActiveButton(componentName);
    switch (componentName) {
      case 'ChatBot':
        setActiveComponent(<ChatBot />);
        break;
      case 'Link':
        setActiveComponent(<Link />);
        setBool(false)
        break;
      case 'Upload':
        setActiveComponent(<Upload />);
        setBool(false)
        break;
      default:
        setActiveComponent(null);
        break;
    }
  };

  return (
    <>
      <div style={{backgroundColor: '#14151C'}}>
    <Navbar />
      </div>
      <div className='chat-container'>
      <div className='side-bar'>
         <button onClick={() => renderComponent('ChatBot')} className={activeButton === 'ChatBot' ? 'active' : ''} style={{marginTop: '1.3rem'}}>ChatBot</button> <br />
         <button onClick={() => renderComponent('Upload')} className={activeButton === 'Upload' ? 'active' : ''}>Upload & Ask</button> <br />
         <button onClick={() => renderComponent('Link')} className={activeButton === 'Link' ? 'active' : ''}>Link & Ask</button> 
        </div>
      <div className='chats'>

        {bool ? <ChatBot /> : activeComponent}
        </div>

      </div>

    </>
  )
}

export default Chats