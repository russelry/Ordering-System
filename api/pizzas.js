const { Router } = require('express')
const { validateAgainstSchema } = require('../lib/validation')
const { pizzaSchema, getAllPizzas, getPizzaById, updatePizzaById, deletePizzaById, insertNewPizza, getPizzasByTopping } = require('../models/pizza')

const router = Router()

router.post('/', async function (req, res, next) {
    const body = req.body
    if (validateAgainstSchema(body, pizzaSchema)) {
        const id = await insertNewPizza(body)
        console.log(id)
        res.status(201).send({
            id: id
        })
    } else {
        res.status(400).send({
            error: "The request body was either not present or did not contain a valid pizza object"
        })
    }
})

router.get('/', async function (req, res, next) {
    const pizzas = await getAllPizzas()
    res.status(200).send({
        pizzas: pizzas
    })
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const pizza = await getPizzaById(id)
    if (pizza) {
        res.status(200).send(pizza)
    } else {
        res.status(404).send({
            error: "Specified pizzaId not found."
        })
    }
})

router.patch('/:id', async function (req, res, next) {
    const id = req.params.id
    const body = req.body
    const pizza = await getPizzaById(id)
    if (!pizza) {
        res.status(404).send({
            error: "Specified pizzaId not found."
        })
    }
    if (validateAgainstSchema(body, pizzaSchema)) {
        const updateSuccessful = await updatePizzaById(body, id)
        if (updateSuccessful) {
            res.status(200).send("Pizza updated successfully")
        } else {
            res.status(404).send({
                error: "Something went wrong updating pizza with id: " + id
            })
        }
    } else {
        res.status(400).send({
            error: "Request body is not a valid pizza object"
        })
    }
})

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id
    const pizza = await getPizzaById(id)
    if (!pizza) {
        res.status(404).send({
            error: "Specified pizzaId not found."
        })
    }
    const count = await deletePizzaById(id)
    if(count) {
        res.status(200).send("Pizza deleted successfully")
    } else {
        res.status(404).send({
            error: "Something went wrong deleting pizza with id: " + id
        })
    }
})

router.get('/', async function (req, res, next) {
    const topping = req.query.topping
    const pizzas = await getAllPizzas()
    const pizzasByToppings = await getPizzasByTopping(topping, pizzas)
    res.send(pizzasByToppings)
    
})

module.exports = router