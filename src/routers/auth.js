// this is also requiring the router and response from the express app to use it latter
const { Router, response } = require('express')
const User = require('../database/schemas/User')

const router = Router()

// this route will authenticate the user based some conditions 
// and it is also fake authentication because of you dont set up mongodb that you can manipulate it letter and also make it more smartter
router.post('/login', (request, response) => {
    // this will deconstract the username and password from the request body 
    const { username, password } = request.body
    if (username && password) {
        if (request.session.user) {
            response.send(request.session.user)
        } else {
            request.session.user = {
                username
            }
            response.send(request.session)
        }
    } else {
        response.sendStatus(401)
    }
})

//this is registering end point for the user
router.post('/register', async(req, res) => {
    const { email, password, username } = req.body;
    const userDb = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (userDb) {
        res.status(400).json({ msg: "the user is already exist" })
    } else {
        const newUesr = await User.create({ usrename, password, email })
        response.status(201).json({ newUesr })
    }
})

module.exports = router