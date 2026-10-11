import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
    const navigate = useNavigate();
    let [formData, setFormData] = useState({
        name: "",
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
                "http://localhost:8000/api/user/signup",
                formData
            );

            console.log(response.data);
            alert(response.data.message);
           
           setFormData({
              name: "",
              email: "",
              password: ""
           });

        navigate("/login");

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Signup failed");
        }
        finally {
               setLoading(false);
        }
    };

  return (
    <div className="signup-page">

        <div className="signup-box">

            <h2>Amazon Signup</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                />

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
                     className="signup-btn"
                     disabled={loading}
                >
                   {loading ? "Signing up..." : "Signup"}
               </button>

            </form>

            <p className="login-text">
                Already have an account?
            </p>

            <Link to="/login" className="login-btn">
                Login
            </Link>
        
          <Link to="/" className="back-home">
                 ← Back to Home
         </Link>
        </div>

    </div>
);

}

export default Signup;