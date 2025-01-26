import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Make sure to import Link for routing
import useOutsideClick from "../../outSideClickHook/index";
import { isSideBarClose, isSideBarOpen } from "../../redux/slices/toggleSlice";

export default function Header() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const isSidebarOpen = useSelector((state) => state.sidebar.isOpenSideBar); // Updated

  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();

  const handleSideBar = () => {
    if (isSidebarOpen) {
      dispatch(isSideBarClose());
    } else {
      dispatch(isSideBarOpen());
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  const dropdownRef = useOutsideClick(closeDropdown);
  const name  = localStorage.getItem("firstName"); 

  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
<header className="flex items-center justify-between flex-wrap bg-white text-white px-6 py-4 shadow-sm relative z-10">
  {/* Toggle Sidebar Button */}
  <div
    onClick={handleSideBar}
    className="cursor-pointer text-lg bg-[#353372] px-4 py-2 rounded-md hover:bg-[#4c4b7e] focus:outline-none"
  >
    <RxHamburgerMenu size={25} />
  </div>

  {/* User Dropdown */}
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={toggleDropdown}
      className="flex items-center gap-2 text-lg bg-[#353372] px-4 py-2 rounded-md focus:outline-none"
    >
      <FaUserCircle size={24} />
      <span>{name}</span>
      <MdArrowDropDown size={24} />
    </button>

    {dropdownVisible && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
        <ul>
          <li>
            <Link
              to="/update-profile"
              className="block px-4 py-2 hover:bg-[#353372] hover:text-white"
              onClick={closeDropdown}
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-[#353372] hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</header>

  );
}
