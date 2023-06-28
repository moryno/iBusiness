import React, { useState } from "react";
import { FaToolbox, FaInfo } from "react-icons/fa";
import CustomActionsComponent from "../Menus/CustomActionsComponent";
import CustomActionModal from "../../modals/CustomActionModal";
import SalesApprovalComponent from "../SalesApprovalComponent";

const DetailsRightBar = ({ customAction, moreInfo, handleCustomClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const handleClick = (action) => {
  //   switch (action) {
  //     case "Approve":
  //       setIsOpen(true);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex flex-col gap-12 box-border">
      <section className="flex flex-col gap-y-0.5 md:gap-1.5">
        <article className="p-2 flex flex-col gap-2.5">
          <div className="flex items-center justify-center gap-x-2 font-semibold text-sm">
            <FaToolbox className="text-menuText text-sm md:text-lg" /> Actions
          </div>
        </article>
        <hr className="border h-0 border-gray-200" />
        <article className="flex flex-wrap gap-2 items-center justify-center">
          {customAction.map((action) => (
            <CustomActionsComponent
              key={action.id}
              title={action.title}
              icon={action.icon}
              onClick={() => handleCustomClick(action.title)}
            />
          ))}
        </article>
      </section>
      <section className="flex flex-col gap-y-0.5 md:gap-1.5">
        <article className="p-2 flex flex-col gap-2.5">
          <div className="flex items-center justify-center gap-x-2 font-semibold text-sm">
            <FaInfo className="text-menuText text-sm md:text-lg" /> More information
          </div>
        </article>
        <hr className="border h-0 border-gray-200" />
        <article className="flex flex-wrap gap-2 items-center justify-center">
            {Object.keys(moreInfo).map((key) => (
              <div className="w-full flex items-center justify-between">
                <p className="font-light text-xs">{key}:</p>&nbsp;<p className="font-medium text-xs">{moreInfo[key]}</p>
              </div>
            ))}
        </article>
      </section>
      <CustomActionModal isOpen={isOpen} handleClose={handleClose}>
        <SalesApprovalComponent handleClose={handleClose} />
      </CustomActionModal>
    </main>
  );
};

export default DetailsRightBar;
