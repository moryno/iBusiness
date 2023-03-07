import { GiMoneyStack } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineSearch } from "react-icons/md";

export const moduleCategories = [
  {
    id: 1,
    title: "Procure to Pay",
    icon: <MdOutlinePayment fontSize={20} />,
  },
  {
    id: 2,
    title: "Order to Cash",
    icon: <GiMoneyStack fontSize={20} />,
  },
  {
    id: 3,
    title: "Inventory Management",
    icon: <MdOutlineSearch fontSize={20} />,
  },
  {
    id: 4,
    title: "General Ledger",
    icon: <TbReportSearch fontSize={20} />,
  },
];
