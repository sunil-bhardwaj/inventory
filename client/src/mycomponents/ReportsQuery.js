import React, { useState, useEffect } from "react";
import { components } from "react-select";
import Createable from "react-select/creatable";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { useDispatch, useSelector } from "react-redux";
import { inventoryActions, userActions } from "../_actions";

export default function ReportsQuery() {
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory());
    dispatch(userActions.getAll())
    //savePDF();
  }, []);
  const filterOptions = []
  const [filter, setFilter] = useState({ filtername: "", payload: "" });
  const [selected, setSelected] = React.useState([
    filterOptions[0],
    filterOptions[1],
  ]);
  const { filtername, payload } = setFilter;
  const dispatch = useDispatch();
  const inventoryInfo = useSelector((state) => state.inventoryData);
  const userInfo = useSelector((state) => state.userData);
  function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  }
  const SortableMultiValue = SortableElement((props) => {
    const onMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  });
  const SortableSelect = SortableContainer(Createable);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      "Values sorted:",
      newValue.map((i) => i.value)
    );
  };

  /* function handleChangeFilter(e) {
    const { name, value } = e.target;
    //console.log(name,value);
    setFilter((inputs) => ({ ...inputs, [name]: value }));
  }*/
  let totitems = 0;
  /*const savePDF = (filter) => {
    var doc = new jsPDF();
    var col = [
      "Sr. No.",
      "Item Name",
      "Item Type",
      "Serial No",
      "Alloted To",
      "Warranty Ends",
    ];
    //var col1 = ["Details", "Values"];
    var rows = [];
    //var rows1 = [];
    if (filter === 1) {
    }
    if (filter === 2) {
    }
    if (filter === 0) {
      inventoryInfo.inventoryList.forEach((element) => {
        var temp = [
          element.index,
          element.itemname,
          element.itemtype,
          element.serialno,
          element.name,
          element.warranty_ends_on,
        ];

        rows.push(temp);
      });
    }

    /*SELECT  inventory.id as inventoryid,itemstypes.itemname as itemtype,users.id,brands.brandname,mapping.id as mappingid,mapping.instore,\
  mapping.isdeallocated,mapping.userid,mapping.setid,source.orderno,source.ordername,   inventory.serialno,mapping.isdeallocated,\
  inventory.image,inventory.warranty_ends_on, items.itemname,  users.name  FROM public.users  \
  RIGHT JOIN public.mapping ON users.id=mapping.setid  RIGHT JOIN inventory  ON inventory.id=mapping.inventoryid \
   RIGHT JOIN public.items ON items.id = inventory.itemid    RIGHT JOIN public.itemstypes\
    ON itemstypes.id = items.typeid INNER JOIN public.source ON source.id = inventory.sourceid \
    INNER JOIN public.brands ON brands.id = inventory.brandid  ORDER BY items.itemname */
  /* doc.autoTable(col, rows, { startY: 10 });

    // doc.autoTable(col1, rows1, { startY: 60 });
    doc.save("Test.pdf");
  };*/
  /*const changeSelectOptionHandler = (event) => {
     event.preventDefault()
    setSelected(event.target.value);
  };*/
  /*let type = null;
  if (selected === "0") {
    type = 0;
  } else if (selected === "1") {
    type = 1;
  } else if (selected === "2") {
    type = 2;
  }*/

  userInfo.userList.map((el) => {
    var temp = { value: el.id, label: el.name };
    filterOptions.push(temp);
  });
  //console.log(filterOptions);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-9'>
          <div id='my-table'>
            <select>
              <option value='0'>No Filter</option>
              <option value='1'>User Specific</option>
              <option value='2'>Inventory Specific</option>
            </select>
            <SortableSelect
              blurInputOnSelect={false}
              isSearchable
              // react-sortable-hoc props:
              axis='xy'
              onSortEnd={onSortEnd}
              distance={4}
              // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
              getHelperDimensions={({ node }) => node.getBoundingClientRect()}
              // react-select props:
              isMulti
              options={filterOptions}
              value={selected}
              onChange={onChange}
              components={{
                MultiValue: SortableMultiValue,
              }}
              closeMenuOnSelect={false}
            />
          </div>

          <button type='primary'>Download PDF</button>
        </div>
      </div>
    </div>
  );
}
