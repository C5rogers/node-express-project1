const { Router, response, request } = require('express')

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

// this is the create request by the user
router.post('/shopping/cart/item', (request, response) => {
    // extracting the sended data from the body
    const { item, quantity } = request.body
        // creating the cartItem from it
    const cartItem = { item, quantity }
        // extracting the cart from the session
    const { cart } = request.session
    if (cart) {
        // check if the cart is not empty
        // if it have some value add to it hte created cart item
        request.session.cart.items.push(cartItem)
    } else {
        // else create the cart in the session 
        request.session.cart = {
            items: [cartItem]
        }
    }
    // sending the created status to the user
    response.sendStatus(201)
})

router.get('/shopping/cart', (request, response) => {
    // extracting the cart from the session
    const { cart } = request.session
    if (!cart) {
        // check wheter the cart is not empty or not
        // if it is empty send the empty message
        response.send("you have no cart item")
    } else {
        // else send the cart to the user
        response.send(cart)
    }
})


module.exports = router