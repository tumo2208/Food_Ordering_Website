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
    const [cuisineTypes, setCuisineTypes] = useState("");
    const [priceRange, setPriceRange] = useState("");
    // const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);

    useEffect(() => {
        const fetchRestaurant = async (restaurantId: string) => {
            try {
                const response = await getRestaurantById(restaurantId);
                setRestaurant(response.restaurant);
                if (response.restaurant.cuisineTypes.length > 0) {
                    setCuisineTypes(response.restaurant.cuisineTypes.join(", "));
                }
                setPriceRange(String(response.restaurant.minPrice) + "-" +  String(response.restaurant.maxPrice))
                // const menuData = getMenuForRestaurant(Number(id));
                // setMenuCategories(menuData);
            } catch (error) {
                console.error("Cannot fetch restaurant: ", error);
            }
        }
        fetchRestaurant(String(id));
    }, [id]);

    return (
        <div className="pb-8">
            {restaurant && (
                <>
                    {/* Cover Image */}
                    <div className="h-64 w-full rounded-lg overflow-hidden mb-6 relative">
                        <img
                            src={restaurant?.imgUrl}
                            alt={restaurant?.restaurantName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute flex bottom-5 p-4 gap-1 flex-col">
                            <h1 className="text-3xl text-white font-bold mb-2">
                                {restaurant?.restaurantName}
                            </h1>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    <Rating rating={restaurant?.rating.rating} />
                                </div>
                                <span className="text-white">
                                    {restaurant.rating.rating} ({restaurant.rating.numberOfRatings} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-white">{cuisineTypes}</span>
                                <span className="text-white">•</span>
                                <span className="text-white">{priceRange}</span>
                            </div>
                        </div>
                    </div>

                    {/*/!* Restaurant Detail and Menu *!/*/}
                    {/*<RestaurantDetails {...restaurant}/>*/}
                    {/*{*/}
                    {/*    menuCategories?.map(category=>(*/}
                    {/*        <RestaurantMenuCategory restaurantId={String(restaurant.id)} restaurantName={restaurant.name} {...category} key={category.id}/>*/}
                    {/*    ))*/}
                    {/*}*/}
                </>
            )}
        </div>
    );
};

export default Restaurant;