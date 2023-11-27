import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import css from './index.css';
import Home from './components/home/Home.jsx';
import Chats from './components/chats/Chats.jsx';
import Signup from './components/register/signup/Signup.jsx';
import Login from './components/register/login/Login.jsx';
import Forgot from './components/register/reset/Forgot.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Marketplace from './components/Sell/Marketplace.jsx';
import ProductSell from './components/productBuy/productBuy.jsx';
import ProductBuy from './components/productBuy/productBuy.jsx';
import Sell from './components/SellingPage/Sell.jsx';

const Root = () => {
  const [product, setProduct] = useState({ title: "test" });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forgot />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/marketplace' element={<Marketplace setProduct={setProduct} />} />
        <Route path='/marketplace/productbuy' element={<ProductBuy product={product} />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
