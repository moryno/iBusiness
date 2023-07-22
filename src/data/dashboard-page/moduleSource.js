import { GiMoneyStack } from "react-icons/gi";
import { VscOrganization } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineSearch } from "react-icons/md";
import {
  //AiOutlineUsergroupAdd,
  AiOutlineSecurityScan,
} from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

export const moduleCategories = [
  {
    id: 1,
    title: "Procure to Pay",
    icon: <MdOutlinePayment fontSize={20} />,
    partitionKey: "procure2pay",
  },
  {
    id: 2,
    title: "Order to Cash",
    icon: <GiMoneyStack fontSize={20} />,
    partitionKey: "order2cash",
  },
  {
    id: 3,
    title: "Inventory Management",
    icon: <MdOutlineSearch fontSize={20} />,
    partitionKey: "procure2pay",
  },
  {
    id: 4,
    title: "General Ledger",
    icon: <TbReportSearch fontSize={20} />,
    partitionKey: "order2cash",
  },
];

export const securityActions = [
  {
    id: 1,
    title: "User Groups",
    icon: <VscOrganization fontSize={20} />,
  },
  {
    id: 2,
    title: "Group Roles",
    icon: <GrUserAdmin fontSize={20} />,
  },
];

export const rolesActions = [
  {
    id: 1,
    title: "Group Roles",
    icon: <GrUserAdmin fontSize={20} />,
  },
  {
    id: 2,
    title: "Security Groups",
    icon: <MdOutlineSecurity fontSize={20} />,
  },
];
export const groupRolesActions = [
  {
    id: 1,
    title: "Security Groups",
    icon: <MdOutlineSecurity fontSize={20} />,
  },
  {
    id: 2,
    title: "Roles",
    icon: <AiOutlineSecurityScan fontSize={20} />,
  },
];

export const userDetailActions = [
  {
    id: 1,
    title: "Deactivate user",
    icon: <MdOutlineSecurity fontSize={20} />,
  },
  {
    id: 2,
    title: "User roles",
    icon: <AiOutlineSecurityScan fontSize={20} />,
  },
];

export const userGroupActions = [
  {
    id: 1,
    title: "Users",
    icon: <FiUsers fontSize={20} />,
  },
  {
    id: 2,
    title: "Security Groups",
    icon: <MdOutlineSecurity fontSize={20} />,
  },
  {
    id: 3,
    title: "Roles",
    icon: <AiOutlineSecurityScan fontSize={20} />,
  },
];
