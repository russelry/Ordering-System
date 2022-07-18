const { Router } = require('express')

const router = Router()

router.use('/pizzas', require('./pizzas'))
router.use('/orders', require('./orders'))

module.exports = router