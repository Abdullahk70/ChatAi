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
{ image: book1, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book2, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 1.99, rating: 4.6, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book1, title: 'Childrens Book Illustration', price: 2.99, rating: 4.5, category: 'avatars',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
// ... (prompts),description:""This generator creates whimsic chaacters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included
{ image: book3, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" }, 
{ image: book3, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book4, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book5, title: 'Childrens Book Illustration', price: 3.99, rating: 4.8, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" },
{ image: book3, title: 'Childrens Book Illustration', price: 4.99, rating: 4.9, category: 'prompts',wordcount:100,tested: "true",description:"This generator creates whimsical characters in a playful style. They can be used to tell stories, teach concepts, and entertain children.  The prompt is open to many variable subjects so you can make lots and lots of illustrations with it,✅ Useful for a large range of projects that will be uniquely YOURS✅ Learn how to get more versatility out of your prompt✅ Detailed instructions, tips + all prompts included" }, 

];

const Product = (props) => (
  <>
  {()=>{props.setProduct({title:"check"})}}
  <Link to={`/marketplace/productBuy`} onClick={()=>{props.setProduct(props.product)}} className="product">
     <img src={props.product.image} alt={props.product.title} />
    <div className="product-overlay">
      <span className="midjourney">Midjourney</span>
      <div className="product-rating">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {props.product.rating}
      </div>
    </div>
    <div className="product-details">
      <div className="product-title">{props.product.title}</div>
      <div className="product-price">${props.product.price}</div>
      
      
    </div>
    
  </Link>
  
  </>
);

const Marketplace = (props) => {
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
            <Product key={index} product={product} setProduct={props.setProduct} />
          ))}
      </div>
      
    </div>
   
  );
};

export default Marketplace;
