import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
function ViewBranches(props) {
     return (
       <div style={{ display: "block", width: 700, padding: 30 }}>
         <h4>Existing Branches</h4>
         <ListGroup>
           <ListGroup.Item>
             <i
               className='btn btn-success'
               style={{ color: "red", marginTop: "7px" }}
               onClick={() => props.clickHander()}
             ></i>Hello
           </ListGroup.Item>
         </ListGroup>
       </div>
     );
}

export default ViewBranches
