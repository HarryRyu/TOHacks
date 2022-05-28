
const Express  =require('express');
const cookie_parser  =require('cookie-parser');
const authRoutes  =require('./routes/auth');
const cors  =require('cors');
var jwt = require('jsonwebtoken');

const app = Express()

const dotenv=  require('dotenv')

dotenv.config()

app.set('trust proxy', 1);

// Configuring connect pg for persistent sessions
app.use(
    cors({
        origin: process.env.CLIENT_URL ?? '/',
        credentials: true,
    })
);

// Configuring cookie and json parser middleware
app.use(cookie_parser())
app.use(Express.json())


// custom middleware to take the jsonwebtoken if any and build the user object
app.use((req, res, next) => {
    if(req.cookies.jwt_token){
        const user=jwt.decode(req.cookies.jwt_token)
        req.user=user
    }else{
        req.user=null
    }
    next()
})


app.use('/api/auth/', authRoutes);


app.get('/api/', (req, res) => {
    res.send({
        'status': 200,
        'error': false,
        'userDetails': req.user
    })
})

/**
 * Not Found Handler 
 */
app.get('/api/*', function (req, res) {
    res.status(404).send({
        error: true,
        message: `Cannot ${req.method} ${req.path}`
    });
});

app.listen(process.env.PORT ?? 8080, () => {
    console.log(`Server running at PORT:${process.env.PORT ?? 8080}`)
})
