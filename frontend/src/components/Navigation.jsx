// This component is the navigation bar which locates at the bottom of the webpage when on mobile screens
// Its position on laptop screens is to be comfirmed later.
// It will be intergrated in every pages
import { FaUserAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import React from "react";
import NavMenu from "../ui/NavMenu";

export default function Navigation() {
  return (
    <div className="w-full flex justify-around items-center bg-white ">
      <NavMenu title="Home" path="">
        <AiFillHome />
      </NavMenu>
      <NavMenu title="Map" path="map">
        <FaMapMarkedAlt />
      </NavMenu>
      <NavMenu title="" path="add">
        <MdAddBox size={80} className="-translate-y-1" />
      </NavMenu>
      <NavMenu title="Search" path="search">
        <BiSearch />
      </NavMenu>
      <NavMenu title="Me" path="me">
        <FaUserAlt />
      </NavMenu>
    </div>
  );
}
