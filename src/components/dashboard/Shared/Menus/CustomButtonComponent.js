import ExportingMenu from "./ExportingMenu";

const CustomButtonComponent = ({ onClick, title, icon }) => {
  if (title === "Export") {
    return (
      <article className="flex gap-1 transition-all duration-100 font-normal text-zinc-600 hover:bg-gray-200 py-[3px] px-4 w-fit bg-menuBg items-center cursor-pointer text-xs">
        <ExportingMenu />
      </article>
    );
  }

  return (
    <article
      onClick={onClick}
      className="flex gap-1 transition-all duration-100 font-semibold text-zinc-600 hover:bg-gray-200 py-[3px] px-4 w-fit bg-menuBg items-center cursor-pointer text-xs active:bg-gray-300"
    >
      {icon}
      {title}
    </article>
  );
};

export default CustomButtonComponent;
