import Cart from '../Cart/Cart.tsx'
import {isAuthenticated, isRestaurantOwner, logout} from "../../Commons/ApiFunction.ts";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

const RightSideBar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const restaurantOwner = isRestaurantOwner();

    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (authenticated) {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            setUserName(user.name);
        }
    }, []);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            logout();
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    };

    return (
        <>
            {authenticated ? (
                <div className='mt-4 p-4 max-w-sm md:min-w-70'>
                    <div className='flex justify-center items-center'>
                        <div>
                            <img
                                src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'
                                alt='profile' className='bg-gray-400 rounded-lg w-[96px] h-[96px]'/>
                        </div>
                        <h2 className="text-xl font-bold">{userName}</h2>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 mb-12">
                    {restaurantOwner ? (
                            <button className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm
                            hover:border-primary hover:text-primary cursor-pointer">Nhà hàng của tôi</button>
                        ) : (
                            <>
                                <button className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm
                                hover:border-primary hover:text-primary cursor-pointer">Xem thông tin</button>
                            </>
                        )}

                        <button onClick={handleLogout} className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm
                            hover:border-primary hover:text-primary cursor-pointer">
                            Đăng xuất
                        </button>
                    </div>

                    <Cart/>
                </div>
            ) : (
                <div className="flex gap-2 mt-10 h-1/5">
                    <button onClick={() => navigate("/login")} className="flex-1 border border-gray-200 max-h-16 md:min-w-25 rounded-md px-4 py-2 text-sm
                        hover:border-primary hover:text-primary cursor-pointer">
                        Đăng nhập
                    </button>

                    <button onClick={() => navigate("/register")} className="flex-1 border border-gray-200 max-h-16 md:min-w-25 rounded-md px-4 py-2 text-sm
                        hover:border-primary hover:text-primary cursor-pointer">
                        Đăng ký
                    </button>
                </div>
            )}
        </>
    )
}

export default RightSideBar