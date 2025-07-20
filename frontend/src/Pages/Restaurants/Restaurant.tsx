import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import type {MenuCategory, Restaurant} from "../../Commons/Type.ts";
import {getMenuForRestaurant, getRestaurantById} from "../../Commons/ApiFunction.ts";
import Rating from "../../Components/Restaurant/Rating.tsx";
import RestaurantDetails from "../../Components/Restaurant/RestaurantDetails.tsx";
import RestaurantMenuCategory from "../../Components/Restaurant/RestaurantMenuCategory.tsx";

const Restaurant = () => {
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);

    useEffect(() => {
        const data = getRestaurantById(Number(id));
        if (data) {
            setRestaurant(data);
            const menuData = getMenuForRestaurant(Number(id));
            setMenuCategories(menuData);
        }
    }, [id]);

    return (
        <div className="pb-8">
            {restaurant && (
                <>
                    {/* Cover Image */}
                    <div className="h-64 w-full rounded-lg overflow-hidden mb-6 relative">
                        <img
                            src={restaurant?.image}
                            alt={restaurant?.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute flex bottom-5 p-4 gap-1 flex-col">
                            <h1 className="text-3xl text-white font-bold mb-2">
                                {restaurant?.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    <Rating rating={restaurant?.rating} />
                                </div>
                                <span className="text-white">
                                    {restaurant.rating} ({restaurant.ratingCount} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-white">{restaurant.cuisineType}</span>
                                <span className="text-white">•</span>
                                <span className="text-white">{restaurant.priceRange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Restaurant Detail and Menu */}
                    <RestaurantDetails {...restaurant}/>
                    {
                        menuCategories?.map(category=>(
                            <RestaurantMenuCategory restaurantId={String(restaurant.id)} restaurantName={restaurant.name} {...category} key={category.id}/>
                        ))
                    }
                </>
            )}
        </div>
    );
};

export default Restaurant;