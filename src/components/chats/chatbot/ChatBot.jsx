import { useState } from "react";
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


const API_KEY = import.meta.env.VITE_OPEN_API_API_KEY;

console.log(API_KEY);

function ChatBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello I am ChatGpt",
      sender: "ChatGPT",
    },
  ]);
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    //all the old msg, + new messages :
    const newMessages = [...messages, newMessage];
    //update the message state :
    setMessages(newMessages);
    // set typing indicator (chatgpt is typing)
    setTyping(true);
    await processMessagetoChatGPT(newMessages);
  };
  async function processMessagetoChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
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

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log("Error Generated :", data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }
  return (
    <>
      <div className="App">
      <div className="chat-heading">
        <h1>ChatBot</h1>
        
      </div>
        <div  >
          <MainContainer className="cht-container">
            <ChatContainer>
              <MessageList  style={{backgroundColor: "#0F1015"}}
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="chat bot is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                className="in-field"
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
