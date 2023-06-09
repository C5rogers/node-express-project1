// these are the modules that i need to inter in this app file to make it work more correctly

// this one will requre the express library from the node modure that yoused to create the instance of express application
const express = require('express')
const router = require('./routers/groceries')
const session = require('express-session');
//importing the passport library
const passport = require('passport')

//just accepting the connection from the database folder
require('./database/index')

const marketRouter = require('./routers/markets')
const authRouter = require('./routers/auth')
const cookieParser = require('cookie-parser')
    // requireing the express from the express library from function that will return the express app
const app = express()



// this will register the cookieParser tool to parse the cookie to be readen from this server
app.use(cookieParser())
app.use(session({
    secret: 'ABDKSDHSJHJETHWEJHRJSHFJHSDJFH',
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})


//this is where we need to setup our passport with the session we need
app.use(passport.initialize());
//this is for the session
app.use(passport.session())


// this will call the approprate routes to be called when the end point is reached
app.use('/api/v1/groceries', router);
app.use('/api/v1/markets', marketRouter);
app.use('/api/v1/auth', authRouter);

// the above will create the express app
const PORT = 3001;
app.listen(PORT, () => console.log(`Running Express Server On Port:${PORT}`))