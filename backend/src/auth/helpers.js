const dotenv =require('dotenv')
dotenv.config()

/**
 * middleware to verify the auth status
 */
const verifyToken = async (req, res, next) => {
    console.log(req.user)
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
