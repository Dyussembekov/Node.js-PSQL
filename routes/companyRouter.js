const Router = require('express')
const router = new Router()
const companyController = require('../controllers/companyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', companyController.registration)
router.post('/login', companyController.login)
router.get('/auth', authMiddleware, companyController.check)
router.get('/order/:id', companyController.accept)

module.exports = router
