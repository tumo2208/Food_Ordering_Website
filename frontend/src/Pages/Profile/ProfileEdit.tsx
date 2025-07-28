import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {updateUserProfile} from "../../Commons/ApiFunction.ts";
import provinceData from "../../vietnam_provinces_with_districts.json";
import {useUser} from "../../Context/User/UserContext.tsx";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [userClone, setUserClone] = useState(user);

    const cities = Object.keys(provinceData);
    const districts = userClone.city ? provinceData[userClone.city] : [];

    const setSelectedCity = (city: string) => {
        setUserClone(prev => ({
            ...prev,
            city: city,
            district: "", // reset district when city changes
        }));
    }

    const setSelectedDistrict = (district: string) => {
        setUserClone(prev => ({
            ...prev,
            district: district,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserClone(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(userClone);
            // localStorage.setItem("user", JSON.stringify(user));
            setUser(userClone);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-amber-200">
            <form
                className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold mb-8 text-center">Edit Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="name"
                            value={userClone.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="email"
                            value={userClone.email}
                            onChange={handleChange}
                            required
                            type="email"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Phone</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="phoneNumber"
                            value={userClone.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-medium">Citizen ID</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="citizenId"
                            value={userClone.citizenId}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-medium">Date of Birth</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="dob"
                            value={userClone.dob}
                            onChange={handleChange}
                            type="date"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Gender</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="gender"
                            value={userClone.gender}
                            onChange={handleChange}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium">Tỉnh/Thành phố</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.city"
                            value={userClone.city}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium">Quận/Huyện</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.district"
                            value={userClone.district}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!userClone.city}
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium">Số nhà</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="address.address"
                            value={userClone.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-10">
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-bold hover:bg-gray-400"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;