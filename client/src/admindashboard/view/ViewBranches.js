import React, { useEffect } from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import api from '../api/api';
function ViewBranches(props) {
    const retreiveBranches = async ()=>{

        const response = await api.get("/api/branches/all")
        return response.data
    }
    useEffect(() => {
        const getAllBranches = async()=>{
            const allBranches = await retreiveBranches()
            if(allBranches) setBranches(allBranches)

        }
        
    }, [])
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
