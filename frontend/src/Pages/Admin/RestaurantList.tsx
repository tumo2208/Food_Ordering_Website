import { useEffect, useState } from "react";
import { getAllRestaurants } from "../../Commons/ApiFunction";
import type {Restaurant} from "../../Commons/Type.ts";
import { FoodTypeMap } from "../../Commons/DataDummy.ts";
import Pagination from "../../Components/Pagination/Pagination.tsx";
import {NoSymbolIcon, XMarkIcon} from "@heroicons/react/24/solid";


const PAGE_SIZE = 5;

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [page, setPage] = useState(1);
    const [banModal, setBanModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
    const [banDays, setBanDays] = useState(1);

    const getCuisineTypesVN = (cuisineTypes: string[]) => {
        // @ts-ignore
        return cuisineTypes.map(type => FoodTypeMap[type] || type);
    };

    useEffect(() => {
        try {
            const fetchRestaurants = async () => {
                const response = await getAllRestaurants();
                setRestaurants(response.restaurants);
            };
            fetchRestaurants();
        } catch (error) {
            console.error("Fetching restaurants failed: ", error);
        }
    }, []);

    const totalPages = Math.ceil(restaurants.length / PAGE_SIZE);
    const pagedRestaurants = restaurants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleBan = (id: string) => {
        // Call API to ban restaurant for banDays
        setBanModal({ open: false, id: null });
    };

    const handleDelete = (id: string) => {
        // Call API to delete restaurant
        setRestaurants(restaurants.filter(r => r.id !== id));
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <div className="space-y-6 mb-6">
                {pagedRestaurants.map(r => (
                    <div key={r.id} className="flex items-center justify-between bg-gray-50 rounded-xl shadow p-6">
                        <div className="flex items-center">
                            <img
                                src={r.imgUrl}
                                alt={r.restaurantName}
                                className="w-32 h-32 object-cover rounded-xl mr-6"
                            />
                            <div>
                                <div className="font-bold text-2xl mb-2">{r.restaurantName}</div>
                                <div className="flex flex-wrap gap-2 mb-1">
                                    {getCuisineTypesVN(r.cuisineTypes).slice(0, 3).map((type, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {type}
                                        </span>
                                    ))}
                                    {getCuisineTypesVN(r.cuisineTypes).length > 3 && (
                                        <span
                                            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                                            ...
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 mb-1">Giờ mở cửa: {r.operatingHours}</div>
                                <div className="text-sm text-gray-500 mb-1">Email: {r.contactEmail}</div>
                                <div className="text-sm text-gray-500">SĐT: {r.contactNumber}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                className="text-yellow-500 text-2xl hover:bg-red-100 rounded-full p-3"
                                title="Ban"
                                onClick={() => setBanModal({open: true, id: r.id})}
                            >
                                <NoSymbolIcon className="w-6 h-6"/>
                            </button>
                            <button
                                className="text-red-500 text-2xl hover:bg-gray-200 rounded-full p-3"
                                title="Delete"
                                onClick={() => handleDelete(r.id)}
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            {banModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-2">Ban Restaurant</h3>
                        <label className="block mb-2">
                            Number of days:
                            <input
                                type="number"
                                min={1}
                                max={30}
                                value={banDays}
                                onChange={e => setBanDays(Number(e.target.value))}
                                className="ml-2 border rounded px-2 py-1 w-20"
                            />
                        </label>
                        <div className="space-x-2 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => handleBan(banModal.id!)}
                            >
                                Confirm Ban
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-1 rounded"
                                onClick={() => setBanModal({ open: false, id: null })}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantList;