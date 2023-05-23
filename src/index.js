const express = require('express')
const router = require('./routers/groceries')
const session = require('express-session');
const marketRouter = require('./routers/markets')
const authRouter = require('./routers/auth')
const cookieParser = require('cookie-parser')
    // requireing the express from the express library from function that will return the express app
const app = express()


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



app.use('/api/v1/groceries', router);
app.use('/api/v1/markets', marketRouter);
app.use('/api/v1/auth', authRouter);

// the above will create the express app
const PORT = 3001;
app.listen(PORT, () => console.log(`Running Express Server On Port:${PORT}`))