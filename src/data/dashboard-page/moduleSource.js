import { GiMoneyStack } from "react-icons/gi";
import { VscOrganization } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineSearch } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

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

export const securityGroupModules = [
  {
    id: 1,
    title: "User Groups",
    icon: <VscOrganization fontSize={20} />,
  },
  {
    id: 2,
    title: "Create UserGroups",
    icon: <AiOutlineUsergroupAdd fontSize={20} />,
  },
];
