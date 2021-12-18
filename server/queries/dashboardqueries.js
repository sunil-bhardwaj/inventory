const pool = require("../db");

const getInventoryById = (request, response) => {
  pool.query(
    "SELECT  users.name as username,set.setname,set.id as setid,users.id as userid,inventory.id as inventoryid, \
    itemstypes.typename as itemtype,itemstypes.id as typeid,brands.brandname,mapping.id as mappingid,mapping.instore, \
  mapping.isdeallocated,mapping.setid,source.orderno,source.ordername,inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on, items.itemname  FROM public.inventory INNER JOIN public.mapping \
  ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid  \
    INNER JOIN public.brands ON brands.id = inventory.brandid LEFT JOIN set ON mapping.setid = set.id LEFT JOIN users \
    ON set.userid = users.id where inventory.id = $1  ORDER BY items.itemname",
    [id],
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
const getAllInventory = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT  users.name as username,set.setname,set.id as setid,users.id as userid,inventory.id as inventoryid, \
    itemstypes.typename as itemtype,itemstypes.id as typeid,brands.brandname,mapping.id as mappingid,mapping.instore, \
  mapping.isdeallocated,mapping.setid,source.orderno,source.ordername,inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on, items.itemname  FROM public.inventory INNER JOIN public.mapping \
  ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid  \
    INNER JOIN public.brands ON brands.id = inventory.brandid LEFT JOIN set ON mapping.setid = set.id LEFT JOIN users \
    ON set.userid = users.id ORDER BY items.itemname",
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

const getBarChartData = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    " select  itemstypes.typename, count(itemstypes.typename) as itemcount from itemstypes \
    inner join items on itemstypes.id = items.typeid inner join inventory on items.id = inventory.itemid  \
    group by itemstypes.typename order by itemcount desc ",
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
const getBarChartData2 = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "select  itemstypes.typename, count(itemstypes.typename) as itemcount from itemstypes inner join items \
    on itemstypes.id = items.typeid inner join inventory on items.id = inventory.itemid inner join mapping \
    on inventory.id = mapping.inventoryid  where mapping.instore = 't'  group by itemstypes.typename \
    order by itemcount desc LIMIT 20",
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
const getStoreInventory = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT  users.name as username,set.setname,set.id as setid,users.id as userid,inventory.id as inventoryid, \
    itemstypes.typename as itemtype,itemstypes.id as typeid,brands.brandname,mapping.id as mappingid,mapping.instore, \
  mapping.isdeallocated,mapping.setid,source.orderno,source.ordername,inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on, items.itemname  FROM public.inventory INNER JOIN public.mapping \
  ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid  \
    INNER JOIN public.brands ON brands.id = inventory.brandid LEFT JOIN set ON mapping.setid = set.id LEFT JOIN users \
    ON set.userid = users.id  WHERE mapping.isdeallocated = true OR  mapping.setid is null OR mapping.setid = 0   ORDER BY items.itemname",
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
const deleteInventory = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE  FROM inventory where id = ($1) ;",
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
 
const updateInventory = (request, response) => {
  const id = parseInt(request.params.id);
  const { branchname } = request.body;
  //console.log(id,branchname)
  pool.query(
    "UPDATE inventory SET userid = $1 WHERE id = $2",
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
module.exports = {
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getStoreInventory,
  getBarChartData,
  getBarChartData2,
};
