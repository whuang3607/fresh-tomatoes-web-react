import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../users/authenticateUser";

function UserDeatils() {
    const { currentUser } = useAuth();

    const location = useLocation();
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        const pathParts = location.pathname.split("/");
        const currentTab = pathParts[pathParts.length - 1];
    
        setActiveTab(currentTab || "profile");
      }, [location.pathname]);
    return (
        <div>
      <ul className="nav nav-tabs" style={{width: 1500}}>
        <li className={`nav-item ${activeTab === "profile" ? "active" : ""}`}>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        {currentUser && currentUser.role != "ADMIN" &&( <li className={`nav-item ${activeTab === "reviews" ? "active" : ""}`}>
          <Link to="/reviews" className="nav-link">
            Reviews
          </Link>
        </li>)}
      </ul>
    </div>
    )
}
export default UserDeatils;