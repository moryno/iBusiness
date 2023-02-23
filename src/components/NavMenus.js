import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { menus } from "../helpers/myNavLinks";
import { logout } from "../redux/userSlice";

const NavMenus = () => {
  const currentUser = useSelector((state) => state.user?.currentUser?.user);

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
        <main key={link.title} className="flex flex-col">
          <section className="cursor-pointer group">
            <h1>{link?.title}</h1>
            {link.submenu && (
              <section>
                <section className="absolute top-8 right-12 md:right-8 z-50 hidden  group-hover:block hover:block">
                  <div className="py-3">
                    <div className="w-4 h-4 right-3 absolute  bg-white rotate-45"></div>
                  </div>
                  <article className="bg-bg h-16"></article>
                  <article className="bg-card rounded-full overflow-hidden  w-20 h-20 flex items-center justify-center cursor-pointer absolute top-12 right-0 left-0 m-auto">
                    <img
                      className="max-w-full object-cover"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                      alt="profile"
                    />
                  </article>
                  <article className="bg-bgxLight p-5  shadow-xl">
                    <article className="flex flex-col mt-6 items-center">
                      <h3 className="font-medium text-text">
                        {currentUser.fullName}
                      </h3>
                      <span className="text-[14px] text-text font-normal">
                        {currentUser.email}
                      </span>
                    </article>
                    {link.sublinks.map((mysublinks) => (
                      <div
                        key={mysublinks.Head}
                        className="flex flex-col mt-2 justify-between"
                      >
                        {mysublinks.sublink.map((slink) => (
                          <li
                            key={slink.name}
                            className="text-sm text-text my-2.5"
                            onClick={() => handleClick(slink.name)}
                          >
                            <Link to={slink.link} className="hover:text-text">
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </article>
                </section>
              </section>
            )}
          </section>
        </main>
      ))}
    </>
  );
};

export default NavMenus;
