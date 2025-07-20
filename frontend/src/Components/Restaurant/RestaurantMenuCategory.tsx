import type { MenuCategory } from "../../Commons/Type";
import { HeartIcon } from "@heroicons/react/24/outline";
import Rating from "./Rating";

const RestaurantMenuCategory = (category: MenuCategory) => {

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{category.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.items?.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 relative cursor-pointer
                    hover:shadow-lg transition-all duration-300">
                        {/* Discount */}
                        {item.discount && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                {item.discount}% Off
                            </span>
                        )}

                        {/* Favorite Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Handle favorite toggle logic here
                            }}
                        >
                            {item.favorite ? <HeartIcon className="h-6 w-6 text-red-500" /> : <HeartIcon className="h-6 w-6" />}
                        </button>

                        {/* Image */}
                        <div className="flex justify-center mb-4">
                            <img src={item.image} alt={item.name} className="h-32 w-32 object-cover rounded-lg
                            transition-transform duration-300 hover:scale-105"/>
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center mb-2">
                            <Rating rating={item.rating}/>
                        </div>

                        {/* Name and Description */}
                        <h3 className="text-center font-medium mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm text-center mb-2 line-clamp-2">{item.description}</p>

                        {/* Price */}
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenuCategory;