import AddIcon from "@mui/icons-material/Add";
import { SearchOutlined } from "@mui/icons-material";
import { Print } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import { MdFreeCancellation } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import { TbFileExport } from "react-icons/tb";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const homeMenuSource = [
  {
    id: 1,
    title: "Find",
    icon: <SearchOutlined />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "New",
    icon: <AddIcon />,
    onClick: "handleClick",
  },
  {
    id: 3,
    title: "Export",
    icon: <Print />,
    onClick: "handleClick",
  },
  {
    id: 4,
    title: "Delete",
    icon: <DeleteIcon />,
    onClick: "handleClick",
  },
  {
    id: 5,
    title: "Close",
    icon: <MdFreeCancellation />,
    onClick: "handleClick",
  },
  {
    id: 6,
    title: "Help",
    icon: <HelpIcon />,
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
    icon: <MdFreeCancellation />,
    onClick: "handleClick",
  },
];
export const updateMenuSource = [
  {
    id: 1,
    title: "Update",
    icon: <FcAddDatabase />,
    onClick: "handleClick",
  },
  {
    id: 2,
    title: "Close",
    icon: <MdFreeCancellation />,
    onClick: "handleClick",
  },
];

export const dropDownMenuSource = [
  {
    id: 1,
    title: "Export",
    icon: <TbFileExport fontSize={"18px"} />,
    dropArrow: (
      <ArrowDropDownIcon className="text-[16px] opacity-70 cursor-pointer" />
    ),
    onClick: "handleClick",
    submenu: true,
    sublinks: [
      {
        Head: "Set Credentials",
        sublink: [
          // { name: "Export selected rows to Excel", icon: <SiMicrosoftexcel /> },
          { name: "Export all data to Excel", icon: <SiMicrosoftexcel /> },
          // { name: "Export selected rows to PDF", icon: <GrDocumentPdf /> },
          { name: "Export all data to PDF", icon: <GrDocumentPdf /> },
        ],
      },
    ],
  },
];

export function handleClick(menu) {
  switch (menu) {
    case "Find":
      console.log("Find was clicked");
      break;
    case "New":
      console.log("New was clicked");
      break;
    case "Print Report":
      console.log("Print Report was clicked");
      break;
    case "Delete":
      console.log("Delete was clicked");
      break;
    case "Close":
      console.log("Close was clicked");
      break;
    case "Help":
      console.log("Help was clicked");
      break;

    default:
      break;
  }
}
