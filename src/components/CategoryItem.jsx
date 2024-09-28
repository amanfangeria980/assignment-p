import React from "react";

const CategoryItem = ({ name, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-red-300 p-2 rounded-md min-w-40"
        >
            {name}
        </div>
    );
};

export default CategoryItem;
