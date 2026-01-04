const User = require('../models/User')


//Get all
const getAll = async(req,res)=>{
    
    try{
        const user = req.user
        if(user.isAdmin){
            const users = await User.find()
            res.json(users).status(200)
        }
        else{
            res.json('You are not admin').status(400)
        }

    }
    catch(err){
        res.json(err).status(500)
    }
    
}

//Update
const updateUser = async(req,res)=>{
    try{
           
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updatedUser).status(200)

    }
    catch(err){
        res.json(err).status(500)
    }
}

//Delete
const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json('User deleted!').status(200)
    }
    catch(err){
        res.json(err).status(500)
    }
}

//Get One
const getOne = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user).status(200)
    }
    catch(err){
        res.json(err).status(400)
    }
}

module.exports = {updateUser, deleteUser, getOne, getAll}