import React, { useEffect, ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Dashboard.css';

import { FaListCheck } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { LuMessageSquareText } from "react-icons/lu";
import { IoStatsChartOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";



const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location = ', location.pathname);
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
            <NavLink to="/dashboard" className={`${location.pathname === '/dashboard' ? 'bg-[#004080]' : ''}`}>
              <li className="flex items-center gap-2 !p-2 rounded-md ">
                <FaListCheck size={20} className={`${location.pathname === '/dashboard' ? 'text-white' : 'text-black'}`} />
                <span className={`text-lg font-semibold ${location.pathname === '/dashboard' ? 'text-white' : 'text-black'}`}>Orders</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/add-product" className={({ isActive }) => (isActive ? "bg-[#004080] " : "")}>
              <li className="flex items-center gap-2 !p-2 rounded-md">
                <BsCartPlus size={20} className={`${location.pathname === '/dashboard/add-product' ? 'text-white' : 'text-black'}`} />
                <span className={`text-lg font-semibold ${location.pathname === '/dashboard/add-product' ? 'text-white' : 'text-black'}`}>Add Product</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/messages" className={({ isActive }) => (isActive ? "bg-[#004080]" : "")}>
              <li className="flex items-center gap-2 !p-2 rounded-md">
                <LuMessageSquareText size={20} className={`${location.pathname === '/dashboard/messages' ? 'text-white' : 'text-black'}`} />
                <span className={`text-lg font-semibold ${location.pathname === '/dashboard/messages' ? 'text-white' : 'text-black'}`}>Messages</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/statistics" className={({ isActive }) => (isActive ? "bg-[#004080]" : "")}>
              <li className="flex items-center gap-2 !p-2 rounded-md">
                <IoStatsChartOutline size={20} className={`${location.pathname === '/dashboard/statistics' ? 'text-white' : 'text-black'}`} />
                <span className={`text-lg font-semibold ${location.pathname === '/dashboard/statistics' ? 'text-white' : 'text-black'}`}>Statistics</span>
              </li>
            </NavLink>
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
