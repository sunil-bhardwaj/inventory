import React from "react";
import {Link} from "react-router-dom";

function displayinventory() {
  return (
    <div>
      <Link to='./dashboard'>BACK</Link>
      Following Inventory Belongs To This User
    </div>
  );
}

export default displayinventory;
