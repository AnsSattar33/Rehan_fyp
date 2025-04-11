import React, { useEffect, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';

import { FaListCheck } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { LuMessageSquareText } from "react-icons/lu";
import { IoStatsChartOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";



const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated, otherwise redirect to login
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication data (localStorage)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex justify-between w-full h-screen">
      <div className="w-1/4 !p-10 flex flex-col justify-between">
        <div>
          <header>
            <h1>Welcome Admin</h1>
          </header>

          <ul className="flex flex-col gap-10 !mt-10">
            <li className="flex items-center gap-2 !p-2 rounded-md hover:bg-[#004080] group">
              <FaListCheck size={20} className="group-hover:text-white" />
              <Link to="/dashboard/orders" className="">
                <span className="text-lg font-semibold group-hover:text-white text-black">Orders</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 !p-2 rounded-md hover:bg-[#004080] group">
              <BsCartPlus size={20} className="group-hover:text-white" />
              <Link to="/dashboard/add-product" className="">
                <span className="text-lg font-semibold group-hover:text-white text-black">Add Product</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 !p-2 rounded-md hover:bg-[#004080] group">
              <LuMessageSquareText size={20} className="group-hover:text-white" />
              <Link to="/dashboard/messages" className="">
                <span className="text-lg font-semibold group-hover:text-white text-black">Messages</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 !p-2 rounded-md hover:bg-[#004080] group">
              <IoStatsChartOutline size={20} className="group-hover:text-white" />
              <Link to="/dashboard/statistics" className="">
                <span className="text-lg font-semibold group-hover:text-white text-black">Statistics</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <button className="edit-profile">Edit Profile</button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="w-3/4 !p-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
