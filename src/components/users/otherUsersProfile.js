import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams} from "react-router-dom";
function Account() {
    const { userId } = useParams();
    console.log(userId);
    const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
    navigate("/users");
  };

  const handleCancel = (e) => {
    navigate("/users");
  };

 
  useEffect(() => {
    if (userId) {
        findUserById(userId);
      } else {
        fetchAccount();
      }
  
  }, []);
  return (
    <div className="w-50" style={{marginLeft:100}}>
      <h1>Account</h1>
      {account && (
        <div>
          <label>Password</label>
          <input value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })} style={{marginLeft:40}}/><br/>
          <label>First Name</label>
          <input value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })} style={{marginLeft:35}}/><br/>
          <label>Last Name</label>
          <input value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })} style={{marginLeft:35}}/><br/>
          <label>Email</label>
          <input value={account.email}
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })} style={{marginLeft:70}}/><br/>
        <label>Role</label>
          <select onChange={(e) => setAccount({ ...account,
              role: e.target.value })} style={{marginLeft: 75}}>
            <option value="AUDIENCE">AUDIENCE</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CRITIC">CRITIC</option>
          </select><br/><br/>
          <button onClick={save} className="btn btn-success w-100">
            Save
        </button> 
        <button onClick={handleCancel} className="btn btn-primary w-100" style={{marginLeft:10}}>
            Cancel
        </button><br/>
        
        </div>
      )}
    </div>
  );
}
export default Account;