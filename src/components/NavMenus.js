import React from "react";
import { Link } from "react-router-dom";
import { menus } from "../helpers/myNavLinks";

const NavMenus = () => {
  return (
    <>
      {menus.map((link) => (
        <div key={link?.title}>
          <div className="text-left cursor-pointer group">
            <h1 className="">{link?.title}</h1>
            {link.submenu && (
              <div>
                <div className="absolute top-10 right-10 hidden group-hover:block hover:block">
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
