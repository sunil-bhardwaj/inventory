import React, { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
//import {  Card } from "react-bootstrap";
import {  Link } from "react-router-dom";
//import { UserContext } from "../index";
//import CartIcon from "../mycomponents/images/keyboard.jpg";
export default function Users() {
  // const { state, dispatch } = useContext(UserContext);

  //const history = useHistory();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async (request, response) => {
      await axios("http://localhost:3001/api/dashboard/all", {
        headers: {
          "x-access-token": token,
        },
      })
        .then((rrr) => {
          setItems(rrr.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          /* if (err.response.status === 401) {
          history.push("/unauthorized");
        }*/
          console.log("Error Condition");
        });
      //console.log(results);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //console.log(items);
  return (
    <div className='container'>
      <div className='card shadow'>
        <div className='card-header border-0'>
          <h3 className='mb-0'>Card tables</h3>
        </div>
        {isloaded ? null : (
          <>
            <div className='linear-background'>
              <div className='inter-draw'></div>
              <div className='inter-crop'></div>
              <div className='inter-right--top'></div>
              <div className='inter-right--bottom'></div>
            </div>
          </>
        )}
        <div className='table-responsive'>
          <table className='table align-items-center table-flush'>
            <thead
              className='thead-light'
              style={{ backgroundColor: "cornflowerblue" }}
            >
              <tr>
                <th scope='col'>Order Name</th>
                <th scope='col'>Item Name</th>
                <th scope='col'>Serial No</th>
                <th scope='col'>User</th>
                <th scope='col'>User Id</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <>
                  <tr>
                    <th scope='row'>
                      <div className='media align-items-center'>
                        <Link to='#' className='avatar rounded-circle mr-3'>
                          <img
                            alt=''
                            src={`../mycomponents/${item.image}`}
                            style={{ height: "4em", width: "10em" }}
                          />
                        </Link>
                        <div className='media-body'>
                          <span className='mb-0 text-sm'>{item.orderno}</span>
                        </div>
                      </div>
                    </th>
                    <td>{item.itemname}</td>
                    <td>{item.serialno}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>{item.id}</span>
                        <div>
                          <div className='progress'>
                            <div
                              className='progress-bar bg-warning'
                              role='progressbar'
                              aria-valuenow='60'
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='text-right'>
                      <div className='dropdown'>
                        <Link
                          className='btn btn-sm btn-icon-only text-light'
                          to='#'
                          role='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          <i className='fas fa-ellipsis-v'></i>
                        </Link>
                        <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                          <Link className='dropdown-item' to='#'>
                            Action
                          </Link>
                          <Link className='dropdown-item' to='#'>
                            Another action
                          </Link>
                          <Link className='dropdown-item' to='#'>
                            Something else here
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
