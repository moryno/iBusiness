import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/userSlice";
import { userMenus } from "../../helpers/userProfileLinks";

const UserProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user
  const currentUser = useSelector((state) => state.user?.currentUser);

  // Handle logout and remove token from persist
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  // Function when menu is clicked
  const handleClick = (link) => {
    if (link === "Sign Out") {
      handleLogOut();
    } else if (link === "Update Profile") {
      navigate("/dashboard/profile");
    }
  };

  return (
    <>
      {userMenus?.map((link) => (
        <main key={link.title} className="flex flex-col">
          <section className="cursor-pointer group">
            <h1>{link?.title}</h1>
            {link.submenu && (
              <section>
                <section className="absolute top-6 md:top-9 right-16 md:right-44 z-50 hidden group-hover:block hover:block">
                  <article className="bg-userProfileBg h-16"></article>
                  <article className="rounded-full overflow-hidden  w-16 h-16 flex items-center justify-center cursor-pointer absolute top-6 right-0 left-0 m-auto">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="profile"
                    />
                  </article>
                  <article className="p-5 bg-white shadow-xl w-40">
                    <article className="flex flex-col mt-6 items-center">
                      <h3 className="font-medium ">{currentUser?.givenName}</h3>
                      <span className="text-[14px] font-normal">
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
                            className="text-sm  py-2.5 hover:bg-userProHover"
                            onClick={() => handleClick(slink.name)}
                          >
                            <Link to={slink.link}>{slink.name}</Link>
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

export default UserProfileMenu;
