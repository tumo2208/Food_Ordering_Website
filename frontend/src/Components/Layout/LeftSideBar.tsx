import {NavLink, useNavigate} from "react-router-dom";
import {BanknotesIcon, ClockIcon, Cog6ToothIcon, HomeIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {isAuthenticated, isRestaurantOwner, logout} from "../../Commons/ApiFunction.ts";
import type {User} from "../../Commons/Type.ts";
import {Menu} from "@headlessui/react";

interface SideBarProps {
    isOpen?:boolean;
    setIsOpen:any;
}

const LeftSideBar = ({isOpen,setIsOpen}:SideBarProps) => {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);
    const [restaurantOwner, setRestaurantOwner] = useState(false);
    const [user, setUser] = useState<User>({
        id: "",
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        district: "",
        city: "",
        citizenId: "",
        dob: "",
        gender: "OTHER",
        restaurantId: "",
    })

    useEffect(() => {
        const authenticated = isAuthenticated();
        setRestaurantOwner(isRestaurantOwner());
        setLoginState(authenticated);

        if (authenticated) {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            setUser(user);
        } else {
            setUser({
                id: "",
                email: "",
                name: "",
                phoneNumber: "",
                address: "",
                district: "",
                city: "",
                citizenId: "",
                dob: "",
                gender: "OTHER",
                restaurantId: "",
            });
        }
    }, []);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            logout();
            setLoginState(false);
            setRestaurantOwner(false);
            setUser({
                id: "",
                email: "",
                name: "",
                phoneNumber: "",
                address: "",
                district: "",
                city: "",
                citizenId: "",
                dob: "",
                gender: "OTHER",
                restaurantId: "",
            });
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
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/restaurants" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <BanknotesIcon className="h-6 w-6"/>
                        <span>Restaurants</span>
                    </NavLink>

                    <NavLink to="/messages" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <ChatBubbleLeftIcon className="h-6 w-6"/>
                        <span>Message</span>
                    </NavLink>

                    <NavLink to="/history" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <ClockIcon className="h-6 w-6"/>
                        <span>Order History</span>
                    </NavLink>

                    <NavLink to="/bills" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <BanknotesIcon className="h-6 w-6"/>
                        <span>Bills</span>
                    </NavLink>

                    <NavLink to="/settings" className={({isActive}) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <Cog6ToothIcon className="h-6 w-6"/>
                        <span>Setting</span>
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
                            {!restaurantOwner ? (
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
                            ) : (
                                <Menu.Item>
                                    {() => (
                                        <NavLink
                                            to="/profile"
                                            className={`block px-4 py-2 text-sm`}
                                        >
                                            Quản lý nhà hàng
                                        </NavLink>
                                    )}
                                </Menu.Item>
                            )}
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