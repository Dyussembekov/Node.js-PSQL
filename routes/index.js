const Router = require('express')
const router = new Router()
const companyRouter = require('./companyRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')

router.use('/order', orderRouter)
router.use('/user', userRouter)
router.use('/company', companyRouter)


module.exports = router
