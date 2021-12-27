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
const addInventoryItem = (request, response) => {
  const { inventoryItem, warranty_ends_on, date_of_purchase } = request.body;
  //console.log(inventoryItem, warranty_ends_on, date_of_purchase);
 var inventoryid = null;
  pool.query(
    "INSERT INTO public.inventory(itemid, brandid, sourceid, serialno,servicetagno, imeino,osid, ipaddress, \
      remarks, warranty_ends_on, date_of_purchase,isactive, image, price, color) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, \
      $9,$10,$11,$12,$13,$14,$15) RETURNING id",
    [
      inventoryItem.itemid,
      inventoryItem.brandid,
      inventoryItem.sourceid,
      inventoryItem.serialno,
      inventoryItem.servicetagno,
      inventoryItem.imeino,
      inventoryItem.osid,
      inventoryItem.ipaddress,
      inventoryItem.remarks,
      warranty_ends_on,
      date_of_purchase,
      inventoryItem.isactive,
      inventoryItem.image,
      inventoryItem.price,
      inventoryItem.color,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows[0].id);
      inventoryid = results.rows[0].id
       pool.query(
         "INSERT INTO mapping (inventoryid,locationid,isdeallocated,setid,setno,instore) VALUES ($1,7,true,null,0,true)",
         [inventoryid],
         (errorr, resultss) => {
           if (errorr) {
             throw errorr;
           }
         }
       );
    }
  )
 
  
 
      
  response.status(200).json("Addition Scucessfull");
};
const getAllInventory = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT  *,users.name as username,set.setname,set.id as setid,users.id as userid,inventory.id as inventoryid, \
    itemstypes.typename as itemtype,itemstypes.id as typeid,brands.brandname,mapping.id as mappingid,mapping.instore, \
  mapping.isdeallocated,mapping.setid,source.orderno,source.ordername,inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on,inventory.date_of_purchase,inventory.itemid, items.itemname, inventory.color,inventory.price  FROM public.inventory INNER JOIN public.mapping \
  ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid  \
    INNER JOIN public.brands ON brands.id = inventory.brandid LEFT JOIN set ON mapping.setid = set.id LEFT JOIN users \
    ON set.userid = users.id ORDER BY items.itemname",
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
    "SELECT *,set.setname,set.id as setid,inventory.id as inventoryid, \
    itemstypes.typename as itemtype,itemstypes.id as typeid,brands.brandname,mapping.id as mappingid,mapping.instore, \
  mapping.isdeallocated,mapping.setid,source.orderno,source.ordername,inventory.serialno,mapping.isdeallocated, \
  inventory.image,inventory.warranty_ends_on, items.itemname  FROM public.inventory INNER JOIN public.mapping \
  ON inventory.id=mapping.inventoryid  INNER JOIN public.items ON items.id = inventory.itemid \
     INNER JOIN public.itemstypes ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid  \
    INNER JOIN public.brands ON brands.id = inventory.brandid LEFT JOIN set ON mapping.setid = set.id \
   WHERE  mapping.instore=true    ORDER BY items.itemname",
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

const updateInventoryItem = (request, response) => {
  const id = parseInt(request.params.id);
  const { inventoryItem } = request.body;
  //console.log(id,branchname)
  pool.query(
    "UPDATE inventory SET itemid=$1, brandid=$2, sourceid=$3, serialno=$4, id=$5, servicetagno=$6,  imeino=$7, osid=$8,\
     ipaddress=$9, remarks=$10, warranty_ends_on=$11, date_of_purchase=$12, isactive=$13, image=$14, price=$15, color=$16",
    [
      inventoryItem.itemid,
      inventoryItem.brandinventoryItem.sourceid,
      inventoryItem.serialno,
      inventoryItem.servicetagno,
      inventoryItem.imeino,
      inventoryItem.osid,
      inventoryItem.ipaddress,
      inventoryItem.remark,
      inventoryItem.warranty_ends_on,
      inventoryItem.date_of_purchase,
      inventoryItem.isactive,
      inventoryItem.image,
      inventoryItem.price,
      inventoryItem.color,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json(`Inventory modified with ID: ${id}->${serialno}`);
    }
  );
};
module.exports = {
  addInventoryItem,
  getAllInventory,
  getInventoryById,
  updateInventoryItem,
  deleteInventory,
  getStoreInventory,
  getBarChartData,
  getBarChartData2,
};
