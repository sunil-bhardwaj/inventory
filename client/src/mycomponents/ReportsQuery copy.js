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

function QueryBuilder() {
  useEffect(() => {
    dispatch(inventoryActions.getAllInventory());
    dispatch(userActions.getAll());
    //savePDF();
  }, []);
  var filterOptions = [];
  var columnOptions = [];
  /*const initcheckoptions = [
    { name: "All", value: 1, },
    { name: "Allocated", value: 2 },
    { name: "InStore", value: 3 },
  ];*/
  const dispatch = useDispatch();
  const inventoryInfo = useSelector((state) => state.inventoryData);
  const userInfo = useSelector((state) => state.userData);
  /*const [checkedState, setCheckedState] = useState(
    new Array(initcheckoptions.length).fill(false)
  );*/
  const [initOption, setInitOption] = useState("1");
  const [selected, setSelected] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filterType, setFilterType] = useState("0");
  const onFilterOptionsChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };
  const onChangeOptionValue = (event) => {
    setInitOption(event.target.value);
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
      { value: "id", label: "User Id" },
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
    /*SELECT  inventory.id as inventoryid,itemstypes.itemname as itemtype,itemstypes.id as typeid,users.id,brands.brandname,mapping.id as mappingid,mapping.instore,\
  mapping.isdeallocated,mapping.userid,mapping.setid,source.orderno,source.ordername,   inventory.serialno,mapping.isdeallocated,\
  inventory.image,inventory.warranty_ends_on, items.itemname,  users.name */
  } else if (filterType === "1") {
    columnOptions = [
      { value: "inventoryid", label: "Inventory Id" },
      { value: "itemtype", label: "Item Type" },
      { value: "id", label: "User Id" },
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
    filterOptions = [];
    userInfo.userList.map((el) => {
      var temp = { value: el.id, label: el.name, isFixed: true };
      filterOptions.push(temp);
    });
  } else if (filterType === "2") {
    columnOptions = [
      { value: "inventoryid", label: "Inventory Id" },
      { value: "itemtype", label: "Item Type" },
      { value: "id", label: "User Id" },
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
  /* const handleOnCheckedChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  }*/

  const savePDF = () => {
    var instorevar1 = true;
    var instorevar2 = false;
    switch (initOption) {
      case 1:
        instorevar1 = true;
        instorevar2 = false;

        break;
      case 2:
        instorevar1 = false;
        instorevar2 = false;
        break;
      case 3:
        instorevar1 = true;
        instorevar2 = true;
        break;

      default:
        break;
    }
    var doc = new jsPDF();
    var cols = ["Index"];

    selectedColumns.forEach((column) => {
      var temp = column.label;
      cols.push(temp);
    });
    console.log(cols);
    var rows = [];
    if (filterType === "0") {
      inventoryInfo.inventoryList
        .sort((a, b) => (a.itemtype > b.itemtype ? 1 : -1))
        .filter(
          (inventory) =>
            inventory.instore === instorevar1 ||
            inventory.instore === instorevar2
        )
        .forEach((element, index) => {
          var temp = [];
          temp.push(index + 1);
          selectedColumns.forEach((col) => {
            temp.push([element[col.value]]);
          });
          rows.push(temp);
        });

      doc.autoTable(cols, rows, { startY: 10 });
    }
    if (filterType === "1") {
      inventoryInfo.inventoryList.sort((a, b) => (a.id > b.id ? 1 : -1));
      inventoryInfo.inventoryList.forEach((element) => {
        if (selected.length > 0) {
          selected.forEach((selement) => {
            // console.log(selement.value, element.id);
            if (selement.value === element.id) {
              var temp = [];
              selectedColumns.forEach((col) => {
                console.log(col.value, element[col.value]);

                temp.push([element[col.value]]);
              });
              rows.push(temp);
            }
          });
        } else {
          var temp = [];
          selectedColumns.forEach((col) => {
            console.log(col.value, element[col.value]);

            temp.push([element[col.value]]);
          });
          rows.push(temp);
        }
      });

      doc.autoTable(cols, rows, { startY: 10 });
    }
    if (filterType === "2") {
      inventoryInfo.inventoryList.forEach((element) => {
        var temp = [];
        selectedColumns.forEach((col) => {
          console.log(col.value, element[col.value]);

          temp.push([element[col.value]]);
        });
        rows.push(temp);
      });
      doc.autoTable(cols, rows, { startY: 10 });
    }

    // doc.autoTable(col1, rows1, { startY: 60 });
    var string = doc.output("datauristring");
    var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    //var string = doc.output("datauristring");

    doc.save("Report.pdf");
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>
            <div id='my-table'>
              Select Options
              <div className='col-md-12' style={{ display: "flex" }}>
                <div onChange={onChangeOptionValue}>
                  <input type='radio' value='1' name='reptype' /> All
                  <input type='radio' value='2' name='reptype' /> Allocated
                  <input type='radio' value='3' name='reptype' /> InStore
                </div>

                {/*initcheckoptions.map(({ name, price }, index) => {
                  return (
                    <div className='col-md4' style={{ paddingRight: "50px" }}>
                      <input
                        type='checkbox'
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnCheckedChange(index)}
                      />

                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  );
                })*/}
              </div>
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
            <iframe title='pdfFrame'></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
export default QueryBuilder;
