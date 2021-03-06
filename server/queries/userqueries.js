const pool = require("../db");

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.log("Inside GetUsersByID Error");
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const login = (request, response) => {
  const name = request.params.username;
  const password = request.params.password;;;;;

  pool.query(
    "SELECT * FROM users WHERE name = $1",
    [name],
    (error, results) => {
      if (error) {
        response.status(200).json(results.rows);
      }

      response.status(200).json(results.rows);
    }
  );
};
const getUsers = (request, response) => {
  pool.query(
    "SELECT users.name as username,users.designationid,users.branchid,   users.phoneno,   users.email, branches.branchname, \
    designation.designame as dedignationname, users.usertype, users.id as userid  FROM public.users \
    LEFT JOIN public.branches  ON users.branchid = branches.id \
    LEFT JOIN public.designation ON designation.id = users.designationid ORDER by users.id ", (error, results) => {
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
const getUsersInventoryCount = (request, response) => {
  const userid = request.params.userid;
  pool.query(
    `SELECT count(*) as count,  users.name,   users.id FROM   public.users,  \
   public.mapping WHERE   users.id = mapping.userid where users.id=${userid}  GROUP BY   users.id `,
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
//SELECT count(*) as count,  users.name,   users.id FROM   public.users,   public.mapping WHERE   users.id = mapping.userid   GROUP BY   users.id
const createUser = (request, response) => {
 console.log(request.body);
  const {
    username,
    phoneno,
    email,
    designationid,
    branchid,
   
  } = request.body;

  pool.query(
    "INSERT INTO users (name, phoneno,email,designationid,branchid) VALUES ($1, $2,$3,$4,$5)",
    [username, phoneno, email, designationid, branchid],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      response.status(201).json(results.rowCount);
    }
  );
};
const updateUser = (request, response) => {
  console.log(request.body)
  const id = parseInt(request.params.id);
  const {
    username,
    phoneno,
    email,
    designationid,
    branchid,
    
  } = request.body;
 console.log(request.body,id)
  pool.query(
    "UPDATE users SET name = $1, phoneno =$2, email = $3, designationid = $4, branchid=$5, id=$6 WHERE id = $6",
    [username, phoneno, email, designationid, branchid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(`User modified with ID: ${id}`);
    }
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(`User deleted with ID: ${id}`);
  });
};
module.exports = {
  getUsers,
  login,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersInventoryCount,
};
