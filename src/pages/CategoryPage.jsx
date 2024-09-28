import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryUrl, setSelectedCategoryUrl] = useState(
        "https://dummyjson.com/products"
    );
    const [selectedCategoryName, setSelectedCategoryName] = useState("All");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    // const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    // Fetch categories from API
    const fetchCategories = async () => {
        const data = await fetch("https://dummyjson.com/products/categories");
        const json = await data.json();
        console.log("categories", json);
        setCategories([
            {
                name: "All",
                slug: "all",
                url: "https://dummyjson.com/products",
            },
            ...json,
        ]);
    };

    // Fetch products by category and page
    const fetchProductsByCategory = async (categoryUrl, pageNumber = 0) => {
        setLoading(true);
        const url = `${categoryUrl}?limit=10&skip=${pageNumber * 10}`;
        const data = await fetch(url);
        const json = await data.json();
        console.log(`products for ${categoryUrl}`, json.products);
        setProducts((prevProducts) => [...prevProducts, ...json.products]); // Append new products
        setLoading(false);
    };

    // Handle category click to switch categories
    const handleCategoryClick = (categoryUrl, categoryName) => {
        setSelectedCategoryUrl(categoryUrl); // Set the new category URL
        setSelectedCategoryName(categoryName); // Set the new category name
        setPage(0); // Reset page when switching category
        setProducts([]); // Clear products before loading new ones
        fetchProductsByCategory(categoryUrl); // Fetch new products for the selected category
    };

    // Load more products by incrementing the page
    const loadMoreProducts = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Effect to load products when the page changes
    useEffect(() => {
        if (page > 0) {
            fetchProductsByCategory(selectedCategoryUrl, page);
        }
    }, [page]);

    // Initial fetch for categories and products
    useEffect(() => {
        fetchCategories();
        fetchProductsByCategory("https://dummyjson.com/products");
    }, []);

    return (
        <div>
            <div className="flex items-center gap-3 flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category.slug}
                        onClick={() =>
                            handleCategoryClick(category.url, category.name)
                        }
                        className={`cursor-pointer bg-gray-300 py-2 px-4 rounded-md  ${
                            selectedCategoryName === category.name
                                ? "bg-red-600 text-white"
                                : ""
                        }`}
                    >
                        {category.name}
                    </div>
                ))}
            </div>

            {selectedCategoryName && (
                <div>
                    <h3 className="text-xl">
                        Products for {selectedCategoryName}
                    </h3>
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

export default CategoryPage;
