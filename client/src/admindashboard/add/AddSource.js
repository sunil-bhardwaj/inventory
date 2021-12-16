import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions, alertActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function AddSource(props) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.helperData);
  const sourcesInfo = useSelector((state) => state.adminData.sourceList);

  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const { from } = location.state || { from: { pathname: "/addsource" } };
  const [updatesourceid, serUpdateSourceId] = useState(
    props.source.id ? props.source.id : ""
  );
  const [orderdate, setOrderDate] = useState(new Date());
  const [source, setInputsSource] = useState({
    ordername: props.source.ordername ? props.source.ordername : "",
    orderno: props.source.orderno ? props.source.orderno : "",
    noofitems: props.source.noofitems ? props.source.noofitems : "",
   // orderdate: props.source.orderdate ? props.source.orderdate : '',
  });
  const { ordername, orderno, noofitems } = setInputsSource;
 
  /* username = props.user.name
              phoneno=props.user.phoneno
              email= props.user.email
              designationid=props.user.designationid
              branchid= props.user.branchid*/
  

  function handleChange(e) {
    e.preventDefault();
    dispatch(alertActions.clear());
    const { name, value } = e.target;
    //console.log(name,value);
    setInputsSource((inputs) => ({ ...inputs, [name]: value }));
  }
  useEffect(() => {}, []);

  const addNewSource = (e) => {
    e.preventDefault();
    dispatch(alertActions.loading("Please Wait While Source being Saved."));
    setSubmitted(true);
   console.log(source)
    if (source.ordername) {
      dispatch(adminActions.addNewSource(source, orderdate, from));
    }
  };
  const updateSource = (e) => {
    e.preventDefault();
    dispatch(alertActions.loading("Please Wait While Updating Source."));
    setSubmitted(true);

    if (source.ordername) {
      dispatch(
        adminActions.updateSource(updatesourceid, source, orderdate, from)
      );
    }
  };
 
  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <>
                  <h3>Update Source</h3>
                </>
              ) : (
                <h3>Add New Source</h3>
              )}
              <p class={alert.type}>{alert.message}</p>
              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='ordername'
                    placeholder='Order Name'
                    value={source.ordername}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='orderno'
                    placeholder='Order No'
                    value={source.orderno}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='noofitems'
                    placeholder='Number Of Items'
                    value={source.noofitems}
                    onChange={handleChange}
                  />

                  <DatePicker
                    selected={orderdate}
                    // onChange={(date) => setOrderDate(date)}
                    onChange={(date) => setOrderDate(date)}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={updateSource}
                      className='btn btn-warning'
                    >
                      Update Source
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={addNewSource}
                      className='btn btn-warning'
                    >
                      Add Source
                    </button>
                  )}
                  <button
                    id='submit'
                    type='button'
                    onClick={props.closehandler}
                    className='btn btn-danger'
                    style={{ marginLeft: "15px", minWidth: "120px" }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSource;
