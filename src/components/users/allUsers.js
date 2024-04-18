import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as client from "./client";
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill}   from "react-icons/bs";
import TopBar from "../TopBar";
import {  Link } from "react-router-dom";
import useAuth from "./authenticateUser";
function UserTable() {
    const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const isUserSignedIn = !!currentUser;
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  const [user, setUser] = useState({ username: "", password: "", role: "USER", firstName: "", lastName: ""});
  

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };


  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  if (isUserSignedIn) {
  return (
    <div>
    <div style={{marginLeft:100}}>
      <h1>User List</h1>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr>
            <td>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
              <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </td>
            <td>
              <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="REVIEWER">Reviewer</option>
              </select>
            </td>
            <td>
            <BsFillCheckCircleFill onClick={updateUser}
                className="me-2 text-success fs-1 text" />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
              <Link to={`/account/${user._id}`}>{user.username}</Link>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <button className="btn btn-warning me-2">
              <BsPencil onClick={() => selectUser(user)} />
              </button>
              <button onClick={() => deleteUser(user)} className="btn btn-danger">
                            <BsTrash3Fill />
                          </button>
                      </tr>))}
        </tbody>
      </table>
    </div>
    </div>
  );}
}
export default UserTable;