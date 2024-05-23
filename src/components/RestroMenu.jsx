// import { useEffect, useState } from "react";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  swiggy_menu_api_URL,
  CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../utils/constants";
import {MenuShimmer} from "./Shimmer UI";

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY && x.card['info'].id === resId)?.card?.info || null;
      console.log('res data:',restaurantData);
      setRestaurant(restaurantData);

      // Set menu item data
      const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                            groupedCard?.cardGroupMap?.REGULAR?.
                            cards?.map(x => x.card?.card)?.
                            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu ">
      <div className="restaurant-summary ">
        <div className=" flex h-48 bg-cover bg-no-repeat bg-fixed bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20231103/pngtree-minimalist-presentation-dark-textured-background-with-empty-black-plate-and-cutlery-image_13753913.png')]">
          <div className="backdrop-blur-sm w-full h-full flex items-center justify-center">
            <div>
              <h1 className="font-extrabold text-6xl text-white font-serif">{restaurant?.name}</h1>
              <span className="flex flex-wrap justify-center">
                <div className="m-1 justify-center">
                  {restaurant?.avgRating < 4 ? (
                    <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-red-600 text-white font-medium rounded-md">
                      ⭐{restaurant?.avgRating}
                    </h4>
                  ) : (
                    <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-green-600 text-white font-medium rounded-md">
                      ⭐{restaurant?.avgRating}
                    </h4>
                  )}
                </div>
                <h2 className="justify-center m-1 text-white">|</h2>
                <h4 className="text-white mt-1">{restaurant?.areaName}</h4>
                <h2 className="justify-center m-1 text-white">|</h2>
                <h4 className="text-white mt-1">{restaurant?.sla?.lastMileTravelString ?? '2.0 km'}</h4>
                <h2 className="justify-center m-1 text-white">|</h2>
                <h4 className="text-white mt-1">{restaurant?.costForTwoMessage}</h4>
              </span>
            </div>
            {/* <h1 className="text-white">second</h1>
            <h1 className="text-white">third</h1> */}

          </div>
        </div>

        <div className="restaurant-menu-content mx-48 mt-10">
          <div className="menu-items-container ">
            <div className="menu-title-wrap">
              <h3 className="menu-title font-semibold text-gray-600 text-xl">Recommended</h3>
              <p className="menu-count text-md text-gray-600"> 
                {menuItems.length} ITEMS
              </p>
            </div>
            <div className="menu-items-list mx-3 mt-7 flex flex-col">
              {menuItems.map((item) => (
                <div className="menu-item h-48 m-6 flex justify-between border-b-2 border-gray-900" key={item?.id}>
                  <div className="menu-item-details w-9/12">
                    <h3 className="item-title font-semibold text-xl">{item?.name}</h3>
                      <p className="item-desc text-wrap text-justify mt-2 tex-lg ml-2">{item?.description}</p>
                    <p className="item-cost text-gray-700 font-medium text-sm ml-2 mt-2">
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item?.price / 100)
                        : " "}
                    </p>
                  </div>
                  <div className="menu-img-wrapper  ">
                    {item?.imageId && (
                      <img
                        className="menu-item-img h-28 "
                        src={ITEM_IMG_CDN_URL + item?.imageId}
                        alt={item?.name}
                      />
                    )}
                    <button className=" ml-2 add-btn text-base w-24 h-7 bg-green-700 text-white font-medium rounded-md"> ADD+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;





