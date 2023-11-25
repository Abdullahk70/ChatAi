import React from "react";
import backicon from "../../../assets/images/backbutton.png";
import weblogo from "../../../assets/images/web_logo.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import AuthDetails from "../AuthDetails";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // login button method :
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/Sell");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Credentials : ", userCredential);
        navigate( to="/Sell");
      })
      .catch((error) => {
        console.log("Error : ",error);
      });
  };
  // Login with Google :
  const googleSignin = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("email", data.user.email);
      console.log("Successfully Login with Google ");
      navigate("/");
    });
  };

  return (
    <div className="signup-container">
      <div className="title">
        <div className="back-icon">
          <Link to="/">
            <img src={backicon} alt="" />
          </Link>
        </div>
        <div className="icon">
          <img src={weblogo} alt="" />
          <h1>NOAH AI</h1>
          <AuthDetails />
        </div>
      </div>
      <view className="vertivleLine"></view>
      <div className="sign-up">
        <h1>Login</h1>
        <div className="input">
          <p>Email</p>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter yout Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forget" className="forgot">
            Forgot Password?
          </Link>
        </div>
        <button className="sign-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="para">or Continue with</p>
        <button className="google-btn" onClick={googleSignin}>
          Google
        </button>
        <div className="for-login">
          <p className="para">Already have an Account? </p>
          <Link to="/signup" className="login-btn">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
