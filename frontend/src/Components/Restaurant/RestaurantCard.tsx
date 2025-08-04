import type { Restaurant } from '../../Commons/Type.ts'
import { Link } from 'react-router-dom'
import { ClockIcon, HeartIcon } from '@heroicons/react/24/outline'
import Rating from './Rating.tsx'
import {useEffect, useState} from "react";
import {getRestaurantById} from "../../Commons/ApiFunction.ts";

const RestaurantCard = (restaurant:Restaurant) => {
    const [cuisineTypes, setCuisineTypes] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        if (restaurant.cuisineTypes.length > 0) {
            setCuisineTypes(restaurant.cuisineTypes.join(", "));
        }
        setPriceRange(String(restaurant.minPrice) + "-" +  String(restaurant.maxPrice));
    }, [restaurant]);

    return (
        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
            {/* Image and info displayed on image */}
            <div className='relative h-48'>
                <img src={restaurant.imgUrl} alt={restaurant.restaurantName} className='w-full h-full object-cover'/>
                {/*<button className='absolute top-3 right-3 text-white hover:text-red-500 transition-colors'>*/}
                {/*    {favorite ? <HeartIcon className="h-6 w-6 text-red-500"/>:  <HeartIcon className="h-6 w-6" />}*/}
                {/*</button>*/}
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
                    <h3 className='text-white text-lg font-bold'>{restaurant.restaurantName}</h3>
                    <p className='text-white text-sm'> {cuisineTypes} • {priceRange}</p>
                </div>
            </div>

            {/* Details below image */}
            <div className='p-4'>
                {/* Rating */}
                <div className='flex items-center gap-1 mb-2'>
                    <div className='flex'>
                        <Rating rating={restaurant.rating.rating}/>
                    </div>
                    <span className='text-sm text-gray-600'>{restaurant.rating.rating} ({restaurant.rating.numberOfRatings})</span>
                </div>

                {/* Distance and delivery time */}
                {/*<div className='flex items-center justify-between mb-2'>*/}
                {/*    <div className='flex items-center gap-1 text-sm text-gray-600'>*/}
                {/*        <ClockIcon className="h-4 w-4"/>*/}
                {/*        <span>{deliveryTime} min</span>*/}
                {/*    </div>*/}
                {/*    <div className='text-sm text-gray-600'>*/}
                {/*        {distance} km away*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Minimum order */}
                <div className='text-sm text-gray-600'>
                    Min. order: {restaurant.minPrice}$
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;