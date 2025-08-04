import type { Restaurant } from '../../Commons/Type.ts';
import { ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import {useEffect, useState} from "react";

const RestaurantDetails = (restaurant:Restaurant) => {
    const [addressData, setAddressData] = useState("");

    useEffect(() => {
        if (restaurant.location) {
            setAddressData(restaurant.location.address + ", " + restaurant.location.district + ", " + restaurant.location.city);
        }
    }, []);

    return (
        <div className='bg-white rounded-lg p-6 mb-8'>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={restaurant.imgUrl}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{addressData}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Delivery Time</p>
                                <p className="font-medium">{restaurant.operatingHours} min</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="font-medium">{restaurant?.contactNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;