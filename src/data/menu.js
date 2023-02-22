import AddIcon from "@mui/icons-material/Add";
import { SearchOutlined } from "@mui/icons-material";
import { Print } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import { MdFreeCancellation } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";

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
    title: "Print Report",
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