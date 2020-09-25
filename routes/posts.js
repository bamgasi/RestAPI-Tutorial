const express = require('express')
const { set } = require('mongoose')
const router = express.Router()
const verify = require('./verifyToken')

const Post = require('../models/Post')

// get all
router.get('/', verify, async (req, res) => {
  const result = await Post.find()
  try {
    res.json(result)
  } catch (err) {
    res.json({ message: err })
  }
})

// create
router.post('/', verify, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
  })

  const result = await post.save()
  try {
    res.json(result)
  } catch (err) {
    res.json({ message: err })
  }
})

// get one
router.get('/:id', verify, async (req, res) => {
  const result = await Post.findById(req.params.id)

  try {
    res.json(result)
  } catch (err) {
    res.json({ message: err })
  }
})

// delete
router.delete('/:id', verify, async (req, res) => {
  const result = await Post.remove({
    _id: req.params.id,
  })

  try {
    res.json(result)
  } catch (err) {
    res.json({ message: err })
  }
})

// update
router.patch('/:id', verify, async (req, res) => {
  const result = await Post.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
        desc: req.body.desc,
      },
    }
  )

  try {
    res.json(result)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
