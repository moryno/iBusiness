import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { menus } from "../helpers/myNavLinks";
import { logout } from "../redux/userSlice";

const NavMenus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClick = (link) => {
    if (link === "Sign Out") {
      handleLogOut();
    } else if (link === "Update Profile") {
      navigate("/profile");
    }
  };
  return (
    <>
      {menus.map((link) => (
        <div key={link?.title}>
          <div className="text-left cursor-pointer group">
            <h1 className="">{link?.title}</h1>
            {link.submenu && (
              <div>
                <div className="absolute top-8 right-10 z-50 hidden group-hover:block hover:block">
                  <div className="py-3">
                    <div className="w-4 h-4 right-3 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white p-3.5">
                    {link.sublinks.map((mysublinks) => (
                      <div key={mysublinks.Head}>
                        {mysublinks.sublink.map((slink) => (
                          <li
                            key={slink.name}
                            className="text-sm text-gray-500 my-2.5"
                            onClick={() => handleClick(slink.name)}
                          >
                            <Link to={slink.link} className="hover:text-text">
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavMenus;
