export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: number;
    thumbnail: string;
    discountPercentage: number;
    isLoading?: boolean;
}

export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface AppContextType {
    products: Product[];
    isLoading: boolean;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    fetchProducts: (page: number) => Promise<void>;
    setCurrentPage: (page: number) => void;
    categories: string[];
    sortBy: 'price_asc' | 'price_desc' | 'none';
    setSortBy: (sort: 'price_asc' | 'price_desc' | 'none') => void;
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedRating: number;
    setSelectedRating: (rating: number) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}
