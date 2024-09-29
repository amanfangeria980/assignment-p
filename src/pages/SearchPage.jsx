// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const SearchPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [products, setProducts] = useState([]);
//     const location = useLocation();
//     const searchQuery = new URLSearchParams(location.search).get("query");

//     const fetchProducts = async (query) => {
//         const url = `https://dummyjson.com/products/search?q=${query}`;
//         const data = await fetch(url);
//         const json = await data.json();
//         console.log(`search results for ${query}`, json.products);
//         setProducts(json.products);
//         setLoading(false);
//     };

//     // Fetch products when the component mounts or when the search query changes
//     useEffect(() => {
//         if (searchQuery) {
//             fetchProducts(searchQuery);
//         }
//     }, [searchQuery]);
//     return (
//         <div>
//             <h1>Search Page</h1>
//             {loading && <div>Loading results</div>}
//             {products.length > 0 ? (
//                 products.map((product) => (
//                     <div
//                         key={product.id}
//                         className="flex flex-wrap items-center"
//                     >
//                         <h4>{product.title}</h4>
//                     </div>
//                 ))
//             ) : (
//                 <p>No products found.</p>
//             )}
//         </div>
//     );
// };

// export default SearchPage;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("query");

    const fetchProducts = async (query, pageNumber = 0) => {
        setLoading(true);
        const url = `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${
            pageNumber * 10
        }`;
        const data = await fetch(url);
        const json = await data.json();

        console.log(`search results for ${query}`, json.products);

        // Append new products to the existing ones
        setProducts((prevProducts) => [...prevProducts, ...json.products]);
        setLoading(false);
    };

    // Fetch products when the component mounts or when the search query or page changes
    useEffect(() => {
        if (searchQuery) {
            // Reset products and page if the query changes
            setProducts([]); // Clear previous products for new search
            setPage(0); // Reset page for new search
            fetchProducts(searchQuery, 0); // Fetch for the first page
        }
    }, [searchQuery]);

    // Fetch products based on the page change
    useEffect(() => {
        if (page > 0) {
            // Fetch products only if page is greater than 0
            fetchProducts(searchQuery, page);
        }
    }, [page, searchQuery]); // Page and query dependencies

    // Load more products by incrementing the page
    const loadMoreProducts = () => {
        setPage((prevPage) => prevPage + 1); // Increment the page
    };

    return (
        <div>
            <h1>Search Page</h1>
            {loading  ? <div>Loading results...</div> : (
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
    
            )}
          
            <div>
                <button
                    onClick={loadMoreProducts}
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            </div>
        </div>
    );
};

export default SearchPage;
