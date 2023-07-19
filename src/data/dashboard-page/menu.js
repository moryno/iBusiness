import { MdFreeCancellation } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import { TbFileExport } from "react-icons/tb";
import { SiMicrosoftexcel } from "react-icons/si";
import { SlPrinter } from "react-icons/sl";
import { GrDocumentPdf } from "react-icons/gr";
import { RiFileEditFill } from "react-icons/ri";
import { FcInvite } from "react-icons/fc";

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
    icon: <MdOutlineSearch fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "New",
    icon: <MdOutlineAdd fontSize={20} />,
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
export const updateMenuSource = [
  {
    id: 1,
    title: "Edit",
    icon: <RiFileEditFill fontSize={20} />,
    onClick: "handleClick",
  },

  {
    id: 2,
    title: "Delete",
    icon: <MdOutlineDeleteOutline fontSize={20} />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Close",
    icon: <MdFreeCancellation fontSize={20} />,
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
    icon: <TbFileExport fontSize={"18px"} />,
    dropArrow: (
      <MdArrowDropDown fontSize={20} className=" opacity-70 cursor-pointer" />
    ),
    onClick: "handleClick",
    submenu: true,
    sublinks: [
      {
        Head: "Set Credentials",
        sublink: [
          { name: "Export all data to Excel", icon: <SiMicrosoftexcel /> },

          { name: "Export all data to PDF", icon: <GrDocumentPdf /> },
        ],
      },
    ],
  },
];
