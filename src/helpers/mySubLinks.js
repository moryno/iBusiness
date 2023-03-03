import { RiToolsFill, RiSettings5Fill, RiFolder3Fill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { getModule } from "../redux/moduleSlice";

// export const moduleMenus1 = [
//   {
//     id: 1,
//     title: "Processess",
//     icon: <RiSettings5Fill />,
//     submenu: true,
//     sublinks: [
//       { name: "Members Approval", link: "" },
//       { name: "Bookings", link: "" },
//       { name: "Booking Approval", link: "" },
//       { name: "Document Inquiry", link: "" },
//       { name: "Download Invoice", link: "" },
//       { name: "Attach Payment Receipt", link: "" },
//       { name: "Training Management", link: "" },
//       { name: "Members Inquiry", link: "" },
//       { name: "Training Bookings Inqury", link: "" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Inquiries",
//     icon: <RiFolder3Fill />,
//     submenu: true,
//     sublinks: [
//       { name: "Course Registration", link: "" },
//       { name: "Document Setup", link: "" },
//       { name: "Bulk Messaging", link: "" },
//       { name: "Approve SignUps", link: "" },
//       { name: "User Defined Codes", link: "" },
//       { name: "Training Management", link: "" },
//       { name: "Download Invoice", link: "" },
//       { name: "Document Inquiry", link: "" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Setups",
//     icon: <FaTools />,
//     submenu: true,
//     sublinks: [
//       { name: "Course Registration", link: "" },
//       { name: "Document Setup", link: "" },
//       { name: "Bulk Messaging", link: "" },
//       { name: "Approve SignUps", link: "" },
//       { name: "User Defined Codes", link: "" },
//     ],
//   },

//   {
//     id: 4,
//     title: "Reports",
//     icon: <TbReportSearch fontSize={18} />,
//     submenu: true,
//     sublinks: [
//       { name: "Course Registration", link: "" },
//       { name: "Document Setup", link: "" },
//       { name: "Bulk Messaging", link: "" },
//       { name: "Approve SignUps", link: "" },
//       { name: "User Defined Codes", link: "" },
//       { name: "Training Management", link: "" },
//       { name: "Download Invoice", link: "" },
//       { name: "Document Inquiry", link: "" },
//     ],
//   },
// ];

// export const moduleMenus2 = [
//   {
//     title: "Member Services",
//     submenu: true,
//     icon: <RiSettings5Fill />,
//     sublinks: [
//       { name: "Members Approval", link: "" },
//       { name: "Bookings", link: "" },
//       { name: "Booking Approval", link: "" },
//       { name: "Document Inquiry", link: "" },
//       { name: "Download Invoice", link: "" },
//       { name: "Attach Payment Receipt", link: "" },
//       { name: "Training Management", link: "" },
//       { name: "Members Inquiry", link: "" },
//       { name: "Training Bookings Inqury", link: "" },
//     ],
//   },
//   {
//     title: "Setups",
//     submenu: true,
//     icon: <FaTools />,
//     sublinks: [
//       { name: "Course Registration", link: "" },
//       { name: "Document Setup", link: "" },
//       { name: "Bulk Messaging", link: "" },
//       { name: "Approve SignUps", link: "" },
//       { name: "User Defined Codes", link: "" },
//     ],
//   },
//   {
//     title: "Other Services",
//     submenu: true,
//     icon: <RiFolder3Fill />,
//     sublinks: [
//       { name: "Course Registration", link: "" },
//       { name: "Document Setup", link: "" },
//       { name: "Bulk Messaging", link: "" },
//       { name: "Approve SignUps", link: "" },
//       { name: "User Defined Codes", link: "" },
//       { name: "Training Management", link: "" },
//       { name: "Download Invoice", link: "" },
//       { name: "Document Inquiry", link: "" },
//     ],
//   },
// ];

export const moduleMenus1 = [
  {
    id: 1,
    title: "Processess",

    submenu: true,
    sublinks: [
      { name: "Members Approval", link: "" },
      { name: "Bookings", link: "" },
      { name: "Booking Approval", link: "" },
      { name: "Document Inquiry", link: "" },
      { name: "Download Invoice", link: "" },
      { name: "Attach Payment Receipt", link: "" },
      { name: "Training Management", link: "" },
      { name: "Members Inquiry", link: "" },
      { name: "Training Bookings Inqury", link: "" },
    ],
  },
  {
    id: 2,
    title: "Inquiries",

    submenu: true,
    sublinks: [
      { name: "Course Registration", link: "" },
      { name: "Document Setup", link: "" },
      { name: "Bulk Messaging", link: "" },
      { name: "Approve SignUps", link: "" },
      { name: "User Defined Codes", link: "" },
      { name: "Training Management", link: "" },
      { name: "Download Invoice", link: "" },
      { name: "Document Inquiry", link: "" },
    ],
  },
  {
    id: 3,
    title: "Setups",

    submenu: true,
    sublinks: [
      { name: "Course Registration", link: "" },
      { name: "Document Setup", link: "" },
      { name: "Bulk Messaging", link: "" },
      { name: "Approve SignUps", link: "" },
      { name: "User Defined Codes", link: "" },
    ],
  },

  {
    id: 4,
    title: "Reports",

    submenu: true,
    sublinks: [
      { name: "Course Registration", link: "" },
      { name: "Document Setup", link: "" },
      { name: "Bulk Messaging", link: "" },
      { name: "Approve SignUps", link: "" },
      { name: "User Defined Codes", link: "" },
      { name: "Training Management", link: "" },
      { name: "Download Invoice", link: "" },
      { name: "Document Inquiry", link: "" },
    ],
  },
];

export const moduleMenus2 = [
  {
    title: "Member Services",
    submenu: true,

    sublinks: [
      { name: "Members Approval", link: "" },
      { name: "Bookings", link: "" },
      { name: "Booking Approval", link: "" },
      { name: "Document Inquiry", link: "" },
      { name: "Download Invoice", link: "" },
      { name: "Attach Payment Receipt", link: "" },
      { name: "Training Management", link: "" },
      { name: "Members Inquiry", link: "" },
      { name: "Training Bookings Inqury", link: "" },
    ],
  },
  {
    title: "Setups",
    submenu: true,

    sublinks: [
      { name: "Course Registration", link: "" },
      { name: "Document Setup", link: "" },
      { name: "Bulk Messaging", link: "" },
      { name: "Approve SignUps", link: "" },
      { name: "User Defined Codes", link: "" },
    ],
  },
  {
    title: "Other Services",
    submenu: true,

    sublinks: [
      { name: "Course Registration", link: "" },
      { name: "Document Setup", link: "" },
      { name: "Bulk Messaging", link: "" },
      { name: "Approve SignUps", link: "" },
      { name: "User Defined Codes", link: "" },
      { name: "Training Management", link: "" },
      { name: "Download Invoice", link: "" },
      { name: "Document Inquiry", link: "" },
    ],
  },
];

export const getSelectedModule = (dispatch, module) => {
  switch (module) {
    case "Procure to Pay":
      dispatch(getModule(moduleMenus1));
      break;
    case "Order to Cash":
      dispatch(getModule(moduleMenus2));
      break;
    default:
      dispatch(getModule(moduleMenus1));
  }
};
