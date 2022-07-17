const { Router } = require('express')

const router = Router()

router.use('/pizzas', require('./pizzas'))

module.exports = router