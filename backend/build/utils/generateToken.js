import * as jwt from "jsonwebtoken";
// Generate token for user
export var generateToken = function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
