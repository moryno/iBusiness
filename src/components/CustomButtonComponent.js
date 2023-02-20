const CustomButtonComponent = ({ onClick, title, icon }) => {
  return (
    <article
      onClick={onClick}
      className="flex gap-1 border-l border-l-gray-300 hover:bg-bgLight  px-2 text-menu items-center font-medium  cursor-pointer text-sm"
    >
      {icon}
      {title}
    </article>
  );
};

export default CustomButtonComponent;
