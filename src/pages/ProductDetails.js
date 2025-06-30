

import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductDetails.css';


const allProducts = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image:'headpone.webp', rating: 4, category: 'Electronics', description: 'High-quality wireless headphones with noise cancellation.' },
  { id: 2, name: 'Smart Watch', price: 149.99, image: 'watch.webp', rating: 5, category: 'Electronics', description: 'Track your health, fitness, and notifications.' },
  { id: 3, name: 'Bluetooth Speaker', price: 49.99, image: 'speaker.webp', rating: 4, category: 'Electronics', description: 'Portable Bluetooth speaker with great sound.' },
  { id: 4, name: 'Laptop Stand', price: 29.99, image: 'stand.webp', rating: 3, category: 'Accessories', description: 'Ergonomic stand to improve laptop posture.' },
  { id: 5, name: 'Gaming Mouse', price: 59.99, image: 'mouse.webp', rating: 4, category: 'Accessories', description: 'High precision mouse for professional gaming.' },
  { id: 6, name: 'Shoes', price: 89.99, image: 'shoe.webp', rating: 4, category: 'Fashion', description: 'Comfortable and stylish running shoes.' },
  { id: 7, name: 'T-shirt', price: 19.99, image: 'shirt.jpeg', rating: 4, category: 'Fashion', description: 'Cotton t-shirt with modern fit.' },
  { id: 8, name: 'Water Bottle', price: 9.99, image: 'bottol.jpeg', rating: 3, category: 'Accessories', description: 'Insulated water bottle for gym and travel.' },
  { id: 9, name: 'Tablet', price: 299.99, image: 'tablet.webp', rating: 4, category: 'Electronics', description: '10-inch Android tablet with 128GB storage.' },
  { id: 10, name: 'Backpack', price: 39.99, image: 'bag.webp', rating: 5, category: 'Fashion', description: 'Durable backpack perfect for school or work.' },
];

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = allProducts.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity < 1) return;
    addToCart({ ...product, quantity });
    toast.success('Added to cart!');
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <img src={`/${product.image}`} alt={product.name} className="detail-img" />

        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="stars">{'⭐'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
          <p className="desc">{product.description}</p>

          <div className="quantity-control">
            <label htmlFor="qty">Quantity:</label>
            <input
              id="qty"
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
