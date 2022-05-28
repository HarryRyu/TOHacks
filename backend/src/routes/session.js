

/*
Contains all routes for session
*/

const { Router } = require('express')
const { verifyToken } = require('../auth/helpers');
const pool = require('../db/dbPool');
const Joi = require('joi')
const app = Router()
const uuid = require('uuid')


const newSessionPayloadSchema = Joi.object({
    session_name: Joi.string().required()
});

/**
 * Route to create a new session
 */
app.post('/create/', verifyToken, async (req, res) => {
    try {
        const { value, error } = newSessionPayloadSchema.validate(req.body)
        if (error) {
            throw new Error(error)
        }

        const response = await pool.query(`
            INSERT INTO sessions(
                session_id,
                session_name,
                creator_user_id,
                created_at,
                is_challenge_active,
                challenge_pose_image_location
            )VALUES($1,$2,$3,$4,$5,$6) RETURNING *;
        `, [uuid.v4(), value.session_name, req.user.user_id, new Date(), false, null])

        res.send({
            error: false,
            data: response.rows[0]
        })
    } catch (err) {
        res.send({ error: true, message: err.message })
    }
})


/**
 * Get all of your sessions; 
 */
// app.get('/')


/**
 * Get recent sessions
 */


module.exports = app
