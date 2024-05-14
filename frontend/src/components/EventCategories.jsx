// This component will be used on the MapPage to display event categories.

import React from "react";

export default function EventCategories({ categories, onCategorySelect }) {
  return (
    <div className="flex gap-2 ml-10 overflow-x-auto cursor-pointer">
      <div className="flex space-x-2">
        {/* !!! Show event categories, will need to pass the category data to iterate later */}
        {categories.map((category) => (
          <div
            key={category}
            className="text-lg font-medium text-nowrap leading-6 rounded-2xl shadow-lg bg-gray-200 bg-opacity-80 hover:bg-yellow-100 active:bg-yellow-200 max-sm:text-xs"
            onClick={() => onCategorySelect(category)}
          >
            <p className="justify-center p-3">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
