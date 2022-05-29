
const Express = require('express');
const cookie_parser = require('cookie-parser');
const cookie = require('cookie');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');
const { ExpressPeerServer } = require("peer");


const cors = require('cors');
var jwt = require('jsonwebtoken');

const app = Express()




const dotenv = require('dotenv');
const { verifyToken } = require('./auth/helpers');

dotenv.config()

// app.set('trust proxy', 1);

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
    console.log('mnmm', req.cookies)
    if (req.cookies.jwt_token) {
        const user = jwt.decode(req.cookies.jwt_token)
        req.user = user
    } else {
        req.user = null
    }
    next()
})



app.use('/api/auth/', authRoutes);
app.use('/api/session/', sessionRoutes);


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


const server = require("http").Server(app);


const io = require("socket.io")(server, {
    allowEIO3: true,
    debug: true,
    cors: {
        origin: process.env.CLIENT_URL ?? '/',
        credentials: true,
    }
});

const usersBySession = {};
const sessionBySocket = {}

io.on("connection", (socket) => {

    // if (!users[socket.id]) {
    //     users[socket.id] = socket.id;
    // }

    socket.on("join-session", (payload) => {
        const { sessionId } = payload;
        if (socket.handshake.headers.cookie) {
            const jwt_token = cookie.parse(socket.handshake.headers.cookie).jwt_token;
            const user = jwt.decode(jwt_token)
            if(!user) throw new Error('jwt token expired')
            if (!usersBySession[sessionId]) usersBySession[sessionId] = [];
            user['socket_id']=socket.id

            // TODO: send the details of currently connected clients to the new user
            socket.emit('start-session', usersBySession[sessionId])

            console.log('adding user', user)

            usersBySession[sessionId].push(user)
            sessionBySocket[socket.id] = sessionId

            socket.on('disconnect', () => {
                console.log('disconnect', socket)
                delete sessionBySocket[socket.id];
                usersBySession[sessionId] = usersBySession[sessionId].filter(e => e.socket_id !== socket.id);

                // TODO: sending to all connected clients with [sessionId] about disconnect of user
                for(const subscribedUser of usersBySession[sessionId]){
                    io.to(subscribedUser.socket_id).emit('user-left', user)
                }
            })

            socket.on('client-to-server-connect-with-user', (data) => {
                // console.log('requ', data, socket.id)
                io.to(data.socketIdOfUserToCall).emit('server-to-client-requesting-connection', {signal: data.signal, from: data.socketIdOfUserToCall, requestorSocketId: socket.id});
            })

            socket.on('client-to-server-connection-accepted', (data) => {
                io.to(data.requestorSocketId).emit('server-to-client-connection-accepted', data.signal);
            })


            // TODO: sending to all connected clients with [sessionId] about the new user
            for(const subscribedUser of usersBySession[sessionId]){
                // since we've already pushed the new user to array; need to make a check
                if(subscribedUser.socket_id !== socket.id) io.to(subscribedUser.socket_id).emit('new-user', user)
            }
            // io.sockets.emit("allUsers", users);
        } else {
            // TODO: Invalid request by user
            throw new Error('Invalid request')
        }
    });

    // socket.emit("yourID", socket.id);

    



    // socket.on("callUser", (data) => {
    //     io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
    // })

    // socket.on("acceptCall", (data) => {
    //     io.to(data.to).emit('callAccepted', data.signal);
    // })




    // socket.on("join-room", (roomId, userId, userName) => {
    //     socket.join(roomId);
    //     console.log(roomId, userId)
    //     //   socket.to(roomId).broadcast.emit("user-connected", userId);
    //     //   socket.on("message", (message) => {
    //     //     io.to(roomId).emit("createMessage", message, userName);
    //     //   });
    // });
});




server.listen(process.env.PORT ?? 8080, () => {
    console.log(`Server running at PORT:${process.env.PORT ?? 8080}`)
})
