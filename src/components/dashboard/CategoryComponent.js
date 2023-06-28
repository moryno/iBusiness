import { memo } from "react"

const CategoryComponent = ({ children }) => {
  return <main className="w-full">{children}</main>;
};

export default memo(CategoryComponent);
