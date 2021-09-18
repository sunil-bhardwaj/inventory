const pool = require("../db");

const getAllBranches = (request, response) => {
  pool.query(
    "SELECT * FROM branches ;",
    (error, results) => {
      if (error) {
       
        throw error;
      }
      // console.log(request.user);
      //console.log("Inside GetUsers ");

      response.status(200).json(results.rows);
    }
  );
};
const getAllSets = (request, response) => {
  pool.query("SELECT * FROM set ;", (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(request.user);
    //console.log("Inside GetUsers ");

    response.status(200).json(results.rows);
  });
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
const createSet = (request, response) => {
  const { setname, setremark } = request.body;

  pool.query(
    "INSERT INTO set (setname, setremark) VALUES ($1, $2)",
    [setname, setremark],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const deleteBranch = (request, response) => {
  const id = parseInt(request.params.id);
   
  pool.query("DELETE  FROM branches where id = ($1) ;",[id] ,(error, results) => {
    if (error) {
      
      throw error;
    }
    // console.log(results);
    //console.log("Inside GetUsers ");

    response.status(200).json(results.rows);
  });
};
const deleteSet = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM set where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(results);
      //console.log("Inside GetUsers ");

      response.status(200).json(results.rows);
    }
  );
};
const updateBranch = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    branchname,
  } = request.body;
 //console.log(id,branchname)
  pool.query(
    "UPDATE branches SET branchname = $1 WHERE id = $2",
    [branchname, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Branch modified with ID: ${id}->${branchname}`);
    }
  );
};
const updateSet = (request, response) => {
  const id = parseInt(request.params.id);
  const { setname, setremark } = request.body;
  //console.log(id,branchname)
  pool.query(
    "UPDATE set SET setname = $1, setremark = $2 WHERE id = $3",
    [setname,setremark, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Branch modified with ID: ${id}->${setname}`);
    }
  );
};

module.exports = {
  getAllBranches,
  createBranch,
  deleteBranch,
  updateBranch,
  createSet,
  updateSet,
  getAllSets,
  deleteSet,
};
