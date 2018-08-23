const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config()
const cors = require('cors');

const mongoose = require ('./database');

const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

const app = express();
// const io = require('socket.io')(80);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    }),
    secret: 'authlivecode',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URI, process.env.CLOUDINARY_URL]
}));

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});


const server = app.listen(cross.NormalizePort(process.env.PORT || 8080));
const io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', (socket) => {

    console.log('a user connected');

    let noteRoom = '';

    socket.join(noteRoom);

    socket.on('session-change', (id) => {

        console.log(`Connection to: ${id}`);

        noteRoom = id; 
        socket.join(id);
        socket.broadcast.to(noteRoom).emit('request', socket.id);
    });

    socket.on('refresh', (strokes) => {
        socket.broadcast.to(strokes.rid).emit('refresh', { rawStrokes: strokes.rawStrokes, strokeGroups: strokes.strokeGroups});
    });

    socket.on('change', (rawstrokes, strokeGroups) => {
        socket.broadcast.to(noteRoom).emit('change', rawstrokes, strokeGroups);
    });
});

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({code: 'not found'});
});
  
app.use((err, req, res, next) => {
    // always log the error
    console.error('ERROR', req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        res.status(500).json({code: 'unexpected'});
    }
});
  

module.exports = app;
