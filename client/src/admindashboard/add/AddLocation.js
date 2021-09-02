import React from 'react'
import RightBar from "../../mycomponents/RightBar";
function AddLocation() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-9'>Add Location</div>
          <div className='col-md-3'>
            <RightBar />
          </div>
        </div>
      </div>
    );
}

export default AddLocation
