const pool = require("../db");

const getAllBranches = (request, response) => {
  pool.query(
    "SELECT * FROM branches ;",
    (error, results) => {
      if (error) {
       
        throw error;
      }
     

      response.status(200).json(results.rows);
    }
  );
};
const getAllSets = (request, response) => {
  pool.query("SELECT * FROM set order by id", (error, results) => {
    if (error) {
      throw error;
    }
  
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
   
      response.status(200).json(results.rows)
     
    })
  }
  const getSetById = (request, response) => {
    const id = parseInt(request.params.id);
    
    pool.query(
      "SELECT  * FROM set WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error
        }
       
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
    

      response.status(200).json(results.rows);
    }
  );
};
;
const addItemToSet = (request, response) => {
  
  const { itemId, setId } = request.body;
  
  pool.query(
    "UPDATE mapping SET setid = $1 WHERE inventoryid = $2",
    [setId, itemId],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      response.status(200).send(JSON.stringify(results.rowCount));
    }
  );
};
const removeItemFromSet = (request, response) => {
  const { itemId } = request.body;
  
  pool.query(
    "UPDATE mapping SET setid = null WHERE inventoryid = $1",
    [itemId],
    (error, results) => {
      if (error) {
        throw error;
      }
     
      response.status(200).send(JSON.stringify(results.rowCount));
    }
  );
};
const releaseAllSetItems = (request, response) => {
  const { setId } = request.body;
 
  pool.query(
    "UPDATE mapping SET setid = null WHERE setid = $1",
    [setId],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send(JSON.stringify(results.rowCount));
    }
  );
};
const transferSet = (request, response) => {
  const { oldUserId,newUserId,sidebarItems } = request.body;
 
 sidebarItems.forEach((element) =>{
    pool.query(
      "UPDATE mapping SET setid = $2 WHERE setid = $1 and  inventoryid = $3",
      [oldUserId, newUserId, element.inventoryid],
      (error, results) => {
        if (error) {
          throw error;
        }

        
      }
    );


  
 }
 
 )
 response.status(200).send(JSON.stringify("Success"));
  
 
};

const moveSetToStore = (request, response) => {
  const { setid, items } = request.body;

  items.forEach((item) =>{
    pool.query(
     `update mapping set instore = 't' where setid = $1 and inventoryid = $2`,
     [setid,item.inventoryid],
      (error, results) => {
        if (error) {
          throw error
        }
      }
    )
  })
  
    pool.query(
      `update set set instore = 't' where id = $1`,
      [setid],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
 
  
  response.status(200).send(JSON.stringify("Success"));

}
const allocateSet = (request, response) => {
  const { newsetid, items, oldsetid } = request.body;
  console.log(oldsetid);
  items.forEach((item) => {
    pool.query(
      `update mapping set setid = $1, instore = 'f' where inventoryid = $2 and setid = $3`,
      [newsetid, item.inventoryid,oldsetid],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  });

  pool.query(
    `update set set instore = 'f' where id = $1`,
    [oldsetid],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  response.status(200).send(JSON.stringify("Success"));
};
const updateBranch = (request, response) => {
  const id = parseInt(request.params.id);
  const { branchname } = request.body;
 
  pool.query(
    "UPDATE branches SET branchname = $1 WHERE id = $2",
    [branchname, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Branch modified with ID: ${id}->${branchname}`);
    }
  );
};
const updateSet = (request, response) => {
  const id = parseInt(request.params.id);
  const { setname, setremark } = request.body;
 
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
    
  ))
  invstr = invids.join()

publishQuery =
  `UPDATE mapping SET setid = $1 where inventoryid IN (${invstr})`;


  pool.query("SELECT inventoryid from mapping where setid = $1", [id],(error,results)=>{
    if(error){
      throw error
    }
    results.rows.map(
      (val, index) => exinvids.push(val.inventoryid)
     
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
  getSetById,
  addItemToSet,
  removeItemFromSet,
  releaseAllSetItems,
  transferSet,
  moveSetToStore,
  allocateSet,
};
