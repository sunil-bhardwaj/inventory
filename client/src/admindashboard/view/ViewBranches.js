import React, { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import ListGroup from "react-bootstrap/ListGroup";
//import api from "../api/api";
import AddBranch from "../add/AddBranch";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import Loading from "../../mycomponents/Loading";
import EditIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
const token = localStorage.getItem("token");
export const retreiveBranches = async () => {
  const response = await axios("http://localhost:3001/api/admin/branches/all", {
    headers: {
      "x-access-token": token,
    },
  });
  // const response = await api.get("/api/branches/all");
  console.log(response.data);
  return response.data;
};
function ViewBranches(props) {
  const Admin = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      debugger
    const getAllBranches = async () => {
      const allBranches = await retreiveBranches();
      if (allBranches) {
        Admin.setBranches(allBranches);
        console.log(Admin.branches);
        setIsLoading(true);
      }
    };
    getAllBranches();
  }, []);
  console.log(Admin.branches);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <div style={{ display: "block", width: 700, padding: 30 }}>
            <h4>Existing Branches</h4><Link to = '/addbranch' className = "primary" style={{color: 'hotpink'}} >Add New </Link>
            <ListGroup>
              {isLoading ? (
                Admin.branches.map((branch, index) => (
               
                  <ListGroup.Item
                    key={index}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {branch.id}.{branch.branchname}
                    <EditIcon
                      style={{ marginLeft: "3rem", float: "right" }}
                      color='primary'
                      onClick={() => props.clickHander()}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                      }}
                      onClick={() => props.clickHander()}
                    />
                  </ListGroup.Item>
                )  )
              ) : (
                <Loading />
              )}
            </ListGroup>
          </div>
        </div>
        <div className='col-md-4'>
          "Other Window"
        </div>
      </div>
    </div>
  );
}

export default ViewBranches;
