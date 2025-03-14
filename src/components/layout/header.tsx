"use client";
import SmIcon from "@/components/atom/icon/sm";
import Brand from "./brand";
import Item from "./item";
import { UserButton } from "@/components/auth/user-button";
import { useState } from "react";

const Header = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Brand and Navigation Section */}
        <div className="flex items-center">
          <div 
            className="flex items-center h-12"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Brand />
          </div>
          
          <div className={`ml-6 transition-all duration-200 ease-in-out ${hovered ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
            <div className="flex">
              <Item />
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center">
          <div className="profile">
            <div className="profile-overlay"></div>
            <div className="z-20 w-full h-full">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;