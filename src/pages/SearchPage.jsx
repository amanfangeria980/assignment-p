import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("query");

    const fetchProducts = async (query) => {
        const url = `https://dummyjson.com/products/search?q=${query}`;
        const data = await fetch(url);
        const json = await data.json();
        console.log(`search results for ${query}`, json.products);
        setProducts(json.products);
        setLoading(false);
    };

    // Fetch products when the component mounts or when the search query changes
    useEffect(() => {
        if (searchQuery) {
            fetchProducts(searchQuery);
        }
    }, [searchQuery]);
    return (
        <div>
            <h1>Search Page</h1>
            {loading && <div>Loading results</div>}
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-wrap items-center"
                    >
                        <h4>{product.title}</h4>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchPage;
