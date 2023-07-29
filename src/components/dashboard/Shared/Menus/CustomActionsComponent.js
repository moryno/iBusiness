const CustomActionsComponent = ({ customAction, handleClick }) => {
  return customAction.map((action) => (
    <article
      key={action.id}
      onClick={() => handleClick(action.title)}
      className="flex gap-2 transition-all duration-100 py-2 hover:bg-gray-200 border border-gray-200 px-3 w-[100%] h-auto bg-menuBg items-center font-semibold  cursor-pointer text-sm"
    >
      {action.icon}
      {action.title}
    </article>
  ));
};

export default CustomActionsComponent;
