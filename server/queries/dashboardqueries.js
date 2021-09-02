const pool = require("../db");

const getAllInventory = (request, response) => {
  pool.query(
    "SELECT source.orderno,source.ordername, inventory.serialno,inventory.image,inventory.warranty_ends_on, items.itemname,  users.name,  users.id FROM \
  public.source, public.items, public.inventory, public.mapping, public.users WHERE \
  source.id = inventory.sourceid AND   inventory.itemid = items.id AND   inventory.id = mapping.inventoryid AND \
  mapping.userid = users.id ORDER BY items.itemname ;",
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

module.exports = {
  getAllInventory,
};
