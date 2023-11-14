import { useRef, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import './ChatBot.css'

import sendpic from "../../../assets/images/send.svg";
import chatbot from "../../../assets/images/chatbot.PNG";
import pending from "../../../assets/images/pending.PNG";

const API_KEY = import.meta.env.VITE_OPEN_API_API_KEY;

console.log(API_KEY);

function ChatBot() {
  const [typing, setTyping] = useState(false);
  const [question, setQuestion] = useState('');
  const [iconSrc, setIconSrc] = useState(sendpic); // sendpic and cancelIcon are the paths to your icons
  const abortControllerRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello I'm NOAH BOT",
      role: "assistant",
    },

  ]);
  const handleSend = async (message) => {
    setIsSending(true);
    setIconSrc(pending);
    const newMessage = {
      message: question,
      role: "user",

    };
    setQuestion("");
    //all the old msg, + new messages :
    const newMessages = [...messages, newMessage];
    //update the message state :
    setMessages(newMessages);


    await processMessagetoChatGPT(newMessages);
  };
  async function processMessagetoChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.role;

      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old.",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from OpenAI:", data);

      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          role: "assistant",
        },
      ]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      if (error.name !== 'AbortError') {
        // Handle other errors here
      }
    } finally {
      setIsSending(false);
      setIconSrc(sendpic);
    }
  }


  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the fetch request
    }
    setIconSrc(sendpic); // Reset the icon to the original
    setMessages([
      ...messages,
      { message: "Request canceled", role: "user" }
    ]);
  };
  return (
    <>
      <div className="App chat-parent-continer">
        <div className="chat-heading">
          <h1>ChatBot</h1>

        </div>
        <div className="messages_container" >
          <div className="chatbot_message_screen_main">
            {messages?.map((data, index) => {
              return (
                <div key={'chatbot' + index}
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
            <input type="text" placeholder="Enter Your Prompt"
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend();
                }
              }}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            />
            <img src={iconSrc} alt="send" onClick={isSending ? handleCancel : handleSend} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
