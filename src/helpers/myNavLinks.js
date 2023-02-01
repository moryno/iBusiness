import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const menus = [
  {
    title: (
      <ArrowDropDownIcon className="text-[16px] opacity-70 cursor-pointer" />
    ),
    submenu: true,
    sublinks: [
      {
        Head: "Set Credentials",
        sublink: [
          { name: "Update Profile", link: "" },
          { name: "Change Password", link: "" },
          { name: "Sign Out", link: "" },
        ],
      },
    ],
  },
];
