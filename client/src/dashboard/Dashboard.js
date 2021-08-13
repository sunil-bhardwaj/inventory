import React, { useState } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
var cors = require('cors')
export default function Dashboard() {
	const [name, setName] = useState(null);
	const apiURL = "localhost:8080/api/users";
	const fetchData = async () => {
        const response = await axios.get(apiURL)

        setName(response.data) 
        console.log(response.data);
    }

	return (
		<>
		  <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
      </div>
		<div>
		<Card border="primary" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Hello User
      </Card.Text>
    </Card.Body>
  </Card>
  <br/>
		</div>
		</>
	)
}