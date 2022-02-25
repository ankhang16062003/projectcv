const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const tokenHeaders = req.headers.token
    if(tokenHeaders) {
        const token = tokenHeaders.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(400).json('Token is invalid !')
            req.user = user
            next()
        })
    } else {
        return res.status(400).json('You are not authenicated !')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user._id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(400).json('You are not allow to access !')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            return res.status(400).json('You are not allow to access !')
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
}