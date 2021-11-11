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
  pool.query("SELECT * FROM set order by id", (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(request.user);
    //console.log("Inside GetUsers ");

    response.status(200).json(results.rows);
  });
};
const getSetItemsById = (request, response) => {
  const id = parseInt(request.params.id)
  
    pool.query('SELECT  inventory.id as inventoryid,itemstypes.itemname as itemtype,users.id,brands.brandname,mapping.id as mappingid,\
  mapping.isdeallocated,source.orderno,source.ordername,   inventory.serialno,mapping.isdeallocated,\
  inventory.image,inventory.warranty_ends_on, items.itemname,  users.name  FROM public.users  \
  RIGHT JOIN public.mapping ON users.id=mapping.userid  RIGHT JOIN inventory  ON inventory.id=mapping.inventoryid \
   RIGHT JOIN public.items ON items.id = inventory.itemid    RIGHT JOIN public.itemstypes\
    ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid \
    INNER JOIN public.brands ON brands.id = inventory.brandid where mapping.setid = $1 ORDER BY items.itemname', [id], (error, results) => {
      if (error) {
       
        throw error
      }
      console.log(id)
      response.status(200).json(results.rows)
     
    })
  }
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
const publishSet = (request, response) => {
  const id = parseInt(request.params.id);
  const {box } = request.body;
  const invids=[];
  const exinvids = [];
  var invstr = '0'
  var exinvstr = "0";
  box.map((val,index)=>(
    invids.push(val.inventoryid)
    //console.log(index,val)
  ))
  invstr = invids.join()

publishQuery =
  `UPDATE mapping SET setid = $1 where inventoryid IN (${invstr})`;

 // console.log(publishQuery);
  pool.query("SELECT inventoryid from mapping where setid = $1", [id],(error,results)=>{
    if(error){
      throw error
    }
    results.rows.map(
      (val, index) => exinvids.push(val.inventoryid)
      //console.log(index,val)
    );
    if(exinvids.length !== 0)
      exinvstr = exinvids.join();
    resetQuery = `UPDATE mapping SET setid = NULL where inventoryid IN (${exinvstr})`;  
     pool.query(resetQuery, (error, results) => {
       if (error) {
         throw error;
       }
       
        pool.query(publishQuery, [id], (error, results) => {
          if (error) {
            throw error;
          }

          response.status(200).send(`Set Published with ID: ${id}`);
        });
      // response.status(200).send(`Set Published with ID: ${id}`);
     });
  })
 
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
  getSetItemsById,
  publishSet,
};
