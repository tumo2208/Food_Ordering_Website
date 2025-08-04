import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {changePassword} from "../../Commons/ApiFunction.ts";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới không khớp với xác nhận mật khẩu.");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);

            setSuccess("Mật khẩu đã được thay đổi thành công!");
            setTimeout(() => navigate("/profile"), 1500);
        } catch (err) {
            console.error("Error changing password:", err);
            // @ts-ignore
            if (err.status === 400) {
                setError("Mật khẩu hiện tại không đúng.");
                return;
            } else {
                setError("Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.");
            }
            return;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-amber-200">
            <form
                className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold mb-8 text-center">Change Password</h2>
                <div className="flex flex-col gap-6">
                    <input
                        type="password"
                        className="border rounded-md px-3 py-2"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="border rounded-md px-3 py-2"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="border rounded-md px-3 py-2"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-sm">{success}</div>}
                    <button
                        type="submit"
                        className="bg-amber-500 text-white py-2 rounded-md font-bold hover:bg-amber-600 transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 py-2 rounded-md font-bold hover:bg-gray-400 transition"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;