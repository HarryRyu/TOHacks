

const { Router } = require('express')
const db = require('../db/dbPool')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const { verifyToken } = require('../auth/helpers')
const Joi = require('joi')
var jwt = require('jsonwebtoken');

const uuid= require('uuid');

dotenv.config()

const app = Router()

app.get('/status', verifyToken, (req, res) => {
    let { password, current_token, ...userData } = req.user;
    res.json({
        user: userData,
        message: 'Successfully logged into private route',
    })
})


const registerUserPayloadSchema = Joi.object({
    email: Joi.string().email()
        .required(),
    password: Joi.string().required().min(8),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});



// register a new user
app.post('/register/', async (req, res, next) => {
    try {
        const {value, error} = registerUserPayloadSchema.validate(req.body)
        if(error){
            throw new Error(error)
        }

        const instance = await db.query(
            `SELECT * from users WHERE email = $1`,
            [value.email]
        )
        if (instance.rowCount !== 0) {
            throw Error('Email already exists')
        }

        // user doesn't exist
        const hashedPassword = await bcrypt.hash(value.password, 10)
        //   insert the user into Users table in database
        let data = await db.query(
            `INSERT INTO users(
                userId,
                firstName,
                lastName,
                email,
                createdAt,
                hashedPassword)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                uuid.v4(),
                value.firstName,
                value.lastName,
                value.email,
                new Date(),
                hashedPassword
            ]
        )

        let { hashedpassword, ...userData } = data.rows[0];

        var token = jwt.sign(userData, process.env.JWT_SECRET);
        res.cookie('jwt_token',token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
        res.send({
            error: false,
            user: userData,
            message: `User ${value.email} successfully registered`,
        })

    } catch (err) {
        res.send({ error: true, message: err.message })
    }
})

const loginUserPayloadSchema = Joi.object({
    email: Joi.string().email()
        .required(),
    password: Joi.string().required().min(8),
});



// ## Login
app.post('/login/', async (req, res, next) => {
    try {
        const {value, error} = loginUserPayloadSchema.validate(req.body)
        if(error){
            throw new Error(error)
        }

        const instance = await db.query(
            `SELECT * from users WHERE email = $1`,
            [value.email]
        )
        if (instance.rowCount === 0) {
            throw Error('Invalid credentials')
        }
        const isPassSame = await bcrypt.compare(
            value.password,
            instance.rows[0].hashedpassword
        )
        if (!isPassSame) {
            throw Error('Invalid credentials');
        }
        let { hashedpassword, ...userData } = instance.rows[0];

        var token = jwt.sign(userData, process.env.JWT_SECRET);
        res.cookie('jwt_token',token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
        res.send({
            error: false,
            message: `User ${value.email} successfully logged in`,
        })
    } catch (err) {
        res.send({ error: true, message: err.message })
    }
})

// ## logout
app.post('/logout', verifyToken, async (req, res) => {
    try {
        res.cookie('jwt_token','token', { httpOnly: true });

        res.send({ error: false, message: 'Logged out successfully!' })
    } catch (err) {
        res.send({
            error: true,
            message: err.message,
        })
    }
})

module.exports = app
