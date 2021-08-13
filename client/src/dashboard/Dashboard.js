import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';
export default function Users() {
	const {state,dispatch} = useContext(UserContext)
	
	const history = useHistory();
	const token = localStorage.getItem('token')
	const [complaints, setComplaints] = useState([]);
	//const apiURL = "http://localhost:3001/api/complaints/all";
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 5 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
	const fetchData = async () => {
   			const results = await axios(
      'http://localhost:3001/api/complaints/all',{
		  headers:{
			  "x-access-token":token
		  }
	  }
	).then(rrr => setComplaints(rrr.data))
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
    					
					{complaints.map((complaint,index) => (
        			<>
        			<div className="col-sm">
        			<Card border="primary" style={{ width: '18rem' }}>
				    <Card.Header ><b>Complaint ID--({complaint.id})</b></Card.Header>
				    <Card.Body>
				      <Card.Title>{complaint.refrenceno}/{complaint.complaintstatus}</Card.Title>
				      <Card.Text>
				       Complaint -{complaint.complainttext}<br/>
				       UserId-{complaint.userid}
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
		
