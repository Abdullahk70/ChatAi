import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import css from './index.css'
import Home from './components/home/Home.jsx'

import Chats from './components/chats/Chats.jsx'
import Signup from './components/register/signup/Signup.jsx'
import Login from './components/register/login/Login.jsx'
import Forgot from './components/register/reset/Forgot.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Sell from './components/Sell/Sell.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='/chats' element={<Chats />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget' element={<Forgot />} />
      <Route path='/Sell' element={<Sell />} />
    
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
