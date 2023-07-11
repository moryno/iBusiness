import { FaToolbox } from "react-icons/fa";
import CustomActionsComponent from "../Menus/CustomActionsComponent";

const RightBarHeader = ({ customAction, handleClick }) => {
  return (
    <section className="flex flex-col gap-y-0.5 md:gap-1.5">
      <article className="p-2">
        <div className="flex items-center gap-x-2 font-semibold text-sm">
          <FaToolbox className="text-menuText text-sm md:text-lg" /> Custom
          Actions
        </div>
      </article>
      <hr className="border h-0 border-gray-200" />
      <article className="flex flex-wrap items-center">
        <CustomActionsComponent
          customAction={customAction}
          handleClick={handleClick}
        />
      </article>
    </section>
  );
};

export default RightBarHeader;
