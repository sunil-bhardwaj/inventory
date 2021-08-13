import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
export default function Users() {
	const [users, setUsers] = useState([]);
	const apiURL = "http://localhost:3000/api/users";
  useEffect(() => {
       fetchData();
  }, []);
	const fetchData = async () => {
   			const results = await axios(
      'http://localhost:3000/api/users',
    );
 		console.log(results.data);
    setUsers(results.data);
      
    }

	
			//users.map((currElement)=>{
			return(
					<div className="container">
					<div class="row">
    					
					{users.map((user,index) => (
        			<>
        			<div class="col-sm">
        			<Card border="primary" style={{ width: '18rem' }}>
				    <Card.Header><b>ID--({user.id})</b></Card.Header>
				    <Card.Body>
				      <Card.Title>{user.name}</Card.Title>
				      <Card.Text>
				       BranchId-{user.branchid}<br/>
				       DesignationId-{user.designationid}
				      </Card.Text>
				    </Card.Body>
				  	</Card>
					<br/>
					</div>
				  	</>
						
      		))}
						
				</div></div>

				);

			// })
		}
		
