import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "components/sidebar";
import Header from "components/header";
import DashboardRoutes from "../../../containers/dashboard/index";

const MainLayout = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpenSideBar);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div
          // className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          //   isSidebarOpen ? "ml-20 md:ml-60" : "md:ml-20 ml-0"
          // }`}
          className={`w-full  flex flex-col transition-all duration-300 ${
            isSidebarOpen ? 'w-[calc(100%-80px)] md:w-[calc(100%-272px)]':'w-full md:w-[calc(100%-80px)]'
          }`}
        >
          <div>
            <Header />
          </div>
          <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
            <DashboardRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
