// this is also requiring the router and response from the express app to use it latter
const { Router, response } = require('express')

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

module.exports = router