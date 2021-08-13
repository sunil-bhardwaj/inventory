const pool = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = (request, response) => {
const { username, password } = request.body
//console.log(request)
 pool.query('SELECT * FROM userlogin WHERE username = $1', [username], (error, result) => {
     if (error) {
      throw error
    }
    //console.log(password)
    if (result.rowCount>0) {
      //console.log(request.body.password)
     // response.status(200).json({message:'Got Some Length'})
     

      bcrypt.compare(password, result.rows[0].password, function(err, isMatch){
      if(err){
        throw new Error(err)
      }
      else if (isMatch){
        
        const token = jwt.sign({user:'result.rows[0].username',fullname:'result.rows[0].fullname'}, process.env.ACCESS_TOKEN_SECRET, function(err, token) {
         
          return response.status(200).json({auth:true,token:token, message: "Login success" })
        })



      
      }
      else {
        //console.log(validPassword)
        return response.status(200).json({auth: false, message: 'passwords do not match'});
      }


      })
    }else{

        response.status(200).send({auth:false,message:'No Such User'})

    }
   
   
  })
}
const register = (request, response) => {
  const { username, password,fullname,userrole } = request.body
  const passwordHash = bcrypt.hashSync(password, 10);
  pool.query('INSERT INTO userlogin ( username, password,fullname,userrole) VALUES ($1, $2,$3,$4)', [username, passwordHash,fullname,userrole], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({message:'User added ScucessFully'})
  })
}
const logout = () => {
  
  response.status(200).json({auth:false,message:'Logged Out ScucessFully'})
}
  
  

module.exports = {
  login,
  register,
  logout,
 
}