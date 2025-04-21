import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Header.css';
import { AppContextType } from '../types/Types';

export default function Header(){
  const { sortBy, setSortBy, categories, selectedCategory, setSelectedCategory, selectedRating, setSelectedRating, searchQuery, setSearchQuery }  = useContext(AppContext) as AppContextType;


  return (
    <header className="header">
      <div>
      <div className="header-container">
        <div className="logo">
          <h1>E-Commerce</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
        </div>
      </div>
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="category">Category : </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="rating">Rating : </label>
          <select id="rating" value={selectedRating} onChange={(e) => setSelectedRating(parseInt(e.target.value))} className='rating-select'>
            <option value="0">All</option>
            <option value="1">1 & above</option>
            <option value="2">2 & above</option>
            <option value="3">3 & above</option>
            <option value="4">4 & above</option>
            <option value="5">5 & above</option>
          </select>
        </div>
        <div className="sort-by">
          <label htmlFor="sort">Sort by : </label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'price_asc' | 'price_desc' | 'none')}
            className="sort-select"
          >
            <option value="none">Sort by </option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      </div>
    </header>
  );
};
