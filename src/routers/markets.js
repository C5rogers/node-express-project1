const { Router, response } = require('express')

const router = Router()

const markets = [{
    store: "kara chaf"
}, {
    store: "megeneagna chaf"
}, {
    store: "merkato chaf"
}, ];

router.get('', (request, response, next) => {
    response.send(markets)
})

module.exports = router