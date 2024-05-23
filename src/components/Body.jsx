import Restrocard from "./Restrocard";
// import resList from "../utils/mockData";
import React from "react";
import { useState, useEffect} from "react";
import Shimmer from "./Shimmer UI";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body=()=>{

    const [listOfRestros, setListOfRestros]= useState([]);
    const[filteredRestro,setFilteredRestros]= useState([]); //to store the filtered elements

     const[searchText, setSearchText]= useState(" ");
// Whenever a state variable update, react triggers a reconciliation cycle( re-renders the component)
     console.log("body gets rendered!");
//useEffect : First the body will be rendered then callback func will be called
    useEffect(()=>{
        fetchData(); //func to fetch the data
    },[]); 
     
    //logic to fetch the data from API
    const fetchData= async()=>{
        const data= await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6126255&lng=77.04108959999999&page_type=DESKTOP_WEB_LISTING");
        const json= await data.json();
        console.log(json);
        setListOfRestros(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestros(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus=useOnlineStatus();
    if (onlineStatus===false){
        alert("Oops! You're offline , Please check your internet connection");
        return <Shimmer/>;
    }
// conditional rendering : Rendering on the basis of condition
    // if(!listOfRestros){
    //     return <Shimmer/>;
    // }
// if listofrestros has null or zero value then shimmer UI will appear otherwise the 2nd condition
    return (listOfRestros.length== 0) ? (<Shimmer/>) : (
        // <div className="body flex justify-around flex-wrap my-6 mx-3 min-h-screen">
        <div className="bg-cover bg-fixed bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20231103/pngtree-minimalist-presentation-dark-textured-background-with-empty-black-plate-and-cutlery-image_13753913.png')]">
            <div className="filter flex">
                <div className="search flex items-center m-4 p-4">
                    <input type="text" className="search-box h-[35px] w-20 lg:w-[300px] md:w-52 sm:w-40 text-center text-lg border-2 border-[#818080] rounded font-Arvo" 
                    placeholder="Search a Restaurant/Cuisine"
                    value= {searchText}
                     onChange={(e)=>{
                         setSearchText(e.target.value);
                     }}/>
                    <button className="px-4 py-2 bg-gray-300  m-4 rounded-md"
                     onClick={()=>{
                     //Filter the restro cards and update the UI
                     //searchText
                            console.log(searchText);
                            const filteredRestro =listOfRestros.filter((restro)=>(restro.info.name+restro.info.cuisines).toLowerCase().includes(searchText));
                            console.log(filteredRestro);
                             
                            setFilteredRestros(filteredRestro);

                    }}>Search</button>
                </div>
                
                <button className="filter-btn" onClick={()=>{
                    console.log("hello")
                    const filteredList = listOfRestros.filter(
                        (restro)=>(restro.info.avgRating > 4)
                    );
                    setListOfRestros(filteredList);
                    }}
                    >Top Rated Restraunts</button> 
                
            </div>
            <div className="restro-container flex justify-around flex-wrap my-5 mx-4 min-h-screen">
                {listOfRestros && filteredRestro.map((restro,index)=> (
                <Link
                to={"/restaurant/" + restro?.info?.id}
                key={restro?.info?.id}><Restrocard resData={restro}/>
                </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;