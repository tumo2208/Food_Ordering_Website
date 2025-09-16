import { MapPinIcon } from "@heroicons/react/24/outline";
import {useUser} from "../../Context/User/UserContext.tsx";
import {useEffect, useState} from "react";
import provinceData from "../../vietnam_provinces_with_districts.json";

interface AddressProps {
    address: string;
    setAddress: (address: string) => void;
}

const Address = ({address, setAddress}: AddressProps) => {
    const {user} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [userClone, setUserClone] = useState({
        city: user.city || "",
        district: user.district || "",
        address: user.address || "",
    });


    const cities = Object.keys(provinceData);
    // @ts-ignore
    const districts = userClone.city ? provinceData[userClone.city] : [];

    useEffect(() => {
        setAddress(user.address + ", " + user.district + ", " + user.city);
        setUserClone({ city: user.city || "", district: user.district || "", address: user.address || "" });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserClone({ ...userClone, address: e.target.value });
    };

    const setSelectedCity = (city: string) => {
        setUserClone({ city, district: "", address: userClone.address });
    };

    const setSelectedDistrict = (district: string) => {
        setUserClone({ ...userClone, district });
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg mb-2">Địa chỉ của bạn</h2>

            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <p className="font-medium">{address}</p>
                </div>
                <div>
                    <button className="rounded-lg border-1 border-primary hover:bg-primary hover:text-white w-[80px] h-[32px]"
                            onClick={() => {
                                if (isEditing) {
                                    setAddress(userClone.address + ", " + userClone.district + ", " + userClone.city);
                                }
                                setIsEditing(!isEditing);
                            }}>
                        Change
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 space-y-3">
                    <div>
                        <label>Tỉnh/Thành phố</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.city"
                            value={userClone.city}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            <option>Chọn tỉnh/thành phố</option>
                            {cities.map((city) => (
                                <option key={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Quận/Huyện</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.district"
                            value={userClone.district}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!userClone.city}
                        >
                            <option>Chọn quận/huyện</option>
                            {districts.map((district: string) => (
                                <option key={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Số nhà</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.address"
                            value={userClone.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Address;