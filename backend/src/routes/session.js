

/*
Contains all routes for session
*/

const { Router } = require('express')
const { verifyToken } = require('../auth/helpers');
const pool = require('../db/dbPool');
const Joi = require('joi')
const app = Router()
const uuid = require('uuid');
const { getAccessToken, findOrCreateRoom } = require('../twilio');


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

        const sessionId = uuid.v4()

        await findOrCreateRoom(sessionId)

        const response = await pool.query(`
            INSERT INTO sessions(
                session_id,
                session_name,
                creator_user_id,
                created_at,
                is_challenge_active,
                challenge_pose_image_location
            )VALUES($1,$2,$3,$4,$5,$6) RETURNING *;
        `, [sessionId, value.session_name, req.user.user_id, new Date(), false, null])

        res.send({
            error: false,
            data: response.rows[0]
        })
    } catch (err) {
        res.send({ error: true, message: err.message })
    }
})


app.post('/details/', verifyToken, async (req, res) => {
    try {
        const sessionUUID = req.body.sessionUUID;
        if (!sessionUUID) {
            throw new Error('sessionUUID is needed')
        }


        const response = await pool.query(`
            SELECT 
                sessions.session_id,
                sessions.session_name,
                sessions.creator_user_id,
                sessions.created_at as session_created_at,
                sessions.current_active_challenge_id,
                challenges.challenge_creator_user_id,
                challenges.created_at as challenge_created_at,
                challenges.ended_at  as challenge_ended_at,
                challenges.challenge_pose_image_location,
                CONCAT('@', users.first_name, users.last_name) as challenge_creator_name
            FROM sessions
            LEFT JOIN challenges ON challenges.challenge_id = sessions.current_active_challenge_id
            LEFT JOIN users ON challenges.challenge_creator_user_id = users.user_id
            WHERE sessions.session_id=$1
        `, [sessionUUID])

        if (response.rowCount === 0) throw new Error('invalid UUID. Room doesn\'t exists')

        const data=response.rows[0]
        res.send({
            error: false,
            data: {
                ...(data),
                is_challenge_owner: (req.user.user_id===data.challenge_creator_user_id)
            }
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


/**
 * Main
 */



app.post("/get-access-token", verifyToken, async (req, res) => {
    try {
        const { sessionUUID } = req.body;
        // return 400 if the request has an empty body or no roomName
        if (!req.body || !sessionUUID) {
            throw new Error("Must include sessionUUID argument.")
        }
        // it's expected that room is already created

        console.log(req.user.user_id)
        // generate an Access Token for a participant in this room
        const token = await getAccessToken(sessionUUID, req.user.user_id, `${req.user.first_name} ${req.user.last_name}`);
        res.send({
            token: token,
        });
    } catch (err) {
        res.send({ error: true, message: err.message })
    }
});


const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const arr = file.originalname.split(' ')

        const suffix = arr[arr.length - 1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + suffix)
    }
});

const upload = multer({ storage });



app.post('/create-new-challenge/', verifyToken, upload.single('pose'), async (req, res) => {
    try {

        if (!req.file) throw new Error('Please upload a valid pose')

        const { session_id } = req.body;
        if (!session_id) throw new Error('session_id is needed')

        const challenge_id = uuid.v4()

        // check that there is no active challenge
        const sessionInstance=await pool.query(`select * from sessions where session_id=$1`, [session_id])
        if(!sessionInstance.rowCount){
            throw new Error('Invalid session id')
        }


        if(sessionInstance.rows[0].current_active_challenge_id){
            throw new Error('There is already an active session existing.. please wait...')
        }

        await pool.query(`update sessions set current_active_challenge_id=$1 where session_id=$2`, [challenge_id,session_id])
        

        const response = await pool.query(`insert into challenges(
            session_id,
            challenge_id,
            challenge_creator_user_id,
            created_at,
            ended_at,
            challenge_pose_image_location
        )VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [
            session_id,
            challenge_id,
            req.user.user_id,
            new Date(),
            null,
            req.file.path
        ])

        res.send({
            error: false,
            inserted_data: response.rows[0]
        })

    } catch (err) {
        res.send({ error: true, message: err.message })
    }
});




app.post('/end-challenge/', verifyToken, async (req, res) => {
    try {
        const { session_id, challenge_id } = req.body;
        if (!session_id) throw new Error('session_id is needed')
        if (!challenge_id) throw new Error('challenge_id is needed')


         // check that there is no active challenge
         const sessionInstance=await pool.query(`update sessions set current_active_challenge_id=NULL where session_id=$1 and current_active_challenge_id=$2`, [session_id,challenge_id])

         console.log(sessionInstance)

         if(!sessionInstance.rowCount){
             throw new Error('Invalid session id or challenge id')
         }

         await pool.query(`update challenges set ended_at=NULL where session_id=$1 and challenge_id=$2`, [session_id,challenge_id])

         res.send({
             error: false,
         })
        // check that there is no active challenge
    } catch (err) {
        res.send({ error: true, message: err.message })
    }
});




module.exports = app
