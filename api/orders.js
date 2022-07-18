const { Router } = require('express')
const { validateAgainstSchema } = require('../lib/validation')
const { orderSchema, insertOrder, getAllOrders, getOrderById } = require('../models/order')

const router = Router()

router.post('/', async function (req, res, next) {
    const body = req.body
    if(validateAgainstSchema(body, orderSchema)) {
        const id = await insertOrder(body)
        console.log(id)
        res.status(201).send({
            id: id
        })
    } else {
        res.status(400).send({
            error: "The request body was either not present or did not contain a valid order object"
        })
    }
})

router.get('/', async function (req, res, next) {
    const orders = await getAllOrders()
    res.status(200).send({
        orders: orders
    })
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const order = await getOrderById(id)
    if (order) {
        res.status(200).send(order)
    } else {
        res.status(404).send({
            error: "Specified orderId not found."
        })
    }
})



module.exports = router