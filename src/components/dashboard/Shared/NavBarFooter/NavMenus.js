import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../../../../helpers/myNavLinks";
import { logout } from "../../../../redux/reducers/userSlice";

import Constant from "../../../../utils/constant";

const NavMenus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  
  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClick = (link) => {
    if (link === "Sign Out") {
      handleLogOut();
    } else if (link === "Update Profile") {
      navigate("/dashboard/SAD/users/profile");
    } else if (link === "Change Password") {
      window.location.href =
        process.env.REACT_APP_BASE_URL +
        process.env.REACT_APP_API_VERSION +
        Constant.ACTION.PASSWORD_RESET;
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
                <section className="absolute top-6 md:top-8 right-16 md:right-16 z-50 hidden  group-hover:block hover:block">
                  <article className="bg-bg h-16"></article>
                  <article className="rounded-full overflow-hidden  w-20 h-20 flex items-center justify-center cursor-pointer absolute top-6 right-0 left-0 m-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={currentUser?.imageLink??"https://pp-b5facpcqcnbmaecm.z01.azurefd.net/profilepic/default.jpg"}
                      alt="profile"
                    />
                  </article>
                  <article className="bg-sidebarHeading p-5  shadow-xl">
                    <article className="flex flex-col mt-6 items-center">
                      <h3 className="font-medium text-heading">
                        {currentUser?.fullName}
                      </h3>
                      <span className="text-[14px]  text-heading font-normal">
                        {currentUser?.email}
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
                            className="text-sm text-heading py-2.5 hover:bg-bgDark"
                            onClick={() => handleClick(slink.name)}
                          >
                            {/* <a href={slink.link}> */}
                            {slink.name}
                            {/* </a> */}
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
