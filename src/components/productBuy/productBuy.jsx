import React, { useState } from "react";
import LoginNavbar from "../LoginNavbar/LoginNavbar";
import book from "./book.png";
const ProductBuy = (props) => {
  const [productImg, setProductImg] = useState(book);

  return (
    <>
      <LoginNavbar />
      <div className="main flex">
        <div className="left w-1/2">
          {/* replace this image src with props.image to make the banner dynamic */}

          <img
            src="https://img.freepik.com/free-vector/love-banner-with-happy-couple-romantic-vacation_107791-7059.jpg?q=10&h=200"
            className="h-32 w-full ml-3 -mt-8 rounded-lg"
          ></img>

          <p className=" mx-3 my-1 text-[2rem] ">{props.product.title}</p>
          <div className="flex">
            <p className="mx-4 text-slate-400 text-xs ">
              {props.product.wordcount} words
            </p>
            {props.product.tested==="true"&&  <p className="flex mx-3 text-slate-400 text-xs">
              Tested
              <svg className="mx-2 -my-[1px]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#c8e6c9"
                  d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                ></path>
                <polyline
                  fill="none"
                  stroke="#4caf50"
                  stroke-miterlimit="10"
                  stroke-width="4"
                  points="14,24 21,31 36,16"
                ></polyline>
              </svg>
            </p>}
          </div>
          <hr className="mx-5 my-5"/>
          <p className="text-justify mx-5">
            {props.product.description}
          </p>
          <p>
            
          </p>
        </div>

        <div className="right w-1/2">
          <img
            className=" h-80 m-10 -mt-8 rounded-lg"
            src={productImg}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default ProductBuy;
