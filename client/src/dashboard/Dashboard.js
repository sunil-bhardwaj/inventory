import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
export default function Users() {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const results = await axios("http://localhost:3001/api/dashboard/all", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((rrr) => setItems(rrr.data))
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/unauthorized");
        }
      });
    console.log(results);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        {items.map((item, index) => (
          <>
            <div className='col-sm'>
              <Card border='primary' style={{ width: "18rem" }}>
                <Card.Header key={`${item.orderno}${item.id}${index}`}>
                  <b>Inventory Order No--({item.orderno})</b>
                </Card.Header>
                <Card.Body key={`${item.orderno}${item.id}${index}`}>
                  <Card.Title key={`${item.orderno}${item.id}${index}`}>
                    {item.serialno}/{item.itemname}
                  </Card.Title>
                  <Card.Text key={`${item.orderno}${item.id}${index}`}>
                    User Name -{item.name}
                    <br />
                    UserId-{item.id}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
