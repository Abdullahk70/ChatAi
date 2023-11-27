import { useState } from "react";
import React from "react";
import sendpic from "../../assets/images/send.svg";
import Uploadpic from "../../assets/images/Upload-icon.svg";
import LoginNavbar from "../LoginNavbar/LoginNavbar";
import css from "./Sell.css";

const Sell = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [iconSrc, setIconSrc] = useState(sendpic);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        let content = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          content += textContent.items.map((item) => item.str).join(" ");
        }

        setExtractedText(content);
        console.log(content);
      };
      reader.readAsArrayBuffer(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      mammoth
        .extractRawText({ arrayBuffer: file })
        .then(function (result) {
          setExtractedText(result.value);
          console.log(result.value);
        })
        .catch(function (err) {
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
    <div>
      <LoginNavbar />
      <div className=" items-center  flex flex-col my-4 -mt-12">
        <div
          className="file align-middle  flex flex-col "
          style={{
            width: "27rem",
            height: "7rem",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <input
            type="file"
            id="fileInput"
            accept=".doc, .docx, .pdf"
            className="w-96 items-center content-center"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileInput"
            className="items-center content-center text-center"
          >
            <img src={Uploadpic} alt="Upload Icon" />
          </label>
          <h2 className="text-center">Drag & drop files or Upload</h2>
          <p className="text-center">Supported formats: Docx, PDF</p>
          <button
            onClick={handleUpload}
            className="items-center text-center content-center align-center "
            style={{
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
            }}
            disabled={!selectedFile}
          >
            Upload
          </button>
          {uploading && <div>Uploading... {uploadProgress}%</div>}
        </div>
      </div>
      <div className="items-center flex flex-col ">
        <p className=" text-slate-500 m-2 mt-4 flex flex-row text-center align-middle ">
          Name
        </p>
        <input
          placeholder="Name "
          className="w-4/12 p-[0.35rem] rounded-sm text-neutral-950"
          type="text"
        />
        <p className=" text-slate-500 m-2 flex flex-row text-center align-middle">
          Price
        </p>
        <input
          type="text"
          placeholder="Price"
          className="w-4/12 p-[0.35rem] rounded-sm text-neutral-950"
        />
        <p className=" text-slate-500 m-2 flex flex-row text-center align-middle ">
          Description
        </p>
        <textarea
          type="text"
          placeholder="Description"
          className="w-4/12 p-[0.35rem] text-neutral-950 rounded-sm"
          rows={"3"}
        />
        <button className="content-button w-1/3 my-5">Sell</button>
      </div>
    </div>
  );
};

export default Sell;
