import React from 'react'
import backicon from '../../../assets/images/backbutton.png'
import weblogo from '../../../assets/images/web_logo.png'
import {Link} from 'react-router-dom';

const Forgot = () => {
  return (
    <div className='signup-container'>
        <div className='title'>
            <div className='back-icon'>
                <Link to='/login'><img src={backicon} alt="" /></Link>
                
            </div>
            <div className='icon'>
                <img src={weblogo} alt="" />
                <h1>NOAH AI</h1>
            </div>
        </div>
        <view className='vertivleLine'></view>
        <div className='sign-up'>
                <h1>Reset Password</h1>
                <div className='input'>
                
                <p>Email</p>
                <input type="text" placeholder='Enter your email address' />
                </div>
                <button className='sign-btn'>Reset</button>
                <div className='for-login'>
                <p className='para'>Don't have an account? </p> 
                <Link to='/signup' className='login-btn' style={{marginBottom: '13.5rem'}}>Sign up</Link>
                </div>


        </div>
        
    </div>
  )
}

export default Forgot