import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoLogoBuffer } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import logo from "../../assets/images/others/logo.png";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrDocumentVerified } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import { MdOutlineRateReview } from "react-icons/md";

const allMenuItems = [
  { icons: <IoHomeOutline size={30} />, label: "Section Heads", path: "/" },
  {
    icons: <IoNewspaperOutline size={30} />,
    label: "All Papers",
    path: "/all-papers",
  },
  {
    icons: <GrDocumentVerified  size={30} />,
    label: "Accepted Paper",
    path: "/accepted-paper",
  },
  {
    icons: <RxCrossCircled size={30} />,
    label: "Rejected Paper",
    path: "/rejected-paper",
  },
  {
    icons: <SiTicktick size={30} />,
    label: "Assigned Paper",
    path: "/assigned-paper",
  },
  {
    icons: <MdOutlineRateReview size={30} />,
    label: "Reviewed Paper",
    path: "/review-paper",
  },
];

export default function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpenSideBar);

  const role = localStorage.getItem("Role");

  // Filter menu items based on the role
  const menuItems =
    role === "cheifEditor"
      ? allMenuItems // Show all routes for chiefeditor
      : allMenuItems.filter(
          (item) =>
            item.label === "Assigned Paper" || item.label === "Reviewed Paper"
        ); // Sho

  return (
    <div
      className={`shadow-md  h-full md:p-2 flex flex-col bg-[#353372] text-white transition-all duration-300 ease-in-out
        ${isSidebarOpen
          ? "w-[80px] md:w-[272px] p-2"
          : "w-0 md:w-[80px]"}`}
    >
      {/* Sidebar Header */}
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <span
          className={`transition-all duration-300 text-2xl ${
            isSidebarOpen ? "" : "w-0 opacity-0"
          }`}
        >
          <img className="bg-white p-2" src={logo} alt="logo"/>
          {/* Dashboard */}
        </span>
      </div>

      {/* Sidebar Body */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li key={index} className={` ${
            isSidebarOpen ? "md:px-3 py-2 my-2" : "px-1 py-1"
          }`}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex gap-2 items-center px-4 md:px-3 md:py-2 rounded-md duration-300 ${
                  isActive ? "bg-[#f29349]" : "hover:bg-[#f29349]"
                }`
              }
            >
              <div>{item.icons}</div>
              <p
                className={`transition-all duration-300 ${
                  !isSidebarOpen
                    ? "opacity-0 translate-x-24"
                    : "opacity-100 translate-x-0"
                } overflow-hidden`}
              >
                {item.label}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
