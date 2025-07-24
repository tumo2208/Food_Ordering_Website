import { NavLink } from "react-router-dom";
import {BanknotesIcon, ClockIcon, Cog6ToothIcon, HomeIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {ChatBubbleLeftIcon} from "@heroicons/react/24/solid";

interface SideBarProps {
    isOpen?:boolean;
    setIsOpen:any;
}

const LeftSideBar = ({isOpen,setIsOpen}:SideBarProps) => {
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
                    <NavLink to="/" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <HomeIcon className="h-6 w-6"/>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/restaurants" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <BanknotesIcon className="h-6 w-6"/>
                        <span>Restaurants</span>
                    </NavLink>

                    <NavLink to="/messages" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <ChatBubbleLeftIcon className="h-6 w-6"/>
                        <span>Message</span>
                    </NavLink>

                    <NavLink to="/history" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <ClockIcon className="h-6 w-6"/>
                        <span>Order History</span>
                    </NavLink>

                    <NavLink to="/bills" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <BanknotesIcon className="h-6 w-6"/>
                        <span>Bills</span>
                    </NavLink>

                    <NavLink to="/settings" className={({ isActive }) =>
                        `flex mb-8 items-center gap-3 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`
                    }>
                        <Cog6ToothIcon className="h-6 w-6"/>
                        <span>Setting</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default LeftSideBar;