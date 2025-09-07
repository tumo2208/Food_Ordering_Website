import { useEffect, useState } from "react";
import { getAllRestaurantRegistrationRequests, approveRestaurantRegistration } from "../../Commons/ApiFunction";
import {FoodTypeMap} from "../../Commons/DataDummy";
import Pagination from "../../Components/Pagination/Pagination.tsx";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {CheckIcon} from "@heroicons/react/24/outline";

type PendingRequest = {
    id: string;
    ownerId: string;
    restaurantName: string;
    contactNumber: string;
    contactEmail: string;
    locationAddress: string;
    locationDistrict: string;
    locationCity: string;
    description: string;
    operatingHours: string;
    cuisineTypes: string[];
    restaurantImageUrl: string;
    createdAt: string;
};

const PAGE_SIZE = 5;

const RequestList = () => {
    const [requests, setRequests] = useState<PendingRequest[]>([]);
    const [page, setPage] = useState(1);

    const getCuisineTypesVN = (cuisineTypes: string[]) => {
        // @ts-ignore
        return cuisineTypes.map(type => FoodTypeMap[type] || type);
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getAllRestaurantRegistrationRequests();
                setRequests(response);
            } catch (error) {
                console.error("Fetching requests failed: ", error);
            }
        }
        fetchRequests();
    }, []);

    const totalPages = Math.ceil(requests.length / PAGE_SIZE);
    const pagedRequests = requests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleAccept = async (id: string) => {
        try {
            const response = await approveRestaurantRegistration(id, "APPROVED");
            if (response.status === 200) {
                setRequests(requests.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Approval failed: ", error);
        }
    };

    const handleRemove = async (id: string) => {
        try {
            const response = await approveRestaurantRegistration(id, "REJECTED");
            if (response.status === 200) {
                setRequests(requests.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Reject failed: ", error);
        }
    };

    if (requests.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-3xl font-bold text-black">No pending restaurant requests.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-lg">
            <div className="space-y-6 mb-6">
                {pagedRequests.map(r => (
                    <div key={r.id} className="flex items-center justify-between bg-gray-50 rounded-xl shadow p-6">
                        <div className="flex items-center">
                            <img
                                src={r.restaurantImageUrl}
                                alt={r.restaurantName}
                                className="w-32 h-32 object-cover rounded-xl mr-6"
                            />
                            <div>
                                <div className="font-bold text-2xl mb-2">{r.restaurantName}</div>
                                <div className="text-gray-600 mb-1">{getCuisineTypesVN(r.cuisineTypes)}</div>
                                <div className="text-sm text-gray-500 mb-1">Hours: {r.operatingHours}</div>
                                <div className="text-sm text-gray-500 mb-1">Email: {r.contactEmail}</div>
                                <div className="text-sm text-gray-500 mb-1">Phone: {r.contactNumber}</div>
                                <div className="text-sm text-gray-500 mb-1">Address: {r.locationAddress}, {r.locationDistrict}, {r.locationCity}</div>
                                <div className="text-sm text-gray-500">Requested: {r.createdAt}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                className="bg-green-500 text-white text-xl rounded-full p-3 hover:bg-green-600"
                                title="Accept"
                                onClick={() => handleAccept(r.id)}
                            >
                                <CheckIcon className="w-6 h-6" />
                            </button>
                            <button
                                className="bg-red-500 text-white text-xl rounded-full p-3 hover:bg-red-600"
                                title="Remove"
                                onClick={() => handleRemove(r.id)}
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default RequestList;