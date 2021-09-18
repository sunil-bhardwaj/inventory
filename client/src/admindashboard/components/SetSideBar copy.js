import React from 'react'
import {Link} from "react-router-dom";
import './SetSideBar.css'
function SetSideBar(props) {
    return (
    <> 
<div id="mobile-filter">
    <div>
    <h6 className="p-1 border-bottom">{`Items Added To ${props.setName}`}</h6>
        <ul>
            <li><Link to="#">Living</Link></li>
            <li><Link to="#">Dining</Link></li>
            <li><Link to="#">Office</Link></li>
            <li><Link to="#">Bedroom</Link></li>
            <li><Link to="#">Kitchen</Link></li>
        </ul>
    </div>
    <div>
        <h6 className="p-1 border-bottom">Filter By</h6>
        <p className="mb-2">Color</p>
        <ul className="list-group">
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="red"></span>Red </Link></li>
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="teal"></span>Teal </Link></li>
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="blue"></span>Blue </Link></li>
        </ul>
    </div>
    <div>
        <h6>Type</h6>
        <form className="ml-md-2">
            <div className="form-inline border rounded p-sm-2 my-2"> <input type="radio" name="type" id="boring"/> <label for="boring" className="pl-1 pt-sm-0 pt-1">Boring</label> </div>
            <div className="form-inline border rounded p-sm-2 my-2"> <input type="radio" name="type" id="ugly"/> <label for="ugly" className="pl-1 pt-sm-0 pt-1">Ugly</label> </div>
            <div className="form-inline border rounded p-md-2 p-sm-1"> <input type="radio" name="type" id="notugly"/> <label for="notugly" className="pl-1 pt-sm-0 pt-1">Not Ugly</label> </div>
        </form>
    </div>
</div>
<section id="sidebar">
    <div>
        <h6 className="p-1 border-bottom">Home Furniture</h6>
        <ul>
            <li><Link to="#">Living</Link></li>
            <li><Link to="#">Dining</Link></li>
            <li><Link to="#">Office</Link></li>
            <li><Link to="#">Bedroom</Link></li>
            <li><Link to="#">Kitchen</Link></li>
        </ul>
    </div>
    <div>
        <h6 className="p-1 border-bottom">Filter By</h6>
        <p className="mb-2">Color</p>
        <ul className="list-group">
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="red"></span>Red </Link></li>
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="teal"></span>Teal </Link></li>
            <li className="list-group-item list-group-item-action mb-2 rounded"><Link to="#"> <span className="fa fa-circle pr-1" id="blue"></span>Blue </Link></li>
        </ul>
    </div>
    <div>
        <h6>Type</h6>
        <form className="ml-md-2">
            <div className="form-inline border rounded p-sm-2 my-2"> <input type="radio" name="type" id="boring"/> <label for="boring" className="pl-1 pt-sm-0 pt-1">Boring</label> </div>
            <div className="form-inline border rounded p-sm-2 my-2"> <input type="radio" name="type" id="ugly"/> <label for="ugly" className="pl-1 pt-sm-0 pt-1">Ugly</label> </div>
            <div className="form-inline border rounded p-md-2 p-sm-1"> <input type="radio" name="type" id="notugly"/> <label for="notugly" className="pl-1 pt-sm-0 pt-1">Not Ugly</label> </div>
        </form>
    </div>
</section>
</>
    )
}

export default SetSideBar
