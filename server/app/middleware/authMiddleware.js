const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token required"
            });
        }

        // Bearer token se actual token nikalna
        token = token.split(" ")[1];

        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;