const pool = require("../db");
const createBranch = (request, response) => {
  const { branch } = request.body;

  pool.query(
    "INSERT INTO branches (branchname) VALUES ($1)",
    [branch.branchname],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
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
        .json(`Branch modified with ID: ${id}->${branchname}`);
    }
  );
};
const deleteBranch = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM branches where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
/////////////////////////////////////////////
const getAllDesignations = (request, response) => {
  pool.query("SELECT * FROM designation", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const createDesignation = (request, response) => {
  const { designation } = request.body;

  pool.query(
    "INSERT INTO designation (designame) VALUES ($1)",
    [designation.designame],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const updateDesignation = (request, response) => {
  const id = parseInt(request.params.id);
  const { designame } = request.body;
 
  pool.query(
    "UPDATE designation SET designame = $1 WHERE id = $2",
    [designame, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(`Designation modified with ID: ${id}->${designame}`);
    }
  );
};
const deleteDesignation = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM designation where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
//////////////////////////////////////////////
const createBrand = (request, response) => {
  const { brand } = request.body;

  pool.query(
    "INSERT INTO brands (brandname) VALUES ($1)",
    [brand.brandname],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const getAllBrands = (request, response) => {
  pool.query("SELECT * FROM brands ;", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const updateBrand = (request, response) => {
  console.log(request.body);
  const id = parseInt(request.params.id);
  const { brandname } = request.body;

  pool.query(
    "UPDATE brands SET brandname = $1 WHERE id = $2",
    [brandname,id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Brand modified with ID: ${id}->${brandname}`);
    }
  );
};
const deleteBrand = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM brands where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
///////////////////////////////////////
const createSource = (request, response) => {
  const { source, orderdate } = request.body;
  console.log(source, orderdate);
 
  pool.query(
    "INSERT INTO source (ordername, orderno,orderdate,noofitems) VALUES ($1,$2,$3,$4)",
    [source.ordername, source.orderno, orderdate, source.noofitems],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const getAllSources = (request, response) => {
  pool.query("SELECT * FROM source", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const updateSource = (request, response) => {
  console.log(request.body);
  const id = parseInt(request.params.id);
  const { source,orderdate } = request.body;

  pool.query(
    "UPDATE source SET ordername = $1, orderno = $2, orderdate= $3, noofitems=$4 WHERE id = $5",
    [
      source.ordername,
      source.orderno,
      orderdate,
      source.noofitems,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Branch modified with ID: ${id}->${source.ordername}`);
    }
  );
};
const deleteSource = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM source where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};



////////////////////////////////////////
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
 
    pool.query('SELECT  *,inventory.id as inventoryid,itemstypes.typename as itemtype,brands.brandname,mapping.id as mappingid,\
     mapping.isdeallocated,source.orderno,source.ordername,   inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on, items.itemname   FROM public.inventory  \
  INNER JOIN public.mapping ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes   ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid \
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

const createSet = (request, response) => {
  const { setname, setremark } = request.body;

  pool.query(
    "INSERT INTO set (setname, setremark, instore, userid) VALUES ($1, $2, true, null)",
    [setname, setremark],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const updateSet = (request, response) => {
  const id = parseInt(request.params.id);
  const { setname, setremark } = request.body;

  pool.query(
    "UPDATE set SET setname = $1, setremark = $2 WHERE id = $3",
    [setname, setremark, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(`Branch modified with ID: ${id}->${setname}`);
    }
  );
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


const addItemToSet = (request, response) => {
  
  const { itemId, setId } = request.body;
  
  pool.query(
    "UPDATE mapping SET setid = $1 WHERE inventoryid = $2",
    [setId, itemId],
    (error, results) => {
      if (error) {
        throw error;
      }
       response.status(200).json(JSON.stringify(results.rowCount));
      
     
    }
  )
  
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
     
      response.status(200).json(JSON.stringify(results.rowCount));
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

      response.status(200).json(JSON.stringify(results.rowCount));
    }
  );
}
const allocateSet = (request, response) => {
  const { newsetid, items, oldsetid, newsetname } = request.body;
  console.log(oldsetid);
  items.forEach((item) => {
    pool.query(
      `update mapping set instore = 'f' where inventoryid = $1 and setid = $2`,
      [item.inventoryid, oldsetid],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
  });

  pool.query(
    `update set set instore = 'f', userid = $2, setname=$3 where id = $1`,
    [oldsetid, newsetid, newsetname],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );

  response.status(200).json(JSON.stringify("Success"));
};
const transferSet = (request, response) => {
  const { oldUserId,newUserId,sidebarItems } = request.body;
 
 sidebarItems.forEach((element) =>{
    pool.query(
      "UPDATE set SET userid = $2 WHERE setid = $1 ",
      [oldUserId, newUserId, element.inventoryid],
      (error, results) => {
        if (error) {
          throw error;
        }

        
      }
    );


  
 }
 
 )
 response.status(200).json(JSON.stringify("Success"));
  
 
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
      `update set set instore = 't', userid = null, setname= 'Store-' || id where id = $1`,
      [setid],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
 
  
  response.status(200).json(JSON.stringify("Success"));

}



///////////////////////////////////////////////////////////////
const createLocation = (request, response) => {
  const { location } = request.body;
 

  pool.query(
    "INSERT INTO locations (locationname) VALUES ($1)",
    [location.locationname],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const getAllLocations = (request, response) => {
  pool.query("SELECT * FROM locations", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const updateLocation = (request, response) => {
  
  const id = parseInt(request.params.id);
  const { location } = request.body;

  pool.query(
    "UPDATE locations SET locationname = $1 WHERE id = $2",
    [location.locationname, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Location modified with ID: ${id}->${location.locationname}`);
    }
  );
};
const deleteLocation = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM locations where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
///////////////////////////////////////////////////////////////
const createItem = (request, response) => {
  const { item } = request.body;
 

  pool.query(
    "INSERT INTO items (itemname, typeid) VALUES ($1, $2)",
    [item.itemname, item.typeid],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const getAllItems = (request, response) => {
  pool.query("SELECT items.id,items.itemname,items.typeid,itemstypes.typename FROM items inner join itemstypes ON items.typeid = itemstypes.id", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const updateItem = (request, response) => {
  
  const id = parseInt(request.params.id);
  const { item } = request.body;

  pool.query(
    "UPDATE items SET itemname = $1 WHERE id = $2",
    [item.itemname, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Item modified with ID: ${id}->${item.itemname}`);
    }
  );
};
const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM items where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
///////////////////////////////////////////////////////////////
const createItemType = (request, response) => {
  const { itemtype } = request.body;
 console.log(itemtype)

  pool.query(
    "INSERT INTO itemstypes (typename) VALUES ($1)",
    [itemtype.typename],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rowCount);
    }
  );
};
const getAllItemTypes = (request, response) => {
  pool.query("SELECT * FROM itemstypes", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
const updateItemType = (request, response) => {
  
  const id = parseInt(request.params.id);
  const { itemtype } = request.body;

  pool.query(
    "UPDATE itemstypes SET typename = $1 WHERE id = $2",
    [itemtype.typename, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Item Type modified with ID: ${id}->${itemtype.typename}`);
    }
  );
};
const deleteItemType = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM itemstypes where id = ($1) ;",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
};
module.exports = {
  getAllBranches,
  createBranch,
  deleteBranch,
  updateBranch,
  getAllBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  getAllSources,
  createSource,
  deleteSource,
  updateSource,
  getAllDesignations,
  createDesignation,
  deleteDesignation,
  updateDesignation,
  createSet,
  updateSet,
  getAllSets,
  deleteSet,
  getSetItemsById,
  
  getSetById,
  addItemToSet,
  removeItemFromSet,
  releaseAllSetItems,
  transferSet,
  moveSetToStore,
  allocateSet,
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
  createItemType,
getAllItemTypes,
updateItemType,
deleteItemType,
};
