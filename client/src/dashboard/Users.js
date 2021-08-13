import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';
export default function Users() {
	const {state,dispatch} = useContext(UserContext)
	
	const history = useHistory();
	const token = localStorage.getItem('token')
	const [users, setUsers] = useState([]);
	//const apiURL = "http://localhost:3001/api/users/all";
  useEffect(() => {
       fetchData();
  }, []);
	const fetchData = async () => {
   			const results = await axios(
      'http://localhost:3001/api/users/all',{
		  headers:{
			  "x-access-token":token
		  }
	  }
	).then(rrr => setUsers(rrr.data))
	.catch(err => {
		if (err.response.status === 401) {
			history.push("/unauthorized");
		 }
	
	
	})
	 //	console.log(results.data);
	
      
    }

	
			return(
					<div className="container">
					<div className="row">
    					
					{users.map((user,index) => (
        			<>
        			<div className="col-sm">
        			<Card border="primary" style={{ width: '18rem' }}>
				    <Card.Header ><b>ID--({user.id})</b></Card.Header>
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

			
		}
		
