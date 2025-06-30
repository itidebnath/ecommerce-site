import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'headpone.webp',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    image: 'watch.webp',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    image: 'speaker.webp',
  },
];

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
];

function Home() {
  return (
    <div className="home-container">
      <div className="banner">
        <h1>🔥 Big Sale Today!</h1>
        <p className='jk'>Get up to 50% off on select items</p>
        <Link to="/products" className="shop-now-btn">Shop Now</Link>
      </div>

      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link to={`/products?category=${cat.slug}`} key={index} className="category-card">
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
          

      <section className="featured">
        
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to="/products" className="btn">View All</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
