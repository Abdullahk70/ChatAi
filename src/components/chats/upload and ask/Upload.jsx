

import React, { useRef, useState } from 'react';
import './Upload.css';
// import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Uploadpic from '../../../assets/images/Upload-icon.svg';
import pluspic from '../../../assets/images/Plus.svg';
import sendpic from '../../../assets/images/send.svg';
import chatbot from "../../../assets/images/chatbot.PNG";
import pending from "../../../assets/images/pending.PNG";
const API_KEY = import.meta.env.VITE_OPEN_API_API_KEY;
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
// Ensure that the version of the worker matches the version of pdfjs-dist installed
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [iconSrc, setIconSrc] = useState(sendpic); // sendpic and cancelIcon are the paths to your icons
  const [isSending, setIsSending] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const abortControllerRef = useRef(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello I'm NOAH BOT",
      role: "assistant",
    },


  ]);

  async function processMessagetoChatGPT(question, documentText) {
    // Check if there's a previous request and cancel it if needed
    setIsSending(true);
    setIconSrc(pending);



    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "This is the user's question:" },
        { role: "user", content: question },
        { role: "system", content: "This is the document text:" },
        { role: "user", content: documentText },
      ],
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
      console.log("Res Generated :", data);
      console.log(data.choices[0].message.content);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.choices[0].message.content,
          role: "assistant",
        },
      ]);

      setExtractedText('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch abort error

    } finally {
      setIconSrc(sendpic);
      setIsSending(false);
      // Check if the abort controller is the same as the current one before setting to null

    }
  }



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        let content = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          content += textContent.items.map(item => item.str).join(' ');
        }

        setExtractedText(content);
        console.log(content);
      };
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
    if (selectedFile === null) {
      alert("Please Upload a file");
      return;
    }

    const newMessage = {
      message: userQuestion,
      role: "user",
    };
    setUserQuestion('');
    setMessages([...messages, newMessage]);
    const maxLength = 2048;



    // Prepare the document text, trimmed if needed
    let documentData = extractedText;
    let combinedLength = userQuestion.length + extractedText.length;
    if (combinedLength > maxLength) {
      // Calculate how many characters need to be removed from the document text
      const excessLength = combinedLength - maxLength;

      // Trim the document text to fit
      documentData = extractedText.slice(0, -excessLength);
    }

    // Call the GPT model with the user question and trimmed document text
    await processMessagetoChatGPT(userQuestion, documentData);
  };


  const handleCancel = () => {
    console.log("Canceling request");
    if (abortControllerRef.current) {

      abortControllerRef.current.abort(); // Cancel the fetch request
    }
    // Reset the icon to the original
    setIconSrc(sendpic);
    setMessages([
      ...messages,
      { message: "Request canceled", role: "user" }
    ]);
  };

  return (
    <div>

      <div className="upload-container">
        <div
          className='link-main'
        >

          <h1>Upload</h1>

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


        </div>
        <div className="message_screen_main">
          {messages.map((data) => {
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


        <div className="input-text">
          {/* <img src={pluspic} alt="" /> */}
          <input
            type="text"
            placeholder="Enter Your Prompt"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit();
              }
            }}
          />

          <img src={iconSrc} alt="send" onClick={isSending ? handleCancel : handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
