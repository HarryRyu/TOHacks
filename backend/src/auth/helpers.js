const dotenv =require('dotenv')
dotenv.config()

/**
 * middleware to verify the auth status
 */
const verifyToken = async (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.send({
        error: true,
        message: 'Access Denied! No token found',
    })
}
module.exports = {
    verifyToken
}
