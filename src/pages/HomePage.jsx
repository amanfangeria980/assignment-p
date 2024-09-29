import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
    return (
        <div className="flex items-center justify-center">
            <Link to="/category?name=All">Click here to view products</Link>
        </div>
    );
};

export default HomePage;
