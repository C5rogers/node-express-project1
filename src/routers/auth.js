// this is also requiring the router and response from the express app to use it latter
const { Router, response } = require('express')
const User = require('../database/schemas/User')
    //importing the hash-password function from utils
const { hashPassword, compareHashedPassword } = require('../utils/helpers')


const router = Router()

// this route will authenticate the user based some conditions 
// and it is also fake authentication because of you dont set up mongodb that you can manipulate it letter and also make it more smartter
router.post('/login', async(req, res) => {
    // this will deconstract the email and password from the request body 
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(400).json({ error: { email: "The email fild is required", password: "The password fild is required" } })
    } else if (!email) {
        return res.status(400).json({ msg: "The email fild is required" })
    } else if (!password) {
        return res.status(400).json({ msg: "The Password Fild is required" })
    }

    //finding the user from the database
    const userDb = await User.findOne({ email })
    if (!userDb) {
        return res.status(401).json({ error: "Unauthorized!" })
    }

    const isValid = compareHashedPassword(password, userDb.password)

    if (isValid) {
        req.session.user = userDb
        return res.status(200).json({ msg: "welcome ser" })
    } else {
        return res.status(401).json({ error: "Invalid Credentials" })
    }
})

//this is registering end point for the user
router.post('/register', async(req, res) => {
    const { email, username } = req.body;
    const userDb = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (userDb) {
        res.status(400).json({ msg: "the user is already exist" })
    } else {
        const password = hashPassword(req.body.password)
        const newUesr = await User.create({ username, password, email })
        res.status(201).json({ newUesr })
    }
})

module.exports = router