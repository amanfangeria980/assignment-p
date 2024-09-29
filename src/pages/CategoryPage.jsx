import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../store/slices/categorySlice";
import {
    fetchProductsByCategory,
    resetProducts,
    incrementPage,
} from "../store/slices/productSlice";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const categories = useSelector((state) => state.categories.categories);
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const page = useSelector((state) => state.products.page);

    const getQueryParam = (name) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(name);
    };

    const fetchCategories = async () => {
        const response = await fetch(
            "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        dispatch(
            setCategories([
                {
                    name: "All",
                    slug: "all",
                    url: "https://dummyjson.com/products",
                },
                ...data,
            ])
        );
    };

    const handleCategoryClick = (categoryUrl, categoryName) => {
        dispatch(resetProducts());
        const encodedCategoryName = encodeURIComponent(
            categoryName.replace(/\s+/g, "-")
        );
        navigate(`/category?name=${encodedCategoryName}`);
        dispatch(fetchProductsByCategory(categoryUrl, 0));
    };

    const loadMoreProducts = () => {
        const selectedCategory = categories.find(
            (category) =>
                category.name.toLowerCase() ===
                getQueryParam("name")?.toLowerCase()
        );
        if (selectedCategory) {
            dispatch(incrementPage());
            dispatch(fetchProductsByCategory(selectedCategory.url, page + 1));
        }
    };

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch products only when categories are loaded and the query param or page changes
    useEffect(() => {
        const categoryName = getQueryParam("name");

        if (categories.length > 0 && categoryName) {
            const normalizedCategoryName = categoryName
                .toLowerCase()
                .replace(/\s+/g, "-");

            const selectedCategory = categories.find(
                (category) =>
                    category.name.toLowerCase().replace(/\s+/g, "-") ===
                    normalizedCategoryName
            );

            if (selectedCategory) {
                dispatch(fetchProductsByCategory(selectedCategory.url, page));
            } else {
                console.error("Category not found: ", categoryName);
            }
        }
    }, [categories, location.search, page]);

    const currentCategory = getQueryParam("name")?.toLowerCase();

    return (
        <div>
            <div className="flex items-center gap-3 flex-wrap">
                {categories.map((category) => {
                    // Normalize the category name for comparison with URL param
                    const normalizedCategoryName = category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                    // Apply the red background if this category is selected
                    const isSelected =
                        normalizedCategoryName === currentCategory;

                    return (
                        <div
                            key={category.slug}
                            onClick={() =>
                                handleCategoryClick(category.url, category.name)
                            }
                            className={`cursor-pointer py-2 px-4 rounded-md ${
                                isSelected ? "bg-red-300" : "bg-gray-300"
                            }`}
                        >
                            {category.name}
                        </div>
                    );
                })}
            </div>

            {products.length > 0 ? (
                products.map((product, index) => (
                    <div
                        key={`${product.id}-${currentCategory}-${index}`}
                        className="flex flex-wrap items-center"
                    >
                        <h4>{product.title}</h4>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
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
