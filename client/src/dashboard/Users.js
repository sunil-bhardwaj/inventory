import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Users.css";
import { UserContext } from "../UserContext";
import Loading from '../mycomponents/Loading'
import RightBar from '../mycomponents/RightBar'
export default function Users() {
  const User = useContext(UserContext);
  const [isloaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  //const apiURL = "http://localhost:3001/api/users/all";
  useEffect(() => {
    fetchData();
    fetchInventory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchInventory = async () => {
    await axios("http://localhost:3001/api/dashboard/all", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((rrr) => {
        // console.log("hjggdfgsdfgsdf")
        User.setStocks(rrr.data);
      })
      .catch((err) => {
        // if (err.response.status === 401) {
        // history.push("/unauthorized");
        //  }
        console.log(err);
      });
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
          {isloaded ? (
            User.users.map((user, index) => (
              <>
                <br />
                <div className='col-12' style={{}}>
                  <Card key={index} border='primary' style={{ height: "auto" }}>
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
                              InStock Items
                              <br />
                              {User.stocks
                                .filter((stock) => stock.id === user.id)
                                .map((filteredStock, srno) => (
                                  <li
                                    key={srno}
                                    data-toggle='tooltip'
                                    data-placement='top'
                                    title={`OrderNo/OrderName:${filteredStock.orderno}/${filteredStock.ordername}\n \
Item Serial No:${filteredStock.serialno}\n \
Warranty Ends:${filteredStock.warranty_ends_on}`}
                                    style={{ fontSize: "12px" }}
                                  >{`${srno + 1} - ${
                                    filteredStock.itemname
                                  }`}</li>
                                ))}
                            </div>
                            <div className='col-md-3 alert alert-primary'>
                              <b>Stock Info </b>
                              <br />
                              <li style={{ fontSize: "13px" }}>
                                Total Items ({user.invcount})
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
         <div class='col-md-3'><RightBar /></div>
        ) : (
         <Loading />
        )}
      </div>
    </div>
  );
}
