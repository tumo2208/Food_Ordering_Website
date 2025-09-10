import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/User/UserContext.tsx';
import {KeyIcon, UserPlusIcon} from "@heroicons/react/24/solid";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [addressData, setAddressData] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    useEffect(() => {
        setAddressData(user.address + ", " + user.district + ", " + user.city);
        if (user.gender === 'MALE') {
            setGender("Nam");
        } else if (user.gender === 'FEMALE') {
            setGender("Nữ");
        } else {
            setGender("Khác");
        }
        const arr = user.dob.split("-");
        if (arr.length === 3) {
            setDob(`${arr[2]}/${arr[1]}/${arr[0]}`);
        } else {
            setDob(user.dob);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
                    <p className="text-lg">No user information found.</p>
                    <button
                        className="mt-4 bg-amber-500 text-white py-2 px-4 rounded-md font-bold hover:bg-amber-600"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-amber-200">
            <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl relative">
                <button
                    className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-amber-600 transition"
                    onClick={() => navigate("/profile/edit")}
                >
                    Edit
                </button>
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                        alt="avatar"
                        className="w-24 h-24 rounded-full border-4 border-amber-300 shadow mb-4"
                    />
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <span className="text-gray-500">{user.email}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                    <div>
                        <span className="font-medium">Điện thoại:</span> {user.phoneNumber || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Địa chỉ:</span> {addressData || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">CCCD/CMND:</span> {user.citizenId || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Ngày sinh:</span> {dob || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Giới tính:</span> {gender || "N/A"}
                    </div>
                    {/* Add more fields if User type has more */}
                </div>

                <div className="flex flex-col md:flex-row gap-6 mt-10">
                    <button
                        className="flex items-center justify-center gap-3 w-full bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600 transition"
                        onClick={() => navigate("/profile/change-password")}
                    >
                        <KeyIcon className="h-5 w-5"/>
                        Thay đổi mật khẩu
                    </button>
                    {user.role === "CUSTOMER" && (
                        <button
                            className={`flex items-center justify-center gap-3 w-full py-2 rounded-md font-bold 
                                transition ${user.requestId ? "bg-gray-400 text-gray-200 cursor-not-allowed" : 
                                "bg-amber-500 text-white hover:bg-amber-600"}`}
                            onClick={() => navigate("/register-restaurant-owner")}
                            disabled={!!user.requestId}
                        >
                            <UserPlusIcon className="h-5 w-5"/>
                            Đăng ký làm chủ nhà hàng
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;