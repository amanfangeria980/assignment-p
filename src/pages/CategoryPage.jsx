import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryUrl, setSelectedCategoryUrl] = useState(
        "https://dummyjson.com/products"
    );
    const [selectedCategoryName, setSelectedCategoryName] = useState("All");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const getQueryParam = (name) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(name);
    };

    const fetchCategories = useCallback(async () => {
        const data = await fetch("https://dummyjson.com/products/categories");
        const json = await data.json();
        setCategories([
            {
                name: "All",
                slug: "all",
                url: "https://dummyjson.com/products",
            },
            ...json,
        ]);
    }, []);

    const fetchProductsByCategory = useCallback(
        async (categoryUrl, pageNumber = 0) => {
            setLoading(true);
            const url = `${categoryUrl}?limit=10&skip=${pageNumber * 10}`;
            const data = await fetch(url);
            const json = await data.json();
            setProducts((prevProducts) =>
                pageNumber === 0
                    ? json.products
                    : [...prevProducts, ...json.products]
            );
            setLoading(false);
        },
        []
    );

    const handleCategoryClick = useCallback(
        (categoryUrl, categoryName) => {
            if (categoryName === selectedCategoryName) {
                // If clicking the same category, trigger a refresh
                setRefreshTrigger((prev) => prev + 1);
            } else {
                setSelectedCategoryUrl(categoryUrl);
                setSelectedCategoryName(categoryName);
            }
            setPage(0);
            setProducts([]);
            navigate(`/category?name=${encodeURIComponent(categoryName)}`);
        },
        [navigate, selectedCategoryName]
    );

    const loadMoreProducts = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const categoryName = getQueryParam("name");
        if (categories.length > 0) {
            if (categoryName) {
                const selectedCategory = categories.find(
                    (category) =>
                        category.name.toLowerCase() ===
                        categoryName.toLowerCase()
                );
                if (selectedCategory) {
                    setSelectedCategoryUrl(selectedCategory.url);
                    setSelectedCategoryName(selectedCategory.name);
                }
            } else {
                navigate("/category?name=All");
            }
            setProducts([]);
            setPage(0);
        }
    }, [categories, navigate]);

    useEffect(() => {
        if (selectedCategoryUrl) {
            fetchProductsByCategory(selectedCategoryUrl, page);
        }
    }, [selectedCategoryUrl, page, fetchProductsByCategory, refreshTrigger]);

    return (
        <div>
            <div className="flex items-center gap-3 flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category.slug}
                        onClick={() =>
                            handleCategoryClick(category.url, category.name)
                        }
                        className={`cursor-pointer bg-gray-300 py-2 px-4 rounded-md ${
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
                        products.map((product, index) => (
                            <div
                                key={`${product.id}-${index}-${selectedCategoryName}`}
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
