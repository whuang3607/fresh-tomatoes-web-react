import React, { useState, useEffect } from "react";
import { useAuth } from "../users/authenticateUser";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../TopBar";

function Edit() {
  const { currentUser } = useAuth();
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await client.findUserById(currentUser._id);
        user.dob = user.dob;
        console.log(user.dob);
        setEditedUser(user);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (currentUser) {
      fetchUserDetails();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    console.log("Input Change", e.target.name, e.target.value);
    const { name, value } = e.target;
    if (name === "dob") {
        setEditedUser((prevUser) => ({
          ...prevUser,
          [name]: new Date(value).toISOString(),
        }));
      } 
    else{
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
          }));
    }
    
  };

  const handleCancel = (e) => {
    navigate("/");
  };

  const handleSaveChanges = async () => {
    console.log("Save Changes", editedUser);
    try {
        editedUser.dob = editedUser.dob ? new Date(editedUser.dob) : null;
        await client.updateUser(editedUser);
        navigate("/profile");
    } catch (error) {
        console.error("Error updating user details", error);
    }
  };

    return (
    <div style={{marginLeft: 50}}>
        <h1 className="profile-header">Edit Profile</h1>
            <label for="username" className="form-label">
            Username
            </label>
            <input
            style={{width: 300}}
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={editedUser.username || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="email" className="form-label">
                Password
            </label>
            <input
                style={{width: 300}}
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={editedUser.password || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input
                style={{width: 300}}
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={editedUser.email || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="firstName" className="form-label">
                First Name
            </label>
            <input
                style={{width: 300}}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={editedUser.firstName || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="lastName" className="form-label">
                Last Name
            </label>
            <input
                style={{width: 300}}
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={editedUser.lastName || ""}
                onChange={handleInputChange}
            />

            <label htmlFor="dob" className="form-label">
                Date of Birth
            </label>
            <input
                style={{width: 300}}
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={editedUser.dob ? new Date(editedUser.dob).toISOString().split('T')[0] : ""}
                onChange={handleInputChange}
            />
        <br/>
        <button
          type="button"
          className="btn btn-success mt-3 !important"
          onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button style={{marginLeft:10}} onClick={handleCancel} className="btn btn-primary ms-2">
          Cancel
        </button>
    </div>);
}

export default Edit;
