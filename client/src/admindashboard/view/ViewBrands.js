import React, { useEffect, useState } from "react";
import { alertActions } from "../../_actions";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert";
import AddBrand from "../add/AddBrand";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../_actions";

function ViewBrands(props) {
  const dispatch = useDispatch();
  const brandsInfo = useSelector((state) => state.adminData.brandList);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newBrandWindow, setnewBrandWindow] = useState(false);
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    dispatch(adminActions.viewAllBrands());
  }, []);
  const alert = useSelector((state) => state.helperData);
  const add = (e) => {
    e.preventDefault();
    dispatch(alertActions.clear());
    setIsUpdate(false);
    setnewBrandWindow(!newBrandWindow);
  };
  const updateBrand = (selectedbrand) => {
    dispatch(alertActions.clear());
    setBrand(selectedbrand);
    setIsUpdate(true);
    setnewBrandWindow(!newBrandWindow);
  };
  const deleteBrand = (selectedbrand) => {
    dispatch(alertActions.clear());
    setBrand(selectedbrand);
    setIsUpdate(false);
    {
      const { action } = { action: { action: "deletebrand" } };
      confirmAlert({
        title: "Delete Brand Request",
        message: `Delete Brand '${selectedbrand.brandname}'`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(adminActions.deleteBrand(selectedbrand, action));
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };
  return (
    <div className='container'>
      <div className='row'>
        <h4>Existing Brands</h4>

        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
            onClick={add}
          >
            Add New
          </button>
        </div>
        <div className='col-md-4 text-center float-right'>
          <input
            style={{
              width: "90%",
              border: "3px solid #00b4cc",
              borderRight: "3px solid #00b4cc",
              padding: "5px",
              height: "40px",
              borderRadius: "5px 5px 5px 5px",
              outline: "none",
              color: "#9dbfaf",
            }}
            type='search'
            value={searchKeywords}
            onChange={(e) => {
              dispatch(alertActions.clear());
              setSearchKeywords(e.target.value);
            }}
            className='input'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          <div style={{ display: "block", width: 700, padding: 30 }}>
            <p className={alert.type}>{alert.message}</p>
            <ListGroup>
              {brandsInfo
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.brandname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((brand, index) => (
                  <ListGroup.Item
                    key={brand.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {brand.id}
                    --{brand.brandname}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => updateBrand(brand)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteBrand(brand)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>

        <div className='col-md-4'>
          {newBrandWindow ? (
            <AddBrand closehandler={add} brand={brand} isUpdate={isUpdate} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ViewBrands;
