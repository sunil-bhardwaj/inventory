import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className='footer-dark'>
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6 col-md-3 item'>
              <h3>Services</h3>
              <ul>
                <li>
                  <Link to='#'>Web design</Link>
                </li>
                <li>
                  <Link to='#'>Development</Link>
                </li>
                <li>
                  <Link to='#'>Software Designing</Link>
                </li>
                <li>
                  <Link to='#'>Database Engineering</Link>
                </li>
                <li>
                  <Link to='#'>Big Data</Link>
                </li>
                <li>
                  <Link to='#'>Technologies</Link>
                </li>
              </ul>
            </div>
            <div className='col-sm-6 col-md-3 item'>
              <h3>About</h3>
              <ul>
                <li>
                  <Link to='#'>Meet Developers</Link>
                </li>
                <li>
                  <Link to='#'>Meet Programmers</Link>
                </li>
                <li>
                  <Link to='#'>Meet System Officers</Link>
                </li>
                <li>
                  <Link to='#'>Meet Sr. Tech Assistants</Link>
                </li>
                <li>
                  <Link to='#'>Meet Tech Assistants</Link>
                </li>
                <li>
                  <Link to='#'>Meet System Assistants</Link>
                </li>
              </ul>
            </div>
            <div className='col-md-6 item text'>
              <h3>HP High Court</h3>
              <p>
                Copyright © 2019. High Court of Himachal Pradesh. All Rights
                Reserved. Designed and Developed at High Court of Himachal
                Pradesh For any query regarding Inventory Contact: 0177-2888407,
                2650111, 2558831, 2650307.
                <br /> Website is best viewed through Chrome v73.0.3683.103,
                Mozilla Firefox® v66.0.3 or an equivalent browser software. If
                your browser is older, you may have trouble viewing many of our
                web site features properly.
              </p>
            </div>
            <div className='col item social'>
              <Link to='#'>
                <i className='fa fa-facebook'></i>
              </Link>
              <Link to='#'>
                <i className='fa fa-twitter'></i>
              </Link>
              <Link to='#'>
                <i className='fa fa-linkedin'></i>
              </Link>
              <Link to='#'>
                <i className='fa fa-pinterest'></i>
              </Link>
              <Link to='#'>
                <i className='fa fa-google-plus'></i>
              </Link>
            </div>
          </div>
          <p className='copyright'>
            Developed by Asst. Programmer © 2016-39 <br />
            Design by Himanshu Sharma © 2021
          </p>
        </div>
      </footer>
    </div>
  );
}
