import React, { useContext, useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import ReactPaginate from "react-paginate";
import AddBranch from "../add/AddBranch";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import RightBar from "../../mycomponents/RightBar";
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
  // console.log(response.data);
  return response.data;
};

function ViewBranches(props) {
  const Admin = useContext(AdminContext);
  const [newBranchWindow, setnewBranchWindow] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [postsPerPage] = useState(12);
  const [offset, setOffset] = useState(1);
  const [brid, setBrId] = useState("");
  const [brname, setBrName] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getAllBranches = async () => {
      const allBranches = await retreiveBranches();
      if (allBranches) {
        const slice = allBranches.slice(offset - 1, offset - 1 + postsPerPage);
        Admin.setBranches(slice);
        setPageCount(Math.ceil(allBranches.length / postsPerPage));
      }
    };
    getAllBranches();
  }, [offset, newBranchWindow, deleteFlag]);

  const addNewBranch = (isUp, bid, bname) => {
    if (isUp) {
      setIsUpdate(true);
      setBrId(bid);
      setBrName(bname);
    } else setIsUpdate(false);
    setnewBranchWindow(!newBranchWindow);
  };

  const deleteBranch = async (id) => {
    var [_allBranches] = [];
    const response = await axios
      .delete(`http://localhost:3001/api/admin/branches/delete/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then("Deletion Successfull")
      .catch((err) => err + "Error State during Deletion of Branch");
    setDeleteFlag(true);
    setDeleteFlag(false);
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  const closeHandler = () => {
    setnewBranchWindow(!newBranchWindow);
  };
  // console.log(Admin.branches);
  return (
    <div className='container'>
      <div className='row'>
        <h4>Existing Branches</h4>

        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
            onClick={() => addNewBranch()}
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
              borderRadius: "5px 5px 5px 5px;",
              outline: "none",
              color: "#9dbfaf",
            }}
            type='search'
            value={searchKeywords}
            onChange={(e) => {
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
            <ListGroup>
              {Admin.branches
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.branchname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((branch, index) => (
                  <ListGroup.Item
                    key={branch.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {branch.id}
                    --{branch.branchname}
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() =>
                        addNewBranch(true, branch.id, branch.branchname)
                      }
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={(e) => deleteBranch(branch.id)}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            breakLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        <div className='col-md-4'>
          {newBranchWindow ? (
            <AddBranch
              brId={brid}
              brName={brname}
              isUpdate={isUpdate}
              closehandler={closeHandler}
            />
          ) : (
            <RightBar />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBranches;
