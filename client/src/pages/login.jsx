import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {

      const navigate = useNavigate();

    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    let [loading, setLoading] = useState(false);

    let handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            let response = await axios.post(
                "http://localhost:8000/api/user/login",
                formData
            );

            console.log(response.data);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert(response.data.message);

            navigate("/");

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Login failed");
        }
        finally {
               setLoading(false);
       }
    };

  return (
    <div className="login-page">

        <div className="login-box">

            <h2>Amazon Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="login-btn-submit"
                    disabled={loading}
               >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

                <Link to="/" className="back-home">
                       ← Back to Home
                </Link>

        </div>

    </div>
);
};

export default Login;