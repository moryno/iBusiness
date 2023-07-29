import { GiMoneyStack } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineSearch } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { FaUserFriends, FaUsers, FaUsersCog } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import { AiOutlineSecurityScan } from "react-icons/ai";

export const moduleCategories = [
  {
    id: 1,
    title: "Procure to Pay",
    icon: <MdOutlinePayment fontSize={20} />,
    partitionKey: "p2p",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Order to Cash",
    icon: <GiMoneyStack fontSize={20} />,
    partitionKey: "o2c",
    link: "/dashboard/o2c/orders",
  },
  {
    id: 3,
    title: "Inventory Management",
    icon: <MdOutlineSearch fontSize={20} />,
    partitionKey: "inv",
    link: "dashboard",
  },
  {
    id: 4,
    title: "General Accounting",
    icon: <TbReportSearch fontSize={20} />,
    partitionKey: "gac",
    link: "/dashboard",
  },
  {
    id: 5,
    title: "System Administatrion",
    icon: <GrUserSettings fontSize={20} />,
    partitionKey: "sad",
    link: "/dashboard/sad",
  },
];

export const securityActions = [
  {
    id: 1,
    title: "User Groups",
    icon: <FaUserFriends className="text-lime-600" fontSize={20} />,
  },
  {
    id: 2,
    title: "Group Roles",
    icon: <FaUsers className="text-orange-600" fontSize={20} />,
  },
];

export const rolesActions = [
  {
    id: 1,
    title: "Group Roles",
    icon: <FaUsers className="text-orange-600" fontSize={20} />,
  },
  {
    id: 2,
    title: "Security Groups",
    icon: <AiOutlineSafety className="text-green-900" fontSize={20} />,
  },
];

export const groupRolesActions = [
  {
    id: 1,
    title: "User Groups",
    icon: <FaUserFriends className="text-lime-600" fontSize={20} />,
  },
  {
    id: 2,
    title: "Roles",
    icon: <AiOutlineSecurityScan className="text-blue-700" fontSize={20} />,
  },
];

export const userDetailActions = [
  {
    id: 1,
    title: "Deactivate user",
    icon: <MdOutlineSecurity fontSize={20} className="text-orange-600" />,
  },
  {
    id: 2,
    title: "Group Roles",
    icon: <FaUsers fontSize={20} className="text-orange-600" />,
  },
];

export const userGroupActions = [
  {
    id: 1,
    title: "Users",
    icon: <FaUsersCog className="text-pink-700" fontSize={20} />,
  },
  {
    id: 2,
    title: "Security Groups",
    icon: <AiOutlineSafety className="text-green-900" fontSize={20} />,
  },
  {
    id: 3,
    title: "Roles",
    icon: <AiOutlineSecurityScan className="text-blue-700" fontSize={20} />,
  },
  {
    id: 4,
    title: "Group Roles",
    icon: <FaUsers className="text-orange-600" fontSize={20} />,
  },
];
