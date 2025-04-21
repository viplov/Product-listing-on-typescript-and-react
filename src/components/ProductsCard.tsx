import { useContext, useState } from 'react';
import './ProductsCard.css';
import { AppContext } from '../context/AppContext';
import { AppContextType, Product } from '../types/Types';

export default function ProductsCard({ id, title, price, category, rating, thumbnail, isLoading, discountPercentage }: Product) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { toggleWishlist, isInWishlist } = useContext(AppContext) as AppContextType;
    const originalPrice = Math.round(price * (1 + discountPercentage/100));

    if (isLoading) {
        return (
            <div className="product-card">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-price"></div>
            </div>
        );
    }

    return (
        <div className="product-card">
            <div 
                className={`wishlist ${isInWishlist(id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(id)}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill={isInWishlist(id) ? "#ff3f6c" : "none"}>
                    <path d="M8 14.5C8 14.5 1 10.5 1 5.5C1 3 3 1 5.5 1C6.5 1 7.5 1.5 8 2C8.5 1.5 9.5 1 10.5 1C13 1 15 3 15 5.5C15 10.5 8 14.5 8 14.5Z" 
                        stroke={isInWishlist(id) ? "#ff3f6c" : "#282C3F"} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div style={{ position: 'relative' }}>
                {!imageLoaded && <div className="skeleton skeleton-image"></div>}
                <img 
                    src={thumbnail} 
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                    style={{ 
                        display: imageLoaded ? 'block' : 'none',
                    }}
                />
            </div>
            <h4>{title}</h4>
            <div className="brand">{category}</div>
            <div className="price">
                ₹{price}
                <span className="original-price">₹{originalPrice}</span>
                <span className="discount">{discountPercentage}% OFF</span>
            </div>
            <div className="rating">
                <div className="rating-stars">
                    {rating.toFixed(1)} ★
                </div>
            </div>
        </div>
    );
}