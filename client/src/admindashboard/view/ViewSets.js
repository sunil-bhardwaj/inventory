import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ReactPaginate from "react-paginate";
import AddBranch from "../add/AddBranch";
import axios from "axios";
import { AdminContext } from "../AdminContext";
import RightBar from "../../mycomponents/RightBar";
import EditIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AddSet from "../add/AddSet";
import Description from "../components/Description";
import SetSideBar from "../components/SetSideBar";
import { Redirect } from "react-router-dom";
 const token = localStorage.getItem("token");
export const retreiveSets = async () => {
  const response = await axios("http://localhost:3001/api/admin/sets/all", {
    headers: {
      "x-access-token": token,
    },
  });
  // const response = await api.get("/api/branches/all");
  // console.log(response.data);
  return response.data;
};

function ViewSets(props) {
 
  const history = useHistory();
  const Admin = useContext(AdminContext);
  const [newSetWindow, setnewSetWindow] = useState(false);
 
  const [searchKeywords, setSearchKeywords] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [setsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  const [setid, setSetId] = useState("");
  const [setname, setSetName] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
    const [showSetTab, setShowSetTab] = useState(false);
  useEffect(() => {
    const getAllSets = async () => {
      const allSets = await retreiveSets();
      if (allSets) {
        const slice = allSets.slice(offset - 1, offset - 1 + setsPerPage);
        Admin.setSets(slice);
        setPageCount(Math.ceil(allSets.length / setsPerPage));
      }
    };
    getAllSets();
  }, [offset, newSetWindow, deleteFlag]);

  const addNewSet = (isUp, setid, setname) => {
    if (isUp) {
      setIsUpdate(true);
      setSetId(setid);
      setSetName(setname);
    } else setIsUpdate(false);
    setnewSetWindow(!newSetWindow);
  };

  const deleteSet = async (id) => {
    var [_allSets] = [];
    const response = await axios
      .delete(`http://localhost:3001/api/admin/sets/delete/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then("Deletion Successfull")
      .catch((err) => err + "Error State during Deletion of Branch");
    setDeleteFlag(true);
    setDeleteFlag(false);
  };
  const showSetItems = (set)=>{
        setSetName(set.setname)
        setSetId(set.id);
        setShowSetTab(!showSetTab);
  }
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  const closeHandler = () => {
    setnewSetWindow(!newSetWindow);
  };
  // console.log(Admin.branches);
  return (
    <div className='container'>
      <div className='row'>
        <h4>Existing Sets</h4>

        <div className='col-md-4 float-left'>
          <button
            className='btn btn-success'
            style={{ marginBottom: "6px", marginRight: "50%" }}
            onClick={() => addNewSet()}
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
              {Admin.sets
                .filter((val) => {
                  if (searchKeywords === "") return val;
                  else if (
                    val.setname
                      .toLowerCase()
                      .includes(searchKeywords.toLowerCase())
                  )
                    return val;
                })
                .map((set, index) => (
                  <ListGroup.Item
                    key={set.id}
                    style={{ backgroundColor: "#e7f3f3" }}
                  >
                    {set.id}
                    --{set.setname}
                    <AddIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => showSetItems(set)}
                    />
                    <EditIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        cursor: "pointer",
                      }}
                      color='primary'
                      onClick={() => addNewSet(true, set.id, set.setname)}
                    />
                    <DeleteIcon
                      style={{
                        marginLeft: "3rem",
                        float: "right",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={(e) => deleteSet(set.id)}
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
        <div className='col-md-4' style={{ border: "2px solid green" }}>
          {newSetWindow ? (
            <AddSet
              setId={setid}
              setName={setname}
              isUpdate={isUpdate}
              closehandler={closeHandler}
            />
          ) : showSetTab ? (
         
          
            history.push({
              pathname: "/viewstore",
              state: { redirected:true,setid,setname}
            })
          
          ) : (
            /* <SetSideBar setName = {setname}/>*/
            <RightBar />
          )}
          {}
        </div>
      </div>
    </div>
  );
}

export default ViewSets;
