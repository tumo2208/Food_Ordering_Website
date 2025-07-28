import {NavLink, useNavigate} from "react-router-dom";
import {BanknotesIcon, ChartBarIcon, ClockIcon, Cog6ToothIcon, HomeIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {isAuthenticated, isRestaurantOwner, logout} from "../../Commons/ApiFunction.ts";
import { useUser } from '../../Context/User/UserContext.tsx';
import {Menu} from "@headlessui/react";

interface SideBarProps {
    isOpen?:boolean;
    setIsOpen:any;
}

const LeftSideBar = ({isOpen,setIsOpen}:SideBarProps) => {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);
    const [restaurantOwner, setRestaurantOwner] = useState(false);
    const { user } = useUser();
    const [showMyRestaurantOption, setShowMyRestaurantOption] = useState(false);

    useEffect(() => {
        const authenticated = isAuthenticated();
        setRestaurantOwner(isRestaurantOwner());
        setLoginState(authenticated);
        console.log("User: ", user);
    }, [user]);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            logout();
            console.log("Logout: ", user);
            setLoginState(false);
            setRestaurantOwner(false);
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    };

    return (
        <div className={`h-screen bg-white py-6 px-4 flex flex-col justify-between fixed md:static z-40 transition-all 
        duration-300 ease-in-out md:w-64 w-[60%] ${isOpen ? 'left-0' : '-left-64'} md:left-0 shadow-sm`}>

            {/* Close sidebar button for Mobile */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 md:hidden"
                aria-label="Close sidebar"
            >
                <XMarkIcon className="h-6 w-6 text-gray-500"/>
            </button>

            <div>
                {/* Logo */}
                <div className='mb-10 px-2'>
                    <h1 className='text-2xl font-bold'>ShopeeFood <span className='text-primary text-3xl'>.</span></h1>
                </div>

                {/* Navigation Links */}
                <nav className='space-y-6'>
                    <NavLink to="/" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <HomeIcon className="h-6 w-6"/>
                        <span>Trang chủ</span>
                    </NavLink>

                    <NavLink to="/restaurants" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <BanknotesIcon className="h-6 w-6"/>
                        <span>Nhà hàng</span>
                    </NavLink>

                    {/*<NavLink to="/messages" className={({isActive}) =>*/}
                    {/*    `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`*/}
                    {/*}>*/}
                    {/*    <ChatBubbleLeftIcon className="h-6 w-6"/>*/}
                    {/*    <span>Message</span>*/}
                    {/*</NavLink>*/}

                    {(loginState && !restaurantOwner) && (
                        <NavLink to="/history" className={({isActive}) =>
                            `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                        }>
                            <ClockIcon className="h-6 w-6"/>
                            <span>Lịch sử đơn hàng</span>
                        </NavLink>
                    )}

                    {loginState && restaurantOwner && (
                        <div className="mb-8">
                            <button
                                type="button"
                                className="flex items-center gap-3 text-gray-500 hover:text-primary w-full"
                                onClick={() => setShowMyRestaurantOption((prev) => !prev)}
                            >
                                <ChartBarIcon className="h-6 w-6" />
                                <span>Quản lý nhà hàng</span>
                                <svg
                                    className={`w-4 h-4 ml-auto transition-transform ${showMyRestaurantOption ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showMyRestaurantOption && (
                                <div className="ml-8 flex flex-col gap-2">
                                    <NavLink
                                        to={`/restaurants/${user.restaurantId}/revenue`}
                                        className={({ isActive }) =>
                                            `flex mt-5 items-center ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`
                                        }
                                    >
                                        <span>Doanh thu</span>
                                    </NavLink>
                                    <NavLink
                                        to={`/restaurants/${user.restaurantId}/menu`}
                                        className={({ isActive }) =>
                                            `flex mt-3 items-center ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`
                                        }
                                    >
                                        <span>Thực đơn</span>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    )}

                    {/*<NavLink to="/bills" className={({isActive}) =>*/}
                    {/*    `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`*/}
                    {/*}>*/}
                    {/*    <BanknotesIcon className="h-6 w-6"/>*/}
                    {/*    <span>Bills</span>*/}
                    {/*</NavLink>*/}

                    <NavLink to="/settings" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <Cog6ToothIcon className="h-6 w-6"/>
                        <span>Cài đặt</span>
                    </NavLink>
                </nav>
            </div>

            <div className="mt-auto border-t pt-4 px-2">
                {loginState ? (
                    <Menu as="div" className="relative">
                        <Menu.Button
                            className="flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md transition">
                            <img
                                src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'
                                alt='profile' className='bg-gray-400 rounded-lg w-8 h-8'/>
                            <span className="text-gray-700 font-medium">{user.name}</span>
                        </Menu.Button>
                        <Menu.Items
                            className="absolute bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <Menu.Item>
                                {() => (
                                    <NavLink
                                        to="/profile"
                                        className={`block px-4 py-2 text-sm`}
                                    >
                                        Thông tin cá nhân
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {() => (
                                    <button
                                        onClick={handleLogout}
                                        className={`w-full text-left block px-4 py-2 text-sm text-red-600`}
                                    >
                                        Đăng xuất
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                ) : (
                    <div className="flex flex-col gap-2">
                        <NavLink
                            to="/login"
                            className="w-full text-center bg-primary text-white py-2 rounded-md hover:opacity-90"
                        >
                            Đăng nhập
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="w-full text-center border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition"
                        >
                            Đăng ký
                        </NavLink>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LeftSideBar;