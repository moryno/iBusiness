import CustomActionsComponent from "../Menus/CustomActionsComponent";

const RightBarHeader = ({ customAction, handleClick }) => {
  return (
    <section className="flex flex-col justify-between gap-y-3 md:gap-3">
      <article className="p-2">
        <div className="flex items-center text-col text-sm capitalize font-semibold gap-x-2">
          {'Quick Actions'}
        </div>
      </article>
      <article className="flex flex-wrap items-center flex-col justify-center gap-3">
        <CustomActionsComponent
          customAction={customAction}
          handleClick={handleClick}
        />
      </article>
    </section>
  );
};

export default RightBarHeader;
