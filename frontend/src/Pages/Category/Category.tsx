import {useState, useEffect} from 'react';
import Rating from "../../Components/Restaurant/Rating.tsx";
import {addItem} from "../../Context/Store/feature/cart.ts";
import {PlusIcon} from "@heroicons/react/24/solid";
import {useParams} from "react-router-dom";
import type {FoodItem} from "../../Commons/Type.ts";
import {getFoodByFoodType} from "../../Commons/ApiFunction.ts";
import {useAppDispatch} from "../../Context/Store/hooks.ts";

const Category = () => {
    const dispatch = useAppDispatch();
    const {foodType} = useParams();
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

    useEffect(() => {
        const fetchFoodItem = async (cuisineType: string) => {
            try {
                console.log(cuisineType);
                const response = await getFoodByFoodType(cuisineType);
                if (response) {
                    setFoodItems(response);
                }
            } catch (error) {
                console.error("Cannot fetch food items by cuisine type: ", error);
            }
        }
        console.log(foodType);
        fetchFoodItem(String(foodType));
    }, [foodType]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodItems?.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 relative cursor-pointer
                    hover:shadow-lg transition-all duration-300">
                    {/*/!* Discount *!/*/}
                    {/*{item.discount && (*/}
                    {/*    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">*/}
                    {/*        {item.discount}% Off*/}
                    {/*    </span>*/}
                    {/*)}*/}

                    {/*/!* Favorite Button *!/*/}
                    {/*<button*/}
                    {/*    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"*/}
                    {/*    onClick={(e) => {*/}
                    {/*        e.stopPropagation();*/}
                    {/*        // Handle favorite toggle logic here*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {item.favorite ? <HeartIcon className="h-6 w-6 text-red-500" /> : <HeartIcon className="h-6 w-6" />}*/}
                    {/*</button>*/}

                    {/* Image */}
                    <div className="flex justify-center mb-4">
                        <img src={item.imgUrl} alt={item.name} className="h-32 w-32 object-cover rounded-lg
                            transition-transform duration-300 hover:scale-105"/>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-2">
                        <Rating rating={item.rating.rating}/>
                    </div>

                    {/* Name and Description */}
                    <h3 className="text-center font-medium mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm text-center mb-2 line-clamp-2">{item.description}</p>

                    {/* Price */}
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">${item.minPrice.toFixed(2)}</span>
                        <button
                            className="bg-primary text-white p-2 rounded-md hover:bg-amber-600 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addItem({
                                    item: item as any,
                                    restaurantId: item.restaurantId,
                                    restaurantName: "Chọn theo loại ẩm thực",
                                }))
                            }}
                        >
                            <PlusIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Category;