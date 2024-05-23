import React from "react";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header=()=>{

  const [isLoggedin, setIsLoggedin] = useState(true);
  const onlineStatus =useOnlineStatus();
    return(
        <div className="header flex justify-between bg-opacity-75 bg-[#414141] shadow-lg">
            <div className="logo-container w-[80px] h-[80px] overflow-hidden rounded-full flex justify-center">
                <img className="logo max-w-full max-h-full object-cover" src= {LOGO_URL}/>
            </div>
            <div className="nav-items flex justify-end items-center">
                <ul className="list-none flex justify-between m-0 p-0 text-white">
                    
                    <li className="font-Arvo p-[10px] text-[18px]">
                      <Link to="/">Home</Link> 
                    </li>
                    <li className="font-Arvo p-[10px] text-[18px]">
                      <Link to="/about">About Us</Link> 
                    </li>
                    <li className="font-Arvo p-[10px] text-[18px]">
                      <Link to="/contact">Contact Us</Link> 
                    </li>
                    <li className="font-Arvo p-[10px] text-[18px]">
                      <Link to="/cart">Cart</Link> 
                    </li> 
                    <li>
                      {isLoggedin ? (
                        <button
                           className="logout-btn font-Arvo p-[10px] text-[18px]"
                           onClick={() => setIsLoggedin(false)}
                        >Logout
                         <span
                            className={onlineStatus ? "login-btn-green" : "login-btn-red"}
                         >
                            {" "}
                            🟢
                          </span>
                        </button>
                    ) : (
                    <button className="login-btn font-Arvo p-[10px] text-[18px]" onClick={() => setIsLoggedin(true)}>
                       Login
                       <span
                          className={onlineStatus ? "login-btn-green" : "login-btn-red"}
                       >
                       {" "}
                         🟢
                       </span>
                    </button>
                    )}
                </li>
                </ul>

            </div>
        </div>
    );
};

export default Header;