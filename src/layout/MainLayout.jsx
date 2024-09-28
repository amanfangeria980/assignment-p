import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const MainLayout = () => {
    const handleSearch = async () => {
        // setLoading(true);
        // navigate(`?category=${selectedCategoryName}&search=${searchInput}`);
        const url = `https://dummyjson.com/products/search?q=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        console.log(`search results for ${searchInput}`, json.products);
        // setProducts(json.products);
        // setLoading(false);
    };
    return (
        <div className="m-2">
            <div className="flex items-center justify-between mb-4 p-3 ">
                <h2 className="text-3xl text-center underline">Categories</h2>
                <div className="flex gap-1">
                    <input
                        type="text"
                        className="border border-gray-400 rounded-lg p-2"
                        placeholder="Search..."
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <h2 className="text-xl" onClick={handleSearch}>
                        🔍
                    </h2>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
