const CustomButtonComponent = ({ onClick, title, icon }) => {
  return (
    <article
      onClick={onClick}
      className="flex gap-1 border border-l-gray-300 hover:bg-gray-200 py-0.5 px-4 w-fit bg-menuBg text-menuText items-center font-medium  cursor-pointer text-sm"
    >
      {icon}
      {title}
    </article>
  );
};

export default CustomButtonComponent;
