import { React, useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { components } from "react-select";
import Createable from "react-select/creatable";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { useDispatch, useSelector } from "react-redux";
import { inventoryActions, userActions } from "../_actions";

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  // console.log(props)
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});
const SortableSelect = SortableContainer(Createable);

function QueryBuilderCopy1() {
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory());
    dispatch(userActions.getAll());
    //savePDF();
  }, []);
  var filterOptions = [];
  var columnOptions = [];
  const dispatch = useDispatch();
  const inventoryInfo = useSelector((state) => state.inventoryData);
  const userInfo = useSelector((state) => state.userData);

  const [selected, setSelected] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filterType, setFilterType] = useState("0");
  const onFilterOptionsChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onColumnOptionsChange = (selectedOptions) => {
    setSelectedColumns(selectedOptions);
  };
  const onFilterTypeChange = (e) => {
    //console.log(e.target.value)
    setFilterType(e.target.value);
  };
  if (filterType === "0") {
    filterOptions = [];
    columnOptions = [
      { value: "inventoryid", label: "Inventory Id" },
      { value: "itemtype", label: "Item Type" },
      { value: "usersid", label: "User Id" },
      { value: "brandname", label: "Brand Name" },
      { value: "mappingid", label: "Mapping Id" },
      { value: "instore", label: "In Store Status" },
      { value: "isdeallocated", label: "Deallocation Status" },
      { value: "setid", label: "Set Id" },
      { value: "orderno", label: "Order No" },
      { value: "ordername", label: "Order Name" },
      { value: "serialno", label: "Serial No" },
      { value: "image", label: "Inventory Image" },
      { value: "warranty_ends_on", label: "Warranty End Date" },
      { value: "itemname", label: "Item Name" },
      { value: "name", label: "User Name" },
    ];
  } else if (filterType === "1") {
    filterOptions = [];
    userInfo.userList.map((el) => {
      var temp = { value: el.id, label: el.name, isFixed: true };
      filterOptions.push(temp);
    });
  } else if (filterType === "2") {
    filterOptions = [];
    inventoryInfo.inventoryList.map((el) => {
      var temp = { value: el.typeid, label: el.itemtype, isFixed: true };
      filterOptions.push(temp);
    });
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      "Values sorted:",
      newValue.map((i) => i.value)
    );
  };
  console.log(selected, selectedColumns);
  const savePDF = () => {
    var doc = new jsPDF();
    var col0 = [
      "Sr. No.",
      "Item Name",
      "Item Type",
      "Serial No",
      "Warranty Ends",
    ];
    var col1 = [
      "Sr. No.",
      "User Name",
      "Item Name",
      "Item Type",
      "Serial No",
      "Warranty Ends",
    ];
    var col2 = [
      "Sr. No.",
      "Item Name",
      "Item Type",
      "Serial No",
      "Warranty Ends",
    ];

    var rows = [];
    if (filterType === "0") {
      inventoryInfo.inventoryList.sort((a, b) =>
        a.itemtype > b.itemtype ? 1 : -1
      );
      inventoryInfo.inventoryList.forEach((element) => {
        var temp = [
          element.index,
          element.itemname,
          element.itemtype,
          element.serialno,
          element.warranty_ends_on,
        ];
        rows.push(temp);
      });

      doc.autoTable(col0, rows, { startY: 10 });
    }
    if (filterType === "1") {
      inventoryInfo.inventoryList.sort((a, b) => (a.id > b.id ? 1 : -1));
      inventoryInfo.inventoryList.forEach((element) => {
        if (selected.length > 0) {
          selected.forEach((selement) => {
            // console.log(selement.value, element.id);
            if (selement.value === element.id) {
              console.log(selement.value, element.id);
              var temp = [
                element.index,
                element.name,
                element.itemname,
                element.itemtype,
                element.serialno,

                element.warranty_ends_on,
              ];

              rows.push(temp);
            }
          });
        } else {
          var temp = [
            element.index,
            element.name,
            element.itemname,
            element.itemtype,
            element.serialno,

            element.warranty_ends_on,
          ];

          rows.push(temp);
        }
      });

      doc.autoTable(col1, rows, { startY: 10 });
    }
    if (filterType === "2") {
      inventoryInfo.inventoryList.forEach((element) => {
        var temp = [
          element.index,
          element.itemname,
          element.itemtype,
          element.serialno,
          element.warranty_ends_on,
        ];

        rows.push(temp);
      });
      doc.autoTable(col2, rows, { startY: 10 });
    }

    // doc.autoTable(col1, rows1, { startY: 60 });
    doc.save("Test.pdf");
  };
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>
            <div id='my-table'>
              Select Filter Type
              <select
                value={filterType}
                onChange={onFilterTypeChange}
                className='form-control'
              >
                <option value='0'>No Filter</option>
                <option value='1'>User Specific</option>
                <option value='2'>Inventory Specific</option>
              </select>
              Select Filter Options
              <SortableSelect
                // react-sortable-hoc props:
                axis='xy'
                onSortEnd={onSortEnd}
                distance={4}
                // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                // react-select props:
                isMulti
                closeMenuOnSelect={false}
                options={filterOptions}
                value={selected}
                onChange={onFilterOptionsChange}
                components={{
                  MultiValue: SortableMultiValue,
                }}
              />
              Select Columns
              <SortableSelect
                // react-sortable-hoc props:
                axis='xy'
                onSortEnd={onSortEnd}
                distance={4}
                // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                // react-select props:
                isMulti
                closeMenuOnSelect={false}
                options={columnOptions}
                value={selectedColumns}
                onChange={onColumnOptionsChange}
                components={{
                  MultiValue: SortableMultiValue,
                }}
              />
            </div>

            <button type='primary' onClick={savePDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default QueryBuilderCopy1;
