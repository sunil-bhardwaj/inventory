import React, {  useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { inventoryActions } from "../../_actions";
import {  useLocation } from "react-router-dom";
import "../css/admin.css";


function AddSet(props) {
  const dispatch = useDispatch()
  const newSet = useSelector((state) => state.inventoryData.set);
   const location = useLocation();
   const [submitted, setSubmitted] = useState(false);
   const { from } = location.state || { from: { pathname: "/addsets" } };
  const [set, setInputsSet] = useState({
    setname: "",
    setremark: "",
  });
const { setname, setremark } = setInputsSet;

function handleChange(e) {
  const { name, value } = e.target;
  //console.log(name,value);
  setInputsSet((inputs) => ({ ...inputs, [name]: value }));
}
useEffect(() => {
  
  dispatch(inventoryActions.getSetById(props.setid));
}, []);



const addNewSet=(e)=>{
 e.preventDefault()
 setSubmitted(true)

 if(set.setname && set.setremark){
    
    dispatch(inventoryActions.addNewSet(set, from));
    
  }

}
const updateSet = (e) => {
  
  e.preventDefault();
  setSubmitted(true);

  if (set.setname && set.setremark) {
    dispatch(inventoryActions.updateSet(set, from));
  }
};  

  return (
    <div className='form-body'>
      <div className='row'>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              {props.isUpdate ? <h3>Update Set</h3> : <h3>Add New Set</h3>}

              <p>Fill in the data below.</p>
              <form className='requires-validation'>
                <div className='col-md-12'>
                  {props.isUpdate ? (
                    <input
                      required
                      className='form-control'
                      type='text'
                      value={setname}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      required
                      className='form-control'
                      type='text'
                      name='setname'
                      placeholder='Set Name'
                      value={setname}
                      onChange={handleChange}
                    />
                  )}
                  {submitted && !setname && (
                    <div className='invalid-feedback0'>
                      Set Name is required
                    </div>
                  )}
                  <input
                    required
                    className='form-control'
                    type='text'
                    name='setremark'
                    placeholder='Set Remark'
                    value={setremark}
                    onChange={handleChange}
                  />
                  {submitted && !setremark && (
                    <div className='invalid-feedback0'>Remark is required</div>
                  )}
                </div>
                <div className='form-button mt-3'>
                  {props.isUpdate ? (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => updateSet(e)}
                      className='btn btn-warning'
                    >
                      Update Set
                    </button>
                  ) : (
                    <button
                      id='submit'
                      type='submit'
                      onClick={(e) => addNewSet(e)}
                      className='btn btn-warning'
                    >
                      Add Set
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

export default AddSet;
