import { createContext, useState, useEffect } from 'react';
import { Product, AppContextType } from '../types/Types';
export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({children}: {children: React.ReactNode}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const itemsPerPage = 30;
    const [categories, setCategories] = useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'none'>('none');

    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    


    const fetchProducts = async (page: number) => {
        try {
            setIsLoading(true);
            const skip = (page - 1) * itemsPerPage;
            const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`);
            const data = await response.json();
            setAllProducts(data.products);
            setProducts(data.products);
            setTotalItems(data.total);
            setSortBy('none');
            setSelectedCategory('');
            setSelectedRating(0);
            setSearchQuery('');
            
            const uniqueCategories = [...new Set(data.products.map((product: Product) => product.category))] as string[];
            setCategories(uniqueCategories);
            
            // Preload images
            data.products.forEach((product: Product) => {
                const img = new Image();
                img.src = product.thumbnail;
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let filtered = [...allProducts];
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }
        if (selectedRating > 0) {
            filtered = filtered.filter(product => product.rating >= selectedRating);
        }
        if (searchQuery) {
            filtered = filtered.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (sortBy === 'price_asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }
        setProducts(filtered);
    }, [selectedCategory, selectedRating, sortBy, searchQuery]);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (productId: number) => {
        setWishlist(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const isInWishlist = (productId: number) => wishlist.includes(productId);

    const value = {
        products,
        isLoading,
        currentPage,
        totalItems,
        itemsPerPage,
        fetchProducts,
        setCurrentPage,
        categories,
        sortBy,
        setSortBy,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedCategory,
        setSelectedCategory,
        selectedRating,
        setSelectedRating,
        searchQuery,
        setSearchQuery
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
