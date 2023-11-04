import React, { useState } from "react";
import "./Signup.css";
import backicon from "../../../assets/images/backbutton.png";
import weblogo from "../../../assets/images/web_logo.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("my user User iD : ", user.uid);
          const test = async () => {
            console.log("enter into test");
            await setDoc(doc(db, "TESTUSER", user.uid), {
              name: name,
            }).then(() => {
              console.log("successfully entered data");
              window.location.replace("/login");
            });
          };
          test();
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="signup-container">
      <div className="title">
        <div className="back-icon">
          <Link to="/login">
            <img src={backicon} alt="" />
          </Link>
        </div>
        <div className="icon">
          <img src={weblogo} alt="" />
          <h1>NOAH AI</h1>
        </div>
      </div>
      <view className="vertivleLine"></view>

      <div className="sign-up">
        <h1>Sign Up</h1>
        <div className="input">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter yout Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="sign-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <p className="para">or Continue with</p>
        <button className="google-btn">Google</button>
        <div className="for-login">
          <p className="para">Already have an Account? </p>
          <Link to="/login" className="login-btn">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
