import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Users.css";
import { UserContext } from "../UserContext";
import Loading from "../mycomponents/Loading";
import RightBar from "../mycomponents/RightBar";
export default function Users() {
  const User = useContext(UserContext);
  const [isloaded, setIsLoaded] = useState(false);
  const [deallocate, setDeallocate] = useState(false);
  const token = localStorage.getItem("token");
  const [searchKeywords, setSearchKeywords] = useState("");
   var length = 0
  //const apiURL = "http://localhost:3001/api/users/all";
  useEffect(() => {
    console.log("Inside Use Effect1");
    fetchInventory();
  }, [deallocate]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log("Inside Use Effect2");
    fetchData();
  }, []); //

  const fetchInventory = async () => {
    await axios("http://localhost:3001/api/dashboard/all", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((rrr) => {
        //console.log(rrr.data);
        User.setStocks(rrr.data);
      })
      .catch((err) => {
        // if (err.response.status === 401) {
        // history.push("/unauthorized");
        //  }
        console.log(err);
      });
  };
  const deallocateItems = async (deallocatedata) => {
    const type = deallocatedata.type;
    const deallocated = deallocatedata.deallocated;
    //console.log(deallocated)
    await axios
      .put(
        `http://localhost:3001/api/dashboard/updatedeallocatetable/${deallocatedata.reqid}`,
        {
          type: type,
          deallocated: deallocated,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((rrr) => {
        // User.setUsers(rrr.data);
        // setIsLoaded(true);
        //console.log(deallocate)
        //console.log(rrr);
      })
      .catch((err) => {
        // console.log(err);
        // if (err.response.status === 401) {
        // history.push("/unauthorized");
        //  }
      });
    console.log("Above change state");
    setDeallocate(true);
    setDeallocate(false);
  };
  const fetchData = async () => {
    await axios("http://localhost:3001/api/users/all", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((rrr) => {
        User.setUsers(rrr.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        // if (err.response.status === 401) {
        // history.push("/unauthorized");
        //  }
      });
  };
  //console.log(User);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-9'>
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
              marginBottom: "5px",
            }}
            type='search'
            value={searchKeywords}
            onChange={(e) => {
              setSearchKeywords(e.target.value);
            }}
            className='input'
            placeholder='Search...'
          />
          {isloaded ? (
            User.users
              .filter((val) => {
                if (searchKeywords === "") return val;
                else if (
                  val.name.toLowerCase().includes(searchKeywords.toLowerCase())
                )
                  return val;
                else if (
                  val.designame
                    .toLowerCase()
                    .includes(searchKeywords.toLowerCase())
                )
                  return val;
              })
              .map((user, index) => (
                <>
                  <br />
                  <div className='col-12' style={{}}>
                    <Card
                      key={index}
                      border='primary'
                      style={{ height: "auto" }}
                    >
                      <Card.Header>
                        <b style={{ cursor: "pointer" }}>{user.name}</b>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>User ID-{user.id}</Card.Title>
                        <Card.Text>
                          <div className='container2'>
                            <div className='row'>
                              <div className='col-md-3'>
                                Branch - {user.branchname}
                                <br />
                                Designation - {user.designame}
                              </div>
                              <div className='col-md-6 alert alert-success'>
                                <i
                                  className='fa fa-close'
                                  onClick={() => {
                                    deallocateItems({
                                      reqid: user.id,
                                      type: "userid",
                                      deallocated: true,
                                    });
                                  }}
                                  style={{ float: "right", cursor: "pointer" }}
                                />
                                InStock Items
                                <br />
                                {
                                  (length = User.stocks.filter(
                                    (stock) => stock.id === user.id
                                  ).length)
                                }
                                {User.stocks
                                  .filter((stock) => stock.id === user.id)
                                  .map((filteredStock, srno) => (
                                    <>
                                      <li
                                        key={srno}
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title={`OrderNo/OrderName:${filteredStock.orderno}/${filteredStock.ordername}\n \
                                    Item Serial No:${filteredStock.serialno}\n \
                                    Warranty Ends:${filteredStock.warranty_ends_on}`}
                                        className={
                                          filteredStock.isdeallocated
                                            ? "my-alert-danger"
                                            : ""
                                        }
                                        style={{ fontSize: "12px" }}
                                      >
                                        {}
                                        {`${srno + 1} - ${
                                          filteredStock.itemname
                                        }`}
                                        {!filteredStock.isdeallocated ? (
                                          <i
                                            className='fa fa-eye'
                                            onClick={() => {
                                              deallocateItems({
                                                reqid: filteredStock.mappingid,
                                                type: "id",
                                                deallocated: true,
                                              });
                                            }}
                                            style={{
                                              float: "right",
                                              cursor: "pointer",
                                            }}
                                          />
                                        ) : (
                                          <>
                                            <i
                                              className='fa fa-eye-slash'
                                              onClick={() => {
                                                deallocateItems({
                                                  reqid:
                                                    filteredStock.mappingid,
                                                  type: "id",
                                                  deallocated: false,
                                                });
                                              }}
                                              style={{
                                                float: "right",
                                                cursor: "pointer",
                                              }}
                                            />
                                            {length--}
                                          </>
                                        )}
                                      </li>
                                    </>
                                  ))}
                              </div>
                              <div className='col-md-3 alert alert-primary'>
                                <b>Stock Info </b>
                                <br />
                                <li style={{ fontSize: "13px" }}>
                                  Total Items ({length})
                                  <br />
                                  Total Sets ({0})
                                </li>
                              </div>
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ))
          ) : (
            <Loading />
          )}
        </div>
        {isloaded ? (
          <div className='col-md-3'>
            <RightBar />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
