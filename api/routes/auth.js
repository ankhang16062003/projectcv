const router = require('express').Router()
const UserModel = require('../models/User')
var CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

//REGISTER

router.post('/register', async (req, res) => {
    const User = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        profilePicture: req.body.profilePicture,
        genre: req.body.genre,
    })

    try {
        const newUser = await User.save()
        const {password, ...info} = newUser._doc
        return res.status(200).json(info)
    } catch(err) {
         return res.status(500).json(err)
    }
})

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if(!user) return res.status(400).json('email or password is not correct!')
        const originalPassword  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
        if(originalPassword !== req.body.password) res.status(400).json('email or password is not correct!')
        const {password, ...info} = user._doc
        const accessToken = jwt.sign(
            {
                isAdmin: info.isAdmin,
                _id: info._id,
            }, 
                process.env.SECRET_KEY, 
                {expiresIn: '1d'}
        )
        return res.status(200).json({...info, accessToken})
    } catch(err) {
        return res.status(500).json(err)
    }
})


module.exports = router