import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "../../_actions";
import { useLocation } from "react-router-dom";
import "../css/admin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function AddSource(props) {
  const dispatch = useDispatch();
   
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { from } = location.state || { from: { pathname: "/viewsource" } };
  const [source, setInputsSource] = useState({
    ordername: "",
    orderno: "",
    orderdate: startDate,
    noofitems: "",
  });
  const { ordername,orderno,orderdate,noofitems } = setInputsSource;

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name,value);
    setInputsSource((inputs) => ({ ...inputs, [name]: value }));
  }
  function handleDateSelect() {
    setInputsSource((inputs) => ({ ...inputs, [orderdate]: startDate }));
  }
  useEffect(() => {
    //dispatch(userActions.getById(props.userid));
  }, []);

  const addNewSource = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(source)
    if (source.ordername) {
      dispatch(adminActions.addNewSource(source, from));
    }
  };
  const updateSource = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (source.ordername) {
      dispatch(adminActions.updateSource(source, from));
    }
  };

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? (
                <h3>Update Source</h3>
              ) : (
                <h3>Add New Source</h3>
              )}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='orderno'
                    placeholder='Order Number'
                    value={orderno}
                    onChange={handleChange}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='ordername'
                    placeholder='Order Name'
                    value={ordername}
                    onChange={handleChange}
                  />
                  <DatePicker
                    name='orderdate'
                    onSelect={handleDateSelect}
                    value={orderdate}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='noofitems'
                    placeholder='Number Of Items'
                    value={noofitems}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => updateSource()}
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
