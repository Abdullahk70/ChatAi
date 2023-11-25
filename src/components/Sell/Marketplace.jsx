import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Remove BrowserRouter
import './Sell.css';
import book1 from "./book1.png"
import book2 from "./book2.png"
import book3 from "./book3.png"
import book4 from "./book4.png"
import book5 from "./book5.png"
import pp from "./pp.png"
import LoginNavbar from '../LoginNavbar/LoginNavbar';

const products = [
   // ... (avatars)
{ image: book1, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book2, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
{ image: book3, title: 'Childrens Book Illustration', price: '$1.99', rating: 4.6, category: 'avatars' },
{ image: book1, title: 'Childrens Book Illustration', price: '$2.99', rating: 4.5, category: 'avatars' },
// ... (prompts)
{ image: book3, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' }, 
{ image: book3, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book4, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' },
{ image: book5, title: 'Childrens Book Illustration', price: '$3.99', rating: 4.8, category: 'prompts' },
{ image: book3, title: 'Childrens Book Illustration', price: '$4.99', rating: 4.9, category: 'prompts' }, 

];

const Product = ({ product }) => (
  <Link to={`/product/${encodeURIComponent(product.title)}`} className="product">
     <img src={product.image} alt={product.title} />
    <div className="product-overlay">
      <span className="midjourney">Midjourney</span>
      <div className="product-rating">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {product.rating}
      </div>
    </div>
    <div className="product-details">
      <div className="product-title">{product.title}</div>
      <div className="product-price">{product.price}</div>
    </div>
  </Link>
);

const Marketplace = () => {
  const [currentCategory, setCurrentCategory] = useState('avatars');
  

  const displayProducts = (category) => {
    setCurrentCategory(category);
  };

  return (
    
    <div id="container">
    <LoginNavbar/>

      <div className="content-buttons">
        <div className="content-button-group">
          <button
            className={`content-button ${currentCategory === 'avatars' ? 'active' : ''}`}
            onClick={() => displayProducts('avatars')}
          >
            Avatars
          </button>
          <button
            className={`content-button ${currentCategory === 'prompts' ? 'active' : ''}`}
            onClick={() => displayProducts('prompts')}
          >
            Prompts
          </button>
        </div>
      </div>

      <hr className="separator" />

      <div id="products">
        {products
          .filter((product) => product.category === currentCategory)
          .map((product, index) => (
            <Product key={index} product={product} />
          ))}
      </div>
    </div>
   
  );
};

export default Marketplace;
