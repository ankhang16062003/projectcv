const UserModel = require('../models/User')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken')
const router = require('express').Router()
const CryptoJS = require("crypto-js");

//GET USER

router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById({_id: req.params.id})
        const {password, ...info} = user._doc 
        res.status(200).json(info)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//GET ALL USER

router.get('/', async (req, res) => {
   try {
       let allUsers = await UserModel.find({}).sort({_id: -1})
       allUsers = allUsers.map((user, index) => {
           const {password, ...info} = user._doc
           return {...info}
       })
       res.status(200).json(allUsers)
   }catch(err) {
       res.status(500).json(err)
   }
})


//GET USER STATS

router.get('/stats/month', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const stats = await UserModel.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: '$month', total: {$sum: 1}}}
        ])

        res.status(200).json(stats)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//UPDATE USER

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    try {
        const userUpdated = await UserModel.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            {new: true},
        )

        res.status(200).json(userUpdated)
    } catch(err) {
        res.status(500).json(err)
    }
})


//DELETE USER

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted...')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
