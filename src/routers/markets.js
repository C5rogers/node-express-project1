const { Router, response } = require('express')

const router = Router()

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