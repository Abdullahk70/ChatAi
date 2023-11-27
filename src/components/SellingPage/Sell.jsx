import { useState } from 'react';
import React from 'react';
import sendpic from '../../assets/images/send.svg';
import Uploadpic from '../../assets/images/Upload-icon.svg';
const Sell = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [iconSrc, setIconSrc] = useState(sendpic); 


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


  return (
    <div className="w-full h-full items-center content-center place-content-start">
      <div className="file " style={{ width:"30rem",height:"7rem",alignItems:"center",alignContent:"center" }} >
            <input
              type="file"
              id="fileInput"
              accept=".doc, .docx, .pdf"
              className="w-96 items-center content-center"
              onChange={handleFileChange}
              style={{ display: 'none'}}
            />
            <label htmlFor="fileInput" className="items-center content-center"> 
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
  )
}

export default Sell
