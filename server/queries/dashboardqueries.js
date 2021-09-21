const pool = require("../db");

const getAllInventory = (request, response) => {
  pool.query(
    "SELECT  inventory.id as inventoryid,itemstypes.itemname as itemtype,users.id,brands.brandname,mapping.id as mappingid,\
  mapping.isdeallocated,source.orderno,source.ordername,   inventory.serialno,mapping.isdeallocated,\
  inventory.image,inventory.warranty_ends_on, items.itemname,  users.name  FROM public.users  \
  RIGHT JOIN public.mapping ON users.id=mapping.userid  RIGHT JOIN inventory  ON inventory.id=mapping.inventoryid \
   RIGHT JOIN public.items ON items.id = inventory.itemid    RIGHT JOIN public.itemstypes\
    ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid \
    INNER JOIN public.brands ON brands.id = inventory.brandid  ORDER BY items.itemname",
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
const getStoreItems = (request, response) => {
  pool.query(
    "SELECT  itemstypes.itemname,source.ordername,brands.brandname,items.itemname \
     FROM public.inventory,public.brands,public.itemstypes, public.source, public.mapping,public.items \
     WHERE  brands.id = inventory.brandid AND  source.id = inventory.sourceid AND\
       mapping.inventoryid = inventory.id AND        items.id = inventory.itemid \
       AND itemstypes.id = items.typeid  AND mapping.userid IS NULL", (error, results) => {
      if (error) {
        
        throw error;
      }
      // console.log(request.user);
      //console.log("Inside GetUsers ");

      response.status(200).json(results.rows);
    }
  );
};
const insertDeallocateTable = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(request.body);
  var sql = "";
  const { type, deallocated } = request.body;
  if (!type) return null;

  pool.query(
    //`INSERT INTO deallocated (mappingid, createdon, updatedon) SELECT id,now(),now() FROM mapping where userid = ${id}`,
    (sql = `Update mapping SET isdeallocated = ${deallocated} where mapping.${type}  = ${id} `),
    (error, results) => {
      if (error) {
        console.log(sql);
        throw error;
      }
      console.log(sql);
      response.status(200).json(results.rowCount);
      //console.log(results);
    }
  );

 
};
module.exports = {
  getAllInventory,
  insertDeallocateTable,
  getStoreItems,
};
