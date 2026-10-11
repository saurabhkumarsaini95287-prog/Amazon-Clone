const userModel=require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userModelForm=async (req, res) => {

    try {

        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        let existinguserModel = await userModel.findOne({ email });

        if (existinguserModel) {
            return res.status(400).json({
                status: false,
                message: "Email already registered"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newuserModel = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newuserModel.save();

        res.status(201).json({
            status: true,
            message: "Signup successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });

    }

}

let userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        let passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid password"
            });
        }
         // JWT Token
        let token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            status: true,
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
};

let userProfile = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            user: user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
};

module.exports={userModelForm ,userLogin ,userProfile}