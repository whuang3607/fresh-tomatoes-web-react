import React, { useEffect, useState } from "react";
import { useAuth } from "../users/authenticateUser";
import * as client from "./client";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDeatils from "./userDetailsPage";
function Profile() {
    const { currentUser } = useAuth();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
        try {
            const user = await client.findUserById(currentUser._id);
            setUserDetails(user);
        } catch (error) {
            console.error("Error fetching user details", error);
        }
        };

        
        if (currentUser) {
          fetchUserDetails();
        }
    }, [currentUser]);

    useEffect(() => {
        console.log("userDetails.dob:", userDetails ? userDetails.dob : null);
    }, [userDetails]);
    return (
        <div style={{position: "absolute"}}>
            <UserDeatils/>
             <div className="profile-container mt-5">
      {userDetails ? (
        <div>
          <div>
            <h1 className="profile-header">Welcome, {userDetails.username}!</h1>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Date of Birth: {userDetails.dob ? new Date(userDetails.dob).toLocaleDateString('en-US', { timeZone: 'UTC' }) : ""}</p>
            

            <Link  to="/edit" className="btn btn-primary me-2 fs-1">
              Edit 
            </Link>
            {userDetails.role === "ADMIN" && (
                <Link to="/users" className="btn btn-primary me-2 fs-1" style={{marginLeft:20}}>
                    Show All Users
                </Link>
            )}
          </div>
        </div>
      ) : (
        <Link to="/signin"></Link>
      )}
    </div>
        </div>  
    );
}
export default Profile;