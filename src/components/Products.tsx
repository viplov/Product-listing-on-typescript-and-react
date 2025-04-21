import ProductsCard from "./ProductsCard";
import "./Products.css";
import { AppContext } from "../context/AppContext";
import { Product, AppContextType } from "../types/Types";
import { useContext, useEffect, useState } from "react";

export default function Products() {
    const { 
        products, 
        isLoading, 
        currentPage, 
        totalItems, 
        itemsPerPage, 
        setCurrentPage 
    } = useContext(AppContext) as AppContextType;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [pages, setPages] = useState<number[]>([]);
    
    useEffect(() => {
        setPages(Array.from({length: totalPages}, (_, i) => i + 1));
    }, [totalPages]);

    return (
        <div className="products-wrapper">
            <div className="products-container">
                {products.map((product: Product) => (
                    <ProductsCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        category={product.category}
                        rating={product.rating}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        isLoading={isLoading}
                        discountPercentage={product.discountPercentage}
                    />
                ))}
            </div>
            <div className="pagination">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`page-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}