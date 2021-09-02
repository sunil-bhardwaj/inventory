import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
function RightBar() {
    return (
      <div className='colf-md-3'>
        <br />
        <div className='container'>
          <div className='row'>
            <div className='col-md'>
              <Card border='primary' style={{ height: "auto" }}>
                <Card.Header>
                  <b style={{ cursor: "pointer" }}>Recent Activities</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text style={{ fontSize: "10px" }}>
                    <Link to='#'>Keyboard</Link> Added By{" "}
                    <Link to='#'>Prakash</Link> on dated
                    <br />
                    Hardware Alloted to Employee XYZ on dated
                    <br />
                    <Link to='#'>More...</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <br />
        <div className='container'>
          <div className='row'>
            <div className='col-md'>
              <Card border='primary' style={{ height: "auto" }}>
                <Card.Header>
                  <b style={{ cursor: "pointer" }}>Stock Summary</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text style={{ fontSize: "10px" }}>
                    <Link to='#'>Keyboard</Link> - <Link to='#'>500</Link> on
                    dated
                    <br />
                    <Link to='#'>Laptops</Link> - <Link to='#'>15</Link> on
                    dated
                    <br />
                    <Link to='#'>Desktops</Link> - <Link to='#'>250</Link> on
                    dated
                    <br />
                    <Link to='#'>Mouse</Link> - <Link to='#'>300</Link> on dated
                    <br />
                    <Link to='#'>More...</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <br />
        <div className='container'>
          <div className='row'>
            <div className='col-md'>
              <Card border='primary' style={{ height: "auto" }}>
                <Card.Header>
                  <b style={{ cursor: "pointer" }}>Stock Warnings</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text style={{ fontSize: "10px" }}>
                    <Link to='#'>Keyboard</Link> Number{" "}
                    <Link to='#'>INFG665FGF500</Link> warrenty expiring on dated
                    <br />
                    <Link to='#'>Laptops</Link> Number{" "}
                    <Link to='#'>INFG665FGF500</Link> warrenty expiring on dated
                    <br />
                    <Link to='#'>Desktops</Link>Number{" "}
                    <Link to='#'>INFG665FGF500</Link> warrenty expiring on dated
                    <br />
                    <Link to='#'>Mouse</Link> Number{" "}
                    <Link to='#'>INFG665FGF500</Link> warrenty expiring on dated
                    <br />
                    <Link to='#'>More...</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RightBar
