const { Router, response } = require('express')

const router = Router()

const grocerieList = [{
    item: "milk",
    quantity: 1,
}, {
    item: "alcholic drinks",
    quantity: 10,
}, {
    item: "shrop",
    quantity: 4,
}]

router.get('', (request, responce) => {
    responce.cookie('visited', true, { maxAge: 100000 })
    responce.send(
        grocerieList
    );
});


router.get('/:item', (request, response) => {
    console.log(request.cookies)
    const { item } = request.params
    const grocerieItem = grocerieList.find((g) => g.item === item)
    if (grocerieItem) {
        response.send(grocerieItem)
    } else {
        response.sendStatus(404)
    }
})

router.post('', (request, responce) => {
    grocerieList.push(request.body)
    responce.sendStatus(201);
})

module.exports = router