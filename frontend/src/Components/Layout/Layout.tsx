import React, { useState } from 'react'
import LeftSideBar from './LeftSideBar.tsx';
import RightSideBar from './RightSideBar';
import Header from "./Header.tsx";
import {Bars3Icon} from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';


interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
    const location = useLocation();
    const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden relative">

            {/* Overlay when sidebar opens on Mobile */}
            {isLeftSideBarOpen && <div
                className="fixed inset-0 bg-black/75 z-30 md:hidden
       transition-opacity duration-300 ease-in-out"
                onClick={()=> setIsLeftSideBarOpen(!isLeftSideBarOpen)}
                aria-hidden="true"
            />}

            {/* Left Sidebar */}
            <LeftSideBar isOpen={isLeftSideBarOpen} setIsOpen={setIsLeftSideBarOpen}/>
            <div className="flex-1 bg-gray-100 overflow-y-auto">

                {/* Open sidebar button for Mobile */}
                <button
                    onClick={() => setIsLeftSideBarOpen(!isLeftSideBarOpen)}
                    className="md:hidden h-6 w-6 p-6 bg-gray-100"
                    aria-label="Toggle menu"
                >
                    <Bars3Icon className="h-8 w-8 text-gray-500"/>
                </button>

                {/* Main Content */}
                <main className="p-3 sm:p-4 md:p-5 w-full">
                    {location.pathname !== '/profile' && <Header />}
                    {children}
                </main>
            </div>

            {/* Right Sidebar */}
            <RightSideBar/>
        </div>
    );
}

export default Layout