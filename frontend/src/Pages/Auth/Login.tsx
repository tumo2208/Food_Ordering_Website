import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {LoginData} from "../../Commons/Type.ts";
import {getUserProfile, login} from "../../Commons/ApiFunction.ts";
import Loading from "../../Components/Loading/Loading.tsx";
import {useUser} from "../../Context/User/UserContext.tsx";

const TABS = [
    { key: "user", label: "User", color: "bg-amber-500" },
    { key: "admin", label: "Admin", color: "bg-blue-600" }
];

const TAB_IMAGES: Record<"user" | "admin", string> = {
    user: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    admin: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
};

const Login = () => {
    const navigate = useNavigate();

    const {setUser} = useUser();

    const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: "",
        isAdmin: false
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await login(formData);
            if (response.status === 200) {
                const userData = await getUserProfile();
                setUser(userData);
                navigate("/");
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Background transition overlay */}
            <div
                className="absolute inset-0 transition-opacity duration-700 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${TAB_IMAGES.user}')`,
                    opacity: activeTab === "user" ? 1 : 0,
                    zIndex: 0
                }}
            />
            <div
                className="absolute inset-0 transition-opacity duration-700 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${TAB_IMAGES.admin}')`,
                    opacity: activeTab === "admin" ? 1 : 0,
                    zIndex: 0
                }}
            />
            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md bg-opacity-90 relative z-10">
                <div className="flex mb-6">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            className={`flex-1 py-2 font-bold rounded-t-lg transition-colors duration-300
                                ${activeTab === tab.key
                                ? `${tab.color} text-white`
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            onClick={() => {
                                setActiveTab(tab.key as "user" | "admin");
                                setFormData(prev => ({
                                    ...prev,
                                    isAdmin: tab.key === "admin"
                                }));
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="relative min-h-[250px]">
                    <div
                        className={`absolute inset-0 transition-opacity duration-500
                            ${activeTab === "user" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                    >
                        <form onSubmit={handleLogin} className="space-y-4">
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
                            <div>
                                <label className="block mb-1 font-medium">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            {error && <div className="text-red-500 mt-2">{error}</div>}
                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    <div
                        className={`absolute inset-0 transition-opacity duration-500
                            ${activeTab === "admin" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                    >
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Admin Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="admin@abc.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Admin Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu admin"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            {error && <div className="text-red-500 mt-2">{error}</div>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700"
                            >
                                Login as Admin
                            </button>
                        </form>
                    </div>
                </div>

                {activeTab === "user" && (
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <button
                        className="text-amber-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </p>
                )}

            </div>

            {loading && <Loading/>}
        </div>
    );
};

export default Login;