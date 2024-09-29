import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
const MainLayout = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        if (searchInput.trim()) {
            navigate(`/search?query=${searchInput}`);
        }
    };
    return (
        <div className="m-2">
            <div className="flex items-center justify-between mb-4 p-3 ">
                <Link to="/">
                    <h2 className="text-3xl text-center underline text-red-400">
                        Home
                    </h2>
                </Link>
                <div className="flex gap-1 items-center justify-center">
                    <input
                        type="text"
                        className="border border-gray-400 rounded-lg p-2"
                        placeholder="Search..."
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="text-xl" onClick={handleSearch}>
                        🔍
                    </button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
