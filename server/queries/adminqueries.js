const pool = require("../db");

const getAllBranches = (request, response) => {
  pool.query(
    "SELECT * FROM branches ;",
    (error, results) => {
      if (error) {
        console.log("Inside GetUsers Error");
        throw error;
      }
      // console.log(request.user);
      //console.log("Inside GetUsers ");

      response.status(200).json(results.rows);
    }
  );
};
const createBranch = (request, response) => {
  const {
    branchname,
  } = request.body;

  pool.query(
    "INSERT INTO branches (branchname) VALUES ($1)",
    [branchname],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      response.status(200).json(results.rowCount);
    }
  );
};


module.exports = {
  getAllBranches,
  createBranch,
};
