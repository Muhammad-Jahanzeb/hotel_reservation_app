const express = require('express')
const { getAll, updateUser, deleteUser, getOne } = require('../controller/users')
const {verifyToken} = require('../utils/verifyToken')

const router = express.Router()

router.get('/users', verifyToken, getAll)

router
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser)
  .get("/users/:id", getOne);


module.exports = router
