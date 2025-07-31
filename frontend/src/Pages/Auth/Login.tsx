import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {LoginData} from "../../Commons/Type.ts";
import {getUserProfile, login} from "../../Commons/ApiFunction.ts";
import Loading from "../../Components/Loading/Loading.tsx";
import {useUser} from "../../Context/User/UserContext.tsx";

const Login = () => {
    const navigate = useNavigate();

    const {setUser} = useUser();

    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            console.error("Login failed:", error);
            setError("Tài khoản hoặc mật khẩu sai. Vui lòng thử lại.");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <button
                        className="text-amber-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </p>
            </div>

            {loading && <Loading/>}
        </div>
    );
};

export default Login;