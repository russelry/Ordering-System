const { Router } = require('express')
const { validateAgainstSchema } = require('../lib/validation')
const { orderSchema, insertOrder, getAllOrders, getOrderById, addToOrder, deleteOrderById, addCustomerDetails } = require('../models/order')

const router = Router()

router.post('/', async function (req, res) {
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

router.get('/', async function (req, res) {
    const orders = await getAllOrders()
    res.status(200).send({
        orders: orders
    })
})

router.get('/:id', async function (req, res) {
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

router.patch('/item/:id', async function (req, res) {
    const id = req.params.id
    const item = req.body
    const order = await getOrderById(id)
    if(!order) {
        res.status(404).send({
            error: "Specified orderId not found."
        })
        return;
    }
    const itemAddedSuccessfully = await addToOrder(item, id)
    if(itemAddedSuccessfully) {
        res.status(200).send("Item added to order successfully")
    } else {
        res.status(404).send({
            error: "Something went wrong adding item to order with id: " + id
        })
    }
})

router.patch('/details/:id', async function (req, res) {
    const id = req.params.id
    const details = req.body
    const order = await getOrderById(id)
    if(!order) {
        res.status(404).send({
            error: "Specified orderId not found."
        })
        return;
    }
    const detailsAddedSuccessfully = await addCustomerDetails(details, id)
    if(detailsAddedSuccessfully) {
        res.status(200).send("Customer details added to order successfully")
    } else {
        res.status(404).send({
            error: "Something went wrong adding customer details to order with id: " + id
        })
    }
})

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    const order = await getOrderById(id)
    if (!order) {
        res.status(404).send({
            error: "Specified orderId not found."
        })
        return;
    }
    const count = await deleteOrderById(id)
    if(count) {
        res.status(200).send("Order deleted successfully")
    } else {
        res.status(404).send({
            error: "Something went wrong deleting order with id: " + id
        })
    }
})



module.exports = router