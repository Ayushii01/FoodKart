import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRouteError} from 'react-router-dom'
import { IMG_PIC } from '../utils/constants';

const Error = () => {
    const err= useRouteError();
    console.log(err);
  return (
    <div className="container">
       <div className="text">
            <h1>Page Not Found</h1>
            <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
            <ul className="ul-list">
                <li className="list-items"><NavLink to="/">Go to home page</NavLink></li>
                <li className="list-items"><NavLink to="/about">Know about Us</NavLink></li>
                <li className="list-items"><NavLink to="/contact">Contact Support</NavLink></li>
                {/* <li><a href="#">Go to Homepage</a></li>
                <li><a href="#">Visit our Blog</a></li>
            <li><a href="#">Contact support</a></li> */}
            </ul>
        </div>
        <div><img className="err-img" src={IMG_PIC}/></div>
   </div>
)}
      {/* <img className="errImg" src={IMG_PIC}/>
        <h1>Oops!!!!</h1>
        <h2>There's something unusual</h2>
        <h3>{err.status}:{err.statusText}</h3>
       <NavLink to="/">Go Back</NavLink>
     </div> */}


export default Error;