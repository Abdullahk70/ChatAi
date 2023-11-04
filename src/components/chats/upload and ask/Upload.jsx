// import React from 'react'
// import './Upload.css'
// import Uploadpic from "../../../assets/images/Upload-icon.svg";
// import pluspic from "../../../assets/images/Plus.svg";
// import sendpic from "../../../assets/images/send.svg";
// import { useState } from 'react';

// const Upload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setSelectedFile(selectedFile);
//   };
//   const handleUpload = () => {
//     setUploading(true);
//     // Simulate file upload process
//     setTimeout(() => {
//       setUploadProgress(25);
//     }, 1000);
//     setTimeout(() => {
//       setUploadProgress(50);
//     }, 2000);
//     setTimeout(() => {
//       setUploadProgress(75);
//     }, 3000);
//     setTimeout(() => {
//       setUploadProgress(100);
//       setUploading(false);
//       alert("Upload completed!");
//     }, 4000);
//   };
//   // <script>
//   const displaySelectedFile = () => {
//     const fileInput = document.getElementById("fileInput");

//     if (fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       const fileName = file.name;
//       const fileType = file.type;

//       // Check if the selected file has a valid MIME type
//       if (
//         fileType === "application/msword" || // .doc
//         fileType ===
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
//         fileType === "application/pdf"
//       ) {
//         // .pdf
//         alert(`Selected file: ${fileName}`);
//       } else {
//         alert("Please select a valid Word (.doc/.docx) or PDF (.pdf) file.");
//         // Reset the input field to clear the selected file
//         fileInput.value = "";
//       }
//     }
//   };
//   return (
//     <>
//       <div className="upload-container">
//         <h1>Upload</h1>
//         <div className="file" >
//           <input
//             type="file"
//             id="fileInput"
//             accept=".doc, .docx, .pdf"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//             onchange={displaySelectedFile}
//           />
//           <label for="fileInput">
//             <img src={Uploadpic} alt="" />
//           </label>
//           <h2>Drag & drop files or Upload</h2>
//           <p>Supported formates: Docx, PDF</p>
//           <button onClick={handleUpload} disabled={!selectedFile}>
//             Upload
//           </button>

//           {uploading && <div>Uploading... {uploadProgress}%</div>}
//         </div>
//         <div className="input-text">
//           <img src={pluspic} alt="" />
//           <input type="text" placeholder="Enter Your Prompt" />
//           <img src={sendpic} alt="" />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Upload

import React, { useState } from 'react';
import './Upload.css';
// import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Uploadpic from '../../../assets/images/Upload-icon.svg';
import pluspic from '../../../assets/images/Plus.svg';
import sendpic from '../../../assets/images/send.svg';
const API_KEY = import.meta.env.VITE_OPEN_API_API_KEY;
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Upload = () => {
  const [typing, setTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messages, setMessages] = useState([
   
  ]);

  async function processMessagetoChatGPT(question, documentText) {
    setTyping(true);
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "This is the user's question:" },
        { role: "user", content: question },
        { role: "system", content: "This is the document text:" },
        { role: "user", content: documentText },
      ],
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
        console.log("Res Generated :", data);
        console.log(data.choices[0].message.content);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        console.log(messages);
        setTyping(false);
      });
  }
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      // const reader = new FileReader();
      // reader.onload = async function (ev) {
      //   const pdfData = new Uint8Array(ev.target.result);
      //   const pdfDocument = await pdfjsLib.getDocument({ data: pdfData }).promise;
      //   const page = await pdfDocument.getPage(1);
      //   const content = await page.getTextContent();
      //   setExtractedText(content.items.map(item => item.str).join(' '));
      //   console.log(content.items.map(item => item.str).join(' '));
      // };
      // reader.readAsArrayBuffer(file);
      // Initialize FileReader to read the file
      const reader = new FileReader();

      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);

        // Load the PDF file
        const loadingTask = getDocument(typedArray);
        const pdf = await loadingTask.promise;

        let extractedText = '';

        // Loop through each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Extract text from the page
          const textContent = await page.getTextContent();
          const strings = textContent.items.map((item) => item.str).join(' ');

          extractedText += strings + '\n'; // Add the page text to the overall text
        }

        // Do something with extractedText
        setExtractedText(extractedText);
        console.log(extractedText);
      };

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      mammoth.extractRawText({ arrayBuffer: file }).then(function (result) {
        setExtractedText(result.value);
        console.log(result.value);
      }).catch(function (err) {
        console.log(err);
      });
    }

    setSelectedFile(file);
  };


  const handleUpload = () => {
    setUploading(true);

    //  Simulate file upload process
    setTimeout(() => {
      setUploadProgress(25);
    }, 500);
    setTimeout(() => {
      setUploadProgress(50);
    }, 1000);
    setTimeout(() => {
      setUploadProgress(75);
    }, 1500);
    setTimeout(() => {
      setUploadProgress(100);
      setUploading(false);
      // alert("Upload completed!");
    }, 2000);



  };
  
  const handleSubmit = async () => {
    // Max length for GPT-3
    const newMessage = {
      message: userQuestion,
      sender: "user",
      direction: "outgoing",
    };
    setMessages([...messages, newMessage]);
    const maxLength = 2048;

    // Prepare the user question
    const questionData = {
      message: userQuestion,
      sender: 'user',
    };

    // Prepare the document text, trimmed if needed
    let documentData = extractedText;
    let combinedLength = userQuestion.length + extractedText.length;
    if (combinedLength > maxLength) {
      // Calculate how many characters need to be removed from the document text
      const excessLength = combinedLength - maxLength;

      // Trim the document text to fit
      documentData = extractedText.slice(0, -excessLength);
    }

    // Add the user question to the chat messages
    setChatMessages([...chatMessages, questionData]);

    // Call the GPT model with the user question and trimmed document text
    await processMessagetoChatGPT(userQuestion, documentData);
  };

  return (
    <>
      <div className="upload-container">
        <h1>Upload</h1>

        {chatMessages.length == 0 && (
          <div className="file">
            <input
              type="file"
              id="fileInput"
              accept=".doc, .docx, .pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="fileInput">
              <img src={Uploadpic} alt="Upload Icon" />
            </label>
            <h2>Drag & drop files or Upload</h2>
            <p>Supported formats: Docx, PDF</p>
            <button onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </button>
            {uploading && <div>Uploading... {uploadProgress}%</div>}
          </div>


        )}
        {chatMessages.length > 0 && (
          <div>
            <MainContainer className="cht-container"
              style={{ marginLeft: '0rem' }}
            >
              <ChatContainer>
                <MessageList style={{ backgroundColor: "#0F1015" }}
                  scrollBehavior="smooth"
                  typingIndicator={
                    typing ? (
                      <TypingIndicator content="NOAH Bot is typing" />
                    ) : null
                  }
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message} />;
                  })}
                </MessageList>

              </ChatContainer>
            </MainContainer>
          </div>
        )}
        <div className="input-text">
          <img src={pluspic} alt="" />
          <input
            type="text"
            placeholder="Enter Your Prompt"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          {/* <button onClick={handleSubmit}> */}
          <img src={sendpic} alt="Send Icon" onClick={handleSubmit} />
          {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Upload;
