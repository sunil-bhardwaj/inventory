const pool = require('../db')
const getAllComplaints = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM complaints ', (error, results) => {
      if (error) {
       
        throw error
      }
      
      response.status(200).json(results.rows)
     
    })
  }
  const getComplaintById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM complaints WHERE id = $1', [id], (error, results) => {
      if (error) {
        
        throw error
      }
      
      response.status(200).json(results.rows)
     
    })
  }
  

module.exports = {
 getAllComplaints,
 getComplaintById,
  
 
}