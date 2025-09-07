import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {registerRestaurantOwner} from "../../Commons/ApiFunction.ts";
import provinceData from "../../vietnam_provinces_with_districts.json";
import CuisineTypeSelector from "../../Components/CuisineTypeSelector/CuisineTypeSelector.tsx";

const RestaurantRegistration = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        restaurantName: "",
        contactNumber: "",
        contactEmail: "",
        locationAddress: "",
        locationDistrict: "",
        locationCity: "",
        description: "",
        operatingHours: "",
        cuisineTypes: [],
        restaurantImage: null,
    });
    const [cuisineTypes, setCuisineTypes] = useState<string[]>([]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState(false);

    const cities = Object.keys(provinceData);
    // @ts-ignore
    const districts = form.locationCity ? provinceData[form.locationCity] : [];

    const setSelectedCity = (city: string) => {
        setForm(prev => ({
            ...prev,
            locationCity: city,
            locationDistrict: "", // reset district when city changes
        }));
    }

    const setSelectedDistrict = (district: string) => {
        setForm(prev => ({
            ...prev,
            locationDistrict: district,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, restaurantImage: e.target.files?.[0] || null });
    };

    useEffect(() => {
        setForm({ ...form, cuisineTypes: cuisineTypes });
    }, [cuisineTypes]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.restaurantName) newErrors.restaurantName = "Restaurant name is required";
        if (!form.contactNumber || form.contactNumber.length !== 10) newErrors.contactNumber = "Phone number must be exactly 10 digits";
        if (!form.contactEmail || !/\S+@\S+\.\S+/.test(form.contactEmail)) newErrors.contactEmail = "Valid email required";
        if (!form.locationAddress) newErrors.locationAddress = "Address required";
        if (!form.locationDistrict) newErrors.locationDistrict = "District required";
        if (!form.locationCity) newErrors.locationCity = "City required";
        if (!form.operatingHours || !/^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(form.operatingHours)) {
            newErrors.operatingHours = "Format: HH:MM - HH:MM";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await registerRestaurantOwner(form);
            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-amber-200">
            <form
                className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl"
                onSubmit={handleSubmit}
            >
                {success && (
                    <div className="mb-4 text-green-600 font-semibold text-center">
                        Registration submitted successfully!
                    </div>
                )}
                <div className="grid grid-cols-1 gap-y-4 text-lg">
                    <div>
                        <label className="font-medium">Tên nhà hàng</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="restaurantName"
                            value={form.restaurantName}
                            onChange={handleChange}
                            required
                        />
                        {errors.restaurantName && <span className="text-red-500 text-sm">{errors.restaurantName}</span>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                className="w-full border rounded-md px-3 py-2 mt-1"
                                name="contactEmail"
                                value={form.contactEmail}
                                onChange={handleChange}
                                type="email"
                                required
                            />
                            {errors.contactEmail && <span className="text-red-500 text-sm">{errors.contactEmail}</span>}
                        </div>
                        <div>
                            <label className="font-medium">Số điện thoại</label>
                            <input
                                className="w-full border rounded-md px-3 py-2 mt-1"
                                name="contactNumber"
                                value={form.contactNumber}
                                onChange={handleChange}
                                maxLength={10}
                                required
                            />
                            {errors.contactNumber &&
                                <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <div>
                            <label className="font-medium">Tỉnh/Thành phố</label>
                            <select
                                className="w-full border rounded-md px-3 py-2 mt-1"
                                name="address.city"
                                value={form.locationCity}
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
                                value={form.locationDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                disabled={!form.locationCity}
                            >
                                <option value="">Chọn quận/huyện</option>
                                {districts.map((district: string) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="font-medium">Số nhà</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="locationAddress"
                            value={form.locationAddress}
                            onChange={handleChange}
                            required
                        />
                        {errors.locationAddress && <span className="text-red-500 text-sm">{errors.locationAddress}</span>}
                    </div>
                    <div>
                        <label className="font-medium">Giờ mở cửa</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="operatingHours"
                            value={form.operatingHours}
                            onChange={handleChange}
                            placeholder="08:00 - 22:00"
                            required
                        />
                        {errors.operatingHours && <span className="text-red-500 text-sm">{errors.operatingHours}</span>}
                    </div>
                    <CuisineTypeSelector selected={cuisineTypes} setSelected={setCuisineTypes} />
                    <div>
                        <label className="font-medium">Mô tả</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="font-medium">Ảnh đại diện</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded-md px-3 py-2 mt-1"
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-10">
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600"
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-bold hover:bg-gray-400"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RestaurantRegistration;