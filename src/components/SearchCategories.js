import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../helpers/categoriesSource";

const SearchCategories = ({ searchInput }) => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchInput === "") {
      setSearchResult(categories);
    } else {
      const resultArray = searchResult.filter((result) =>
        result.title.toLowerCase().includes(searchInput)
      );
      setSearchResult(resultArray);
    }
  }, [searchInput]);

  return (
    <>
      <div
        className={`absolute ${
          searchInput === "" ? "hidden" : "block"
        } search z-50 bg-white top-12 shadow-xl`}
      >
        <ul className="text-left cursor-pointer group">
          {searchResult.map((category) => (
            <li
              key={category?.id}
              className="text-text text-sm py-1.5 px-5 hover:bg-bgxLight"
            >
              <Link to={`${category.link}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchCategories;
