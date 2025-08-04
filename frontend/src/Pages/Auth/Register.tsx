import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register} from "../../Commons/ApiFunction.ts";
import type {RegistrationUserData} from "../../Commons/Type.ts";
import provinceData from "../../vietnam_provinces_with_districts.json";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegistrationUserData>({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        address: "",
        district: "",
        city: "",
        citizenId: "",
        dob: "",
        gender: "OTHER",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const cities = Object.keys(provinceData);
    // @ts-ignore
    const districts = formData.city ? provinceData[formData.city] : [];

    const setSelectedCity = (city: string) => {
        setFormData(prev => ({
            ...prev,
            city: city,
            district: "", // reset district when city changes
        }));
    }

    const setSelectedDistrict = (district: string) => {
        setFormData(prev => ({
            ...prev,
            district: district,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setError("Mật khẩu không khớp. Vui lòng thử lại.");
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        const dobFormatted = `${dobYear}-${dobMonth.padStart(2, "0")}-${dobDay.padStart(2, "0")}`;
        const finalData = { ...formData, dob: dobFormatted };
        console.log("Final Registration Data:", finalData);

        try {
            const response = await register(finalData);
            if (response.status === 200) {
                setSuccess("Đăng ký thành công! Chuyển hướng tới trang đăng nhập...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {

        }

    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="VD: example@abc.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label className="block mb-1 font-medium">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 font-medium">Họ và Tên</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="VD: Nguyễn Văn A"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Date of Birth</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select
                                className="border rounded-md px-3 py-2"
                                value={dobDay}
                                onChange={e => setDobDay(e.target.value)}
                                required
                            >
                                <option value="">Day</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                                ))}
                            </select>
                            <select
                                className="border rounded-md px-3 py-2"
                                value={dobMonth}
                                onChange={e => setDobMonth(e.target.value)}
                                required
                            >
                                <option value="">Month</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                                ))}
                            </select>
                            <select
                                className="border rounded-md px-3 py-2"
                                value={dobYear}
                                onChange={e => setDobYear(e.target.value)}
                                required
                            >
                                <option value="">Year</option>
                                {Array.from({length: 100}, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={String(year)}>{year}</option>;
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Phone number */}
                    <div>
                        <label className="block mb-1 font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Citizen ID */}
                    <div>
                        <label className="block mb-1 font-medium">CCCD/CMND</label>
                        <input
                            type="text"
                            name="citizenId"
                            placeholder="Nhập số CCCD/CMND"
                            value={formData.citizenId}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium">Thành phố</label>
                        <select
                            className="w-full border rounded-md px-3 py-2"
                            value={formData.city}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            required
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
                        <label className="block mb-1 font-medium">Quận/Huyện</label>
                        <select
                            className="w-full border rounded-md px-3 py-2"
                            value={formData.district}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!formData.city}
                            required
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district:string) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Số nhà</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Gender */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>

                    {/* Error and Success Messages */}
                    {success && <div className="text-green-500 mt-2">{success}</div>}
                    {error && <div className="text-red-500 mt-2">{error}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <button
                        className="text-amber-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;