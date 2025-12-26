const jwt = require('jsonwebtoken')

function verifyToken (req,res,next){
    const token = req.cookies.access_token
    //if no token
    if(!token){
        res.json('You are not authenticated!').status(400)
    }

    else{
        const checkToken = jwt.verify(token, process.env.JWT,(err, user)=>{
                //if incorrect token
            if(err) res.json(`Error in verification: ${err}`).status(403)
               //if correct token
            else{
                req.user = user
                next()
        }
        })

    }
}

module.exports = {verifyToken}