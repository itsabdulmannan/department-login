import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import logo from "../../assets/images/others/logo.png";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrDocumentVerified } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import { MdOutlineRateReview } from "react-icons/md";
import useOutsideClick from "../outSideClickHook/index";
import { isSideBarClose } from "../../redux/slices/toggleSlice";

const allMenuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: "Section Heads",
    path: "/",
    roles: ["cheifEditor"],
  },
  {
    icons: <IoNewspaperOutline size={30} />,
    label: "All Papers",
    path: "/all-papers",
    roles: ["cheifEditor"],
  },
  {
    icons: <GrDocumentVerified size={30} />,
    label: "Accepted Paper",
    path: "/accepted-paper",
    roles: ["cheifEditor"],
  },
  {
    icons: <RxCrossCircled size={30} />,
    label: "Rejected Paper",
    path: "/rejected-paper",
    roles: ["cheifEditor"],
  },
  {
    icons: <SiTicktick size={30} />,
    label: "Assigned Paper",
    path: "/assigned-paper",
    roles: ["cheifEditor"],
  },
  {
    icons: <MdOutlineRateReview size={30} />,
    label: "Reviewed Paper",
    path: "/review-paper",
    roles: ["cheifEditor"],
  },

  {
    icons: <SiTicktick size={30} />,
    label: "Assigned Papers",
    path: "/section-head-assigned-paper",
    roles: ["sectionHead"],
  },

  {
    icons: <MdOutlineRateReview size={30} />,
    label: "Reviewed Papers",
    path: "/section-head-review-paper",
    roles: ["sectionHead"],
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpenSideBar);

  const role = localStorage.getItem("Role");
  const menuItems =
    role === "cheifEditor"
      ? allMenuItems.filter(
          (item) =>
            item.label !== "Assigned Papers" && item.label !== "Reviewed Papers"
        )
      : allMenuItems.filter(
          (item) =>
            item.label === "Assigned Papers" || item.label === "Reviewed Papers"
        );

  const sidebarRef = useOutsideClick(() => {
    if (window.innerWidth < 768) {
      dispatch(isSideBarClose()); 
    }
  });

  return (
    <div
      ref={sidebarRef}
      className={`shadow-md h-screen md:h-full flex flex-col bg-[#353372] text-white transition-all duration-300 ease-in-out
    ${isSidebarOpen ? "w-[272px]" : "w-0"} 
    ${isSidebarOpen ? "fixed top-0 left-0 z-20" : ""} md:relative`}
    >
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <span
          className={`transition-all duration-300 text-2xl ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <img className="bg-white p-2 mt-3 sm:mt-0" src={logo} alt="logo" />
        </span>
      </div>

      {/* Sidebar Body */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li key={index} className="px-3 py-2 my-2">
            <NavLink
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  dispatch(isSideBarClose());
                }
              }}
              className={({ isActive }) =>
                `flex gap-2 items-center px-4 py-3  rounded-md duration-300 ${
                  isActive && isSidebarOpen
                    ? "bg-[#f29349] text-white"
                    : "hover:bg-[#f29349] hover:text-white"
                }`
              }
            >
              {isSidebarOpen && (
                <div className="transition-all duration-300">{item.icons}</div>
              )}

              <p
                className={`transition-all duration-300 ${
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-24"
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
