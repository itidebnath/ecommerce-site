import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity,setCart} = useContext(CartContext);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.warn("Your cart is empty!");
        } else {
            toast.success("Order placed successfully! ✅");
            localStorage.removeItem('cart'); // Clear from localStorage
            setCart([]);
        }
    };

    return (
        <div className="cart-page">
            <h2>Your Cart 🛒</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>

                            <div className="quantity-controls">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    +
                                </button>
                            </div>

                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>

                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}

            {cart.length > 0 && (
                <>
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
