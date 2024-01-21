import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../components/common/Loader";

import { SERVER_ORIGIN, validation } from "../../utilities/constants";
// import { refreshScreen } from "../../utilities/helper_functions";

const AdminUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function getAllUsers() {
          setIsLoading(true);
    
          try {
            const adminId = process.env.REACT_APP_ADMIN_ID;
            const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
            const basicAuth = btoa(`${adminId}:${adminPassword}`);
            const response = await fetch(
              `${SERVER_ORIGIN}/api/admin/auth/users/all`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Basic ${basicAuth}`, // Include Basic Authentication
                  "auth-token": localStorage.getItem("token"),
                },
              }
            );
    
            const result = await response.json();
            console.log(result);
    
            setIsLoading(false);
    
            if (response.status >= 400 && response.status < 600) {
              if (response.status === 401) {
                navigate("/admin/login");
              } else if (response.status === 500) {
                toast.error(result.statusText);
              }
            } else if (response.ok && response.status === 200) {
              setAllUsers(result.allUsers);
            } else {
              // for future
            }
          } catch (err) {
            // console.log(err.message);
            setIsLoading(false);
          }
        }
    
        getAllUsers();
      }, []);

  return (
    <>

    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    <div>AdminUsers</div>
    </>
  )
}

export default AdminUsers