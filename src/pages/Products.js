// src/pages/Products.js

import React, { useContext, useEffect, useState, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Products.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const allProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'headpone.webp', rating: 4, category: 'Electronics' },
    { id: 2, name: 'Smart Watch', price: 149.99, image: 'watch.webp', rating: 5, category: 'Electronics' },
    { id: 3, name: 'Bluetooth Speaker', price: 49.99, image: 'speaker.webp', rating: 4, category: 'Electronics' },
    { id: 4, name: 'Laptop Stand', price: 29.99, image: 'stand.webp', rating: 3, category: 'Accessories' },
    { id: 5, name: 'Gaming Mouse', price: 59.99, image: 'mouse.webp', rating: 4, category: 'Accessories' },
    { id: 6, name: 'Shoes', price: 89.99, image: 'shoe.webp', rating: 4, category: 'Fashion' },
    { id: 7, name: 'T-shirt', price: 19.99, image: 'shirt.jpeg', rating: 4, category: 'Fashion' },
    { id: 8, name: 'Water Bottle', price: 9.99, image: 'bottol.jpeg', rating: 3, category: 'Accessories' },
    { id: 9, name: 'Tablet', price: 299.99, image: 'tablet.webp', rating: 4, category: 'Electronics' },
    { id: 10, name: 'Backpack', price: 39.99, image: 'bag.webp', rating: 5, category: 'Fashion' },
];

const categories = ['All', 'Electronics', 'Accessories', 'Fashion'];

function Products() {
    const { addToCart } = useContext(CartContext);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('');
    const [priceFilter, setPriceFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');

    const [loadedCount, setLoadedCount] = useState(4); // how many to show initially
    const loadMoreRef = useRef();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search')?.toLowerCase() || '';

    
    let filtered = selectedCategory === 'All'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);


    if (priceFilter !== 'All') {
        if (priceFilter === 'Under50') filtered = filtered.filter(p => p.price < 50);
        if (priceFilter === '50to100') filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
        if (priceFilter === 'Above100') filtered = filtered.filter(p => p.price > 100);
    }

    
    if (ratingFilter !== 'All') {
        filtered = filtered.filter(p => p.rating >= parseInt(ratingFilter));
    }

   
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }


   
    if (sortBy === 'LowToHigh') filtered = filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'HighToLow') filtered = filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'Newest') filtered = filtered.sort((a, b) => b.id - a.id); // Assuming higher ID = newer


    
    useEffect(() => {
        const target = loadMoreRef.current;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && loadedCount < filtered.length) {
                setTimeout(() => setLoadedCount(prev => prev + 4), 500);
            }
        });

        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [filtered, loadedCount]);

    useEffect(() => {
        setLoadedCount(4); 
    }, [selectedCategory]);

    const handleAdd = (product) => {
        addToCart(product);
        toast.success('Item added! 🛒');
    };

    return (
        <div className="products-page">
            <h2>All Products</h2>

            
            <div className="category-filter">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={selectedCategory === cat ? 'active' : ''}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="filter-row">
                <label>Price:</label>
                <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Under50">Under $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="Above100">Above $100</option>
                </select>

                
                <label>Rating:</label>
                <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="3">3★ & up</option>
                    <option value="4">4★ & up</option>
                    <option value="5">5★ only</option>
                </select>

                
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">None</option>
                    <option value="LowToHigh">Price: Low to High</option>
                    <option value="HighToLow">Price: High to Low</option>
                    <option value="Newest">Newest</option>
                </select>
            </div>

            
            <div className="product-grid">
                {filtered.slice(0, loadedCount).map(product => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <p>{'⭐'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
                        <button className="view-btn" onClick={() => handleAdd(product)}>Add to Cart</button>
                        <Link to={`/product/${product.id}`}>
                            <button className="view-btn">View Details</button>
                        </Link>

                    </div>
                ))}
            </div>

            
            <div ref={loadMoreRef} style={{ height: '50px' }}></div>
        </div>
    );
}

export default Products;
