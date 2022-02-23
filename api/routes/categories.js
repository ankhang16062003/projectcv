const router = require('express').Router()
const CategoryModel = require('../models/Category')

//CREATE CATEGORY 

router.post('/', async (req, res) => {
    const category = new CategoryModel({title: req.body.title})
    try {
        const newCat = await category.save()
        res.status(200).json(newCat)
    } catch(err) {
        res.status(500).json(err)
    }
})

//GET ALL CATEGORY, GET NUMBER CATEGORY
router.get('/', async (req, res) => {
    const num = req.query.num
    let cats
    if(num) {
        try {
            cats = await CategoryModel.find({}).limit(num).sort({_id: -1})
            res.status(200).json(cats)
        }catch(err) {
            res.status(500).json(err)
        }
    } else {
        try {
            cats = await CategoryModel.find({})
            res.status(200).json(cats)
        }catch(err) {
            res.status(500).json(err)
        }
    }
})

//GET NUMBER RANDOM CATEGORY

module.exports = router
