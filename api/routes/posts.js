const router = require('express').Router()
const PostModel = require('../models/Post')
const UserModel = require('../models/User')
const {verifyTokenAndAdmin, verifyToken } = require('../verifyToken')

//CREATE POST

router.post('/', verifyToken, async (req, res) => {
    try {
        const post = new PostModel({
            user: req.user._id,
            ...req.body,
        })
        const newPost = await post.save()
        res.status(200).json(newPost)
    }catch(err) {
        res.status(500).json(err)
    }
})

//GET POST

router.get('/:id',verifyToken , async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//GET RANDOM LIST POST

router.get('/random/lists', verifyToken, async (req, res) => {
    try{
        const randomPosts = await PostModel.aggregate([
            {
                $sample: {size: 6},
            }
        ])
        res.status(200).json(randomPosts)
    }catch(err) {
        res.status(500).json(err)
    }
})

//GET ALL POST : 

//?page=1&user=userId
//?page=1&categories=music 
//?page=1 
//?user=userId
//?categories=music

router.get('/',verifyToken, async (req, res) => {
  const page = req.query.page
  const userId = req.query.userId
  const category = req.query.category
  const pageSize = 6

  let listPosts
  if(page) {
      if(userId) {
          try {
              listPosts = await PostModel.find({
                    user: userId,
                })
                .skip((page-1)*pageSize)
                .limit(pageSize)
              res.status(200).json(listPosts)
          } catch(err) {
              res.status(500).json(err)
          }
      }
      else if (category) {
          try {
              listPosts = await PostModel.find({
                  categories: {
                      $in: [category],
                  }
              })
              .skip((page-1)*pageSize)
              .limit(pageSize)
              res.status(200).json(listPosts)
          }catch(err) {
              res.status(500).json(err)
          }
      }
      else {
          try {
              listPosts = await PostModel.find({}).skip((page-1)*pageSize).limit(pageSize)
              res.status(200).json(listPosts)
          }catch(err) {
              res.status(500).json(err)
          }
      }
  } else {
      if(userId) {
        try {
            listPosts = await PostModel.find({
                user: userId,
            })
            res.status(200).json(listPosts)
        } catch(err) {
            res.status(500).json(err)
        }
      }
      else if (category) {
        try {
            listPosts = await PostModel.find({
                categories: {
                    $in: [category],
                }
            })
            res.status(200).json(listPosts)
        }catch(err) {
            res.status(500).json(err)
        }
      }
      else {
        try {
            listPosts = await PostModel.find({})
            res.status(200).json(listPosts)
        }catch(err) {
            res.status(500).json(err)
        }
      }
  }
})

//UPDATE POST

router.put('/:id', verifyToken, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id) 
        if(post.user !== req.user._id && !req.user.isAdmin)
            res.status(400).json('You are not allow to update post ...')
        next()
    } catch(err) {
        res.status(500).json(err)
    }
},async (req, res) => {
    try {
        const postUpdated = await PostModel.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            {new: true},
        )
        res.status(200).json(postUpdated)
    } catch(err) {
        res.status(500).json(err)
    }
})


//DELETE POST

router.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id) 
        if(post.user !== req.user._id && !req.user.isAdmin)
            res.status(400).json('You are not allow to delete post ...')
        next()
    } catch(err) {
        res.status(500).json(err)
    }
}, async (req, res) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted...')
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE POST OF USER

router.delete('/allPostsUser/:userId', verifyTokenAndAdmin, async (req, res) => {
    const userId = req.params.userId
    try{
        await PostModel.deleteMany( { user: userId } )
        res.status(200).json('delete all posts of user successfully!')
    }catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router