import { React, useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { components } from "react-select";
import Createable from "react-select/creatable";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { useDispatch, useSelector } from "react-redux";
import { alertActions, inventoryActions, userActions } from "../_actions";

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
 
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
   
  }
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
  
  const dispatch = useDispatch();
  const inventoryInfo = useSelector((state) => state.inventoryData);
  const userInfo = useSelector((state) => state.userData);
  const alert = useSelector((state)=>state.helperData);
  const [initOption, setInitOption] = useState('1')
  const [selected, setSelected] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filterType, setFilterType] = useState('0');
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
  
    setFilterType(e.target.value);
    
  };
  if (filterType === "0") {
    filterOptions = [];
    columnOptions = [
      { value: "inventoryid", label: "InventoryId" },
      { value: "itemtype", label: "ItemType" },
      { value: "id", label: "UserId" },
      { value: "brandname", label: "BrandName" },
      { value: "mappingid", label: "MappingId" },
      { value: "instore", label: "InStore" },
      { value: "isdeallocated", label: "Deallocated" },
      { value: "setid", label: "SetId" },
      { value: "orderno", label: "OrderNo" },
      { value: "ordername", label: "OrderName" },
      { value: "serialno", label: "SerialNo" },
      { value: "image", label: "InventoryImage" },
      { value: "warranty_ends_on", label: "WarrantyEndDate" },
      { value: "itemname", label: "ItemName" },
      { value: "name", label: "UserName" },
    ];
   
  } else if (filterType === "1") {
    columnOptions = [
      { value: "inventoryid", label: "InventoryId" },
      { value: "itemtype", label: "ItemType" },
      { value: "id", label: "UserId" },
      { value: "brandname", label: "BrandName" },
      { value: "mappingid", label: "MappingId" },
      { value: "instore", label: "InStore" },
      { value: "isdeallocated", label: "Deallocated" },
      { value: "setid", label: "SetId" },
      { value: "orderno", label: "OrderNo" },
      { value: "ordername", label: "OrderName" },
      { value: "serialno", label: "SerialNo" },
      { value: "image", label: "InventoryImage" },
      { value: "warranty_ends_on", label: "WarrantyEndDate" },
      { value: "itemname", label: "ItemName" },
      { value: "name", label: "UserName" },
    ];
    filterOptions = [];
    userInfo.userList.map((el) => {
      var temp = { value: el.id, label: el.name, isFixed: true };
      filterOptions.push(temp);
    });
  } else if (filterType === "2") {
    columnOptions = [
      { value: "inventoryid", label: "InventoryId" },
      { value: "itemtype", label: "ItemType" },
      { value: "id", label: "UserId" },
      { value: "brandname", label: "BrandName" },
      { value: "mappingid", label: "MappingId" },
      { value: "instore", label: "InStore" },
      { value: "isdeallocated", label: "Deallocated" },
      { value: "setid", label: "SetId" },
      { value: "orderno", label: "OrderNo" },
      { value: "ordername", label: "OrderName" },
      { value: "serialno", label: "SerialNo" },
      { value: "image", label: "InventoryImage" },
      { value: "warranty_ends_on", label: "WarrantyEndDate" },
      { value: "itemname", label: "ItemName" },
      { value: "name", label: "UserName" },
    ];
    filterOptions = [];
    
    const map = new Map();
    for (const item of inventoryInfo.inventoryList) {
      if (!map.has(item.typeid)) {
        map.set(item.typeid, true); // set any value to Map
        filterOptions.push({
          value: item.typeid,
          label: item.itemtype,
        });
      }
    }
   
  }
  
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    console.log(
      "Values sorted:",
      newValue.map((i) => i.value)
    );
  };
 
 
 
   const savePDF = () => {
     
    if (selectedColumns.length < 2)
    {
      dispatch(alertActions.error("Select Atleast Three Columns To build Report!"))
      return 
    }
    var selectopt1 = true;
    var selectopt2 = false
    switch (initOption) {
      case '1': selectopt1 = true
              selectopt2 = false
        break;
      case '2': selectopt1 = false;
              selectopt2 =false
        break;
      case '3': selectopt1 =true
               selectopt2 = true
        break;

      default:
        break;
    }
    console.log(initOption,selectopt1,selectopt2)
    var doc = new jsPDF();
    var cols = ["Index"];
   
    selectedColumns.forEach((column) => {
      var temp = column.label;
      cols.push(temp);
    });
    
    var rows = [];
    if(filterType === '0'){
       inventoryInfo.inventoryList.sort((a, b) => (a.itemtype > b.itemtype ? 1 : -1))
       .filter((inventory) => inventory.instore === selectopt1 || inventory.instore === selectopt2 )
          .forEach((element,index) => {
            var temp = [];
            temp.push(index+1)
            selectedColumns.forEach((col) => {
              temp.push([element[col.value]]);
            });
            rows.push(temp);
          });
       
   
      
        
      
      doc.autoTable(cols, rows, { startY: 10 });
    }
     if (filterType === "1") {
       var srno = 1;
       
       inventoryInfo.inventoryList.sort((a, b) => (a.id > b.id ? 1 : -1))
       .filter((inventory) => inventory.instore === selectopt1 || inventory.instore === selectopt2 )
         inventoryInfo.inventoryList.forEach((element) => {
          if (selected.length > 0) {
             selected.forEach((selement) => {
                console.log(selement.value, element.id);
               if (selement.value === element.id) {
                   
                   var temp = [];
                   temp.push(srno);
                   selectedColumns.forEach((col) => {
                     console.log(col.value, element[col.value]);
                      srno++
                      console.log(srno)
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
       inventoryInfo.inventoryList.sort((a, b) => (a.id > b.id ? 1 : -1))
       .filter((inventory) => inventory.instore === selectopt1 || inventory.instore === selectopt2 )
         inventoryInfo.inventoryList.forEach((element) => {
          if (selected.length > 0) {
             selected.forEach((selement,index) => {
               
               if (selement.value === element.typeid) {
                console.log(selement.value, element.typeid);
                   var temp = [];
                   temp.push(index + 1);
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
   /*if (filterType === "2") {
     inventoryInfo.inventoryList.forEach((element) => {
         var temp = [];
         selectedColumns.forEach((col) => {
           console.log(col.value, element[col.value]);

           temp.push([element[col.value]]);
         });
         rows.push(temp);
     
     });
     doc.autoTable(cols, rows, { startY: 10 });
   }*/

    // doc.autoTable(col1, rows1, { startY: 60 });
    var string = doc.output("datauristring");
    /*var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();*/
    //var string = doc.output("datauristring");
    doc = addWaterMark(doc);
    
     const frame = document.getElementById("pdfFrame");
     console.log(frame);
     frame.src = doc.output("datauristring")
    
    doc.save("Report.pdf");
    dispatch(
      alertActions.success("Report Generated Scucessfully")
    );
    return string
   
  }
  function addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();

    for (var i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      doc.setFont("helvetica");
     // doc.setFontType("bold");
      doc.setFontSize(70);
      doc.text(50, doc.internal.pageSize.height - 70, "HP HIGH COURT",null,45);
    }

    return doc;
  }
 
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <div id='my-table'>
              Select Options
              <div className='col-md-12' style={{ display: "flex" }}>
                <div onChange={onChangeOptionValue}>
                  <span style={{ marginRight: "15px" }}>
                    <input type='radio' value='1' name='reptype' /> All
                  </span>
                  <span style={{ marginRight: "15px" }}>
                    <input type='radio' value='2' name='reptype' /> Allocated
                  </span>
                  <span style={{ marginRight: "15px" }}>
                    <input type='radio' value='3' name='reptype' /> InStore
                  </span>
                </div>
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
            <p class={alert.type}>{alert.message}</p>
            <button type='primary' onClick={savePDF}>
              Download PDF
            </button>
          </div>
          <div className='col-md-7' style={{boxShadow:'inset 0px 11px 8px -10px black,inset 0px -11px 8px -10px black' }}>
            <iframe
            
              title='pdfFrame'
              id='pdfFrame'
              width='900'
              height='1000'
              border='4px solid red'
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
export default QueryBuilder