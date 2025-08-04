import { useEffect, useState } from "react";
import {type CuisineType, type Restaurant} from "../../Commons/Type.ts";
import {NationalFoodTypeMap, sortOptions} from "../../Commons/DataDummy.ts";
import { AdjustmentsHorizontalIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import RestaurantCard from "../../Components/Restaurant/RestaurantCard";
import {getAllRestaurants, getRestaurantsByCuisineType} from "../../Commons/ApiFunction.ts";
import Loading from "../../Components/Loading/Loading.tsx";

const Restaurants = () => {
    const cuisineMap = new Map<string, string>(Object.entries(NationalFoodTypeMap))
        .set("All", "All");
    const cuisineTypes = Array.from(cuisineMap.keys());

    const [startIdx, setStartIdx] = useState(0);
    const maxVisible = 6;
    const totalPages = Math.ceil(cuisineTypes.length / maxVisible);
    const currentPage = Math.floor(startIdx / maxVisible);

    const [activeCuisine,setActiveCuisine] = useState<CuisineType | "All">("All");
    const [activeSort,setActiveSort]= useState<string>('rating');
    const [filteredRestaurants,setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchFilteredRestauratns = async () => {
            try {
                setLoading(true);
                const response = await getAllRestaurants();
                setFilteredRestaurants(response.restaurants);
                setLoading(false);
                console.log(response.restaurants);
            } catch (error) {
                console.error("Fetching restaurants failed: ", error);
            }
        }
        fetchFilteredRestauratns();
        console.log(cuisineTypes);
    }, []);

    useEffect(()=>{
        const fetchFilteredRestauratns = async (cuisineType: string) => {
            try {
                setLoading(true);
                let response;
                if (cuisineType === "All") {
                    response = await getAllRestaurants();
                } else {
                    response = await getRestaurantsByCuisineType(cuisineType);
                }
                setLoading(false);
                console.log(response.restaurants);
                setFilteredRestaurants(response.restaurants);
            } catch (error) {
                console.error("Fetching restaurants failed: ", error);
            }
        }
        fetchFilteredRestauratns(activeCuisine);

    },[activeCuisine,activeSort]);


    return (
        <div className="pb-8">
            {/* Banner */}
            <div className="rounded-lg mb-8 flex items-center justify-between overflow-hidden relative">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Restaurant banner"
                    className="h-48 w-full object-cover"
                />
                <div className="absolute p-8">
                    <div className="max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Discover Restaurants
                        </h2>
                        <h3 className="text-xl font-bold text-white mb-4">
                            Find Your Favorite Food
                        </h3>
                        <p className="text-white text-sm mb-4">
                            Explore the best restaurants in your area with fast delivery and
                            amazing food.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & Sort options */}
            <div className="mb-4">
                <div className="flex justify-between flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2">
                        {currentPage > 0 && (
                            <button
                                className="p-2 rounded-full bg-gray-200"
                                onClick={() => setStartIdx((currentPage - 1) * maxVisible)}
                            >
                                <ChevronLeftIcon className="h-5 w-5 text-gray-600"/>
                            </button>
                        )}
                        <div className="flex gap-2">
                            {cuisineTypes.slice(startIdx, startIdx + maxVisible).map(filter => (
                                <button
                                    key={filter}
                                    className={`px-4 py-2 rounded-full text-sm
                    ${activeCuisine === filter ? 'bg-primary text-white' : 'bg-white'}`}
                                    onClick={() => setActiveCuisine(filter as typeof activeCuisine)}
                                >
                                    {cuisineMap.get(filter)}
                                </button>
                            ))}
                        </div>
                        {currentPage < totalPages - 1 && (
                            <button
                                className="p-2 rounded-full bg-gray-200"
                                onClick={() => setStartIdx((currentPage + 1) * maxVisible)}
                            >
                                <ChevronRightIcon className="h-5 w-5 text-gray-600"/>
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className='h-5 w-5 text-gray-500'/>
                        <select className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary" value={activeSort}
                                onChange={(e) => setActiveSort(e.target.value)}>
                            {
                                sortOptions?.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loading/>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            filteredRestaurants?.map(restaurant => (
                                <RestaurantCard {...restaurant} key={restaurant.id}/>
                            ))
                        }
                    </div>
                    {filteredRestaurants.length === 0 && (
                        <div className="bg-white rounded-lg p-8 text-center">
                            <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
                            <p className="text-gray-500">Try changing your filters or check back later for new
                                restaurants.</p>
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default Restaurants;