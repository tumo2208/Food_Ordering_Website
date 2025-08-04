import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import type {FoodItem, Restaurant} from "../../Commons/Type.ts";
import {
    getFoodByRestaurantIdAndFoodType,
    getFoodByRestaurantIdAndFoodTypes,
    getRestaurantById
} from "../../Commons/ApiFunction.ts";
import Rating from "../../Components/Restaurant/Rating.tsx";
import {CookingFoodTypeMap} from "../../Commons/DataDummy.ts";
import RestaurantDetails from "../../Components/Restaurant/RestaurantDetails.tsx";
import RestaurantMenuCategory from "../../Components/Restaurant/RestaurantMenuCategory.tsx";

const Restaurant = () => {
    const cuisineMap = new Map<string, string>(Object.entries(CookingFoodTypeMap));
    const allCuisineTypes = Array.from(cuisineMap.keys());

    const {id} = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [cuisineTypesOfRestaurant, setCuisineTypesOfRestaurant] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const [filterCuisineTypes, setFilterCuisineTypes] = useState<string[]>(["RICE"]);
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    // const [cuisineMenu, setCuisineMenu] = useState<Map<CookingCuisineType, FoodItem[]>>(new Map());

    useEffect(() => {
        const fetchRestaurant = async (restaurantId: string) => {
            try {
                // Fetching restaurant details by ID
                const response = await getRestaurantById(restaurantId);
                setRestaurant(response.restaurant);
                if (response.restaurant.cuisineTypes.length > 0) {
                    setCuisineTypesOfRestaurant(response.restaurant.cuisineTypes.join(", "));
                }
                setPriceRange(String(response.restaurant.minPrice) + "-" +  String(response.restaurant.maxPrice))
            } catch (error) {
                console.error("Cannot fetch restaurant: ", error);
            }

            // try {
            //     // Fetching menu categories for the restaurant
            //     for (const cuisineType of allCuisineTypes) {
            //         const response = await getFoodByRestaurantIdAndFoodType(restaurantId, cuisineType);
            //         if (response) {
            //             const items = response;
            //             if (items && items.length > 0) {
            //                 setCuisineMenu(prev => new Map(prev).set(cuisineType as CookingCuisineType, items));
            //             }
            //         }
            //     }
            // } catch (error) {
            //     console.error("Cannot fetch restaurant menu: ", error);
            // }

            try {
                const response = await getFoodByRestaurantIdAndFoodType(restaurantId, "RICE");
                if (response) {
                    setFoodItems(response);
                }
            } catch (error) {
                console.error("Cannot fetch restaurant food items: ", error);
            }
        }
        fetchRestaurant(String(id));
    }, [id]);

    const handleFilterCuisineType = async (cuisineType: string) => {
        if (filterCuisineTypes.includes(cuisineType) && filterCuisineTypes.length < 2) {
            return;
        }

        let updatedCuisineTypes = filterCuisineTypes;
        if (filterCuisineTypes.includes(cuisineType)) {
            setFilterCuisineTypes(prev => prev.filter(type => type !== cuisineType));
            updatedCuisineTypes = updatedCuisineTypes.filter(type => type !== cuisineType);
        } else {
            setFilterCuisineTypes(prev => [...prev, cuisineType]);
            updatedCuisineTypes = [...updatedCuisineTypes, cuisineType];
        }

        try {
            const response = await getFoodByRestaurantIdAndFoodTypes(String(id), updatedCuisineTypes);
            if (response) {
                setFoodItems(response);
            }
        } catch (error) {
            console.error("Cannot fetch restaurant food items: ", error);
        }
    }

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
                                    <Rating rating={restaurant?.rating.rating}/>
                                </div>
                                <span className="text-white">
                                    {restaurant.rating.rating} ({restaurant.rating.numberOfRatings} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-white">{cuisineTypesOfRestaurant}</span>
                                <span className="text-white">•</span>
                                <span className="text-white">{priceRange}</span>
                            </div>
                        </div>
                    </div>

                {/* Restaurant Detail and Menu */}
                    <RestaurantDetails {...restaurant}/>
                {/*{*/}
                {/*    Array.from(cuisineMenu.entries()).map(([cuisineType, foodItems]) => (*/}
                {/*        <RestaurantMenuCategory restaurantId={restaurant.id} restaurantName={restaurant.restaurantName} cuisineType={cuisineType} foodItems={foodItems} />*/}
                {/*    ))*/}
                {/*}*/}

                    <div className="mb-4 flex gap-2">
                        {
                            allCuisineTypes.map((type) => (
                            <button
                                key={type}
                                className={`px-4 py-2 rounded-full text-sm ${filterCuisineTypes.includes(type) ? 'bg-primary text-white' : 'bg-white'}`}
                                onClick={() => handleFilterCuisineType(type)}
                            >
                                {cuisineMap.get(type) || type}
                            </button>
                            ))
                        }
                    </div>

                    {
                        foodItems.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No food items available for the selected cuisine types.
                            </div>
                        ) : (
                            <RestaurantMenuCategory
                                restaurantId={restaurant.id}
                                restaurantName={restaurant.restaurantName}
                                foodItems={foodItems}
                            />
                        )
                    }
                </>
            )}
        </div>
    );
};

export default Restaurant;