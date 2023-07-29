import { MdFreeCancellation, MdDisabledVisible } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import { SiMicrosoftexcel } from "react-icons/si";
import { SlPrinter } from "react-icons/sl";
import { AiOutlineFilePdf } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { FcInvite } from "react-icons/fc";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";

import {
  MdArrowDropDown,
  MdOutlineSearch,
  MdOutlineAdd,
  MdOutlineLocalPrintshop,
  MdOutlineDeleteOutline,
  MdHelpOutline,
} from "react-icons/md";

export const homeMenuSource = [
  {
    id: 1,
    title: "Find",
    icon: <MdOutlineSearch fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Add",
    icon: <MdOutlineAdd fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },

  {
    id: 3,
    title: "Edit",
    icon: <RiFileEditFill fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },

  {
    id: 4,
    title: "Export",
    icon: <MdOutlineLocalPrintshop fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 5,
    title: "Delete",
    icon: <MdOutlineDeleteOutline fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 6,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 7,
    title: "Help",
    icon: <MdHelpOutline fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
];

export const usersMenuSource = [
  {
    id: 1,
    title: "Find",
    icon: <MdOutlineSearch fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Invite",
    icon: <FcInvite fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Export",
    icon: <MdOutlineLocalPrintshop fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 4,
    title: "Delete",
    icon: <MdOutlineDeleteOutline fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 5,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 6,
    title: "Help",
    icon: <MdHelpOutline fontSize={20} />,
    onClick: "handleClick",
  },
];

export const newMenuSource = [
  {
    id: 1,
    title: "Save",
    icon: <FcAddDatabase fontSize={"18px"} />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} />,
    onClick: "handleClick",
  },
];

export const profileMenuSource = [
  {
    id: 1,
    title: "Edit profile",
    icon: <RiFileEditFill fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Save profile",
    icon: <RiFileEditFill fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 4,
    title: "Help",
    icon: <MdHelpOutline fontSize={20} />,
    onClick: "handleClick",
  },
];

export const updateMenuSource = [
  {
    id: 1,
    title: "Edit",
    icon: <RiFileEditFill fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Delete",
    icon: <MdOutlineDeleteOutline fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Help",
    icon: <MdHelpOutline fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 4,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
];

export const userDetailHeadActions = [
  {
    id: 1,
    title: "Disable User",
    icon: <MdDisabledVisible fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },

  {
    id: 2,
    title: "View Roles",
    icon: <AiOutlineSecurityScan fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Close",
    icon: <IoMdExit fontSize={20} className="text-menuText" />,
    onClick: "handleClick",
  },
];

export const securityActionsSource = [
  {
    id: 1,
    title: "User Groups",
    onClick: "handleClick",
  },

  {
    id: 2,
    title: "User Roles",
    onClick: "handleClick",
  },
];

export const userGroupActionsSource = [
  {
    id: 1,
    title: "Users",
    onClick: "handleClick",
  },

  {
    id: 2,
    title: "Security Groups",
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Roles",
    onClick: "handleClick",
  },
];

export const purchaseOrderMenu = [
  {
    id: 1,
    title: "Submit Order",
    icon: <SlPrinter fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Export",
    icon: <MdOutlineLocalPrintshop fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} />,
    onClick: "handleClick",
  },
];

export const dropDownMenuSource = [
  {
    id: 1,
    title: "Export",
    icon: <SiMicrosoftexcel fontSize={"16px"} className="text-menuText" />,
    dropArrow: <MdArrowDropDown fontSize={20} className="cursor-pointer" />,
    onClick: "handleClick",
    submenu: true,
    sublinks: [
      {
        Head: "Set Credentials",
        sublink: [
          {
            name: "Export to Excel",
            icon: (
              <SiMicrosoftexcel fontSize={"16px"} className="text-menuText" />
            ),
          },

          {
            name: "Export to PDF",
            icon: <AiOutlineFilePdf fontSize={20} className="text-menuText" />,
          },
        ],
      },
    ],
  },
];
