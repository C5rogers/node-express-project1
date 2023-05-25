// this will require the react library from the node_modules to be create some sub router to the user to be seen
const { Router, response } = require('express')

const router = Router()


// this will define teh market list of the data to be send to the user if it is not satisfied
const markets = [{
    id: 1,
    store: "kara chaf",
    miles: 2.4
}, {
    id: 2,
    store: "megeneagna chaf",
    miles: 4.3
}, {
    id: 3,
    store: "merkato chaf",
    miles: 6.3
}, {
    id: 2,
    store: "meraro chaf",
    miles: 22.3
}, {
    id: 3,
    store: "kara kore chaf",
    miles: 1.3
}, ];



// this will check whether the user is authenticated or not from it's cookie and sessions

// this will make auth necessary for al lroutes in the express application 
router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.sendStatus(401)
    }
})


router.get('', (request, response, next) => {
    const { miles } = request.query
    const parsed = parseFloat(miles)
    if (!isNaN(parsed)) {
        const filtered = markets.filter((market) => market.miles <= parsed)
        response.send(filtered)
    } else {
        response.send(markets)
    }
})

module.exports = router