import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {

    let [user, setUser] = useState(null);

    useEffect(() => {

        let token = localStorage.getItem("token");
          console.log("TOKEN:", token);
        axios.get("http://localhost:8000/api/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setUser(response.data.user);
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    return (
    <div className="profile-page">

        <div className="profile-box">

            <h2>My Profile</h2>

            {user && (
                <div className="profile-info">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}

            <button
                className="profile-logout"
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }}
            >
                Logout
            </button>

        </div>

    </div>
);
};

export default Profile;