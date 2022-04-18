const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Company, Order} = require('../models/models')

const generateJwt = (id, username, email) => {
    return jwt.sign(
        {id, username, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class CompanyController {
    async registration(req, res, next) {
        const {bin, country, city, address, fullname, username, email, phone, password} = req.body
        if (!bin || !country || !city || !address || !fullname || !username || !email || !phone || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Company.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Компания с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const company = await Company.create({email, username, password: hashPassword})
        const token = generateJwt(company.id, company.email, company.username)
        return res.json({token})
    }


    async login(req, res, next) {
        const {username, password} = req.body
        const company = await Company.findOne({where: {username}})
        if (!company) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, company.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(company.id, company.email, company.username)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.company.id, req.company.email, req.company.username)
        return res.json({token})
    }

    async accept(req, res, next) {
        const {from, to, date, weight, product, description} = req.body
        const order = await Order.accept({from, to, date, weight, product, description})
        return res.json(order)
    }
}

module.exports = new CompanyController()
