// import { useState } from "react";
// import data from "../data/mockUp.json";
// import { bookingFormInputs } from "../helpers/formSource";

// const SearchInput = () => {
//   const [inputs, setInput] = useState({});

//   const onChange = (event) => {
//     const [name, value] = event.target;
//     setInput({ ...inputs, [name]: value });
//   };

//   const onSearch = (searchTerm) => {
//     setInput(searchTerm);
//     // our api to fetch the search result
//     console.log("search ", searchTerm);
//   };

//   return bookingFormInputs.map((formInput) => {
//     if (formInput.inputType === "select") {
//       return (
//         <section
//           key={formInput.id}
//           className="flex relative flex-col md:w-[47%]"
//         >
//           <section className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full ">
//             <label
//               className="text-sm font-medium text-gray-600"
//               htmlFor={formInput.name}
//             >
//               {formInput.label}:<sup className=" text-red-600">*</sup>
//             </label>
//             <input
//               className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
//               type={formInput.type}
//               id={formInput.name}
//               name={formInput.name}
//               value={inputs.formInput.name}
//               onChange={onChange}
//             />
//           </section>
//           <section className="flex flex-col absolute bg-red-300 right-1 -bottom-12  z-50">
//             {formInput.options
//               .filter((option) => {
//                 const searchTerm = inputs;
//                 const fullName = option.toLowerCase();

//                 return (
//                   searchTerm &&
//                   fullName.startsWith(searchTerm) &&
//                   fullName !== searchTerm
//                 );
//               })
//               .slice(0, 10)
//               .map((item) => (
//                 <article
//                   className="cursor-pointer text-start"
//                   onClick={() => onSearch(item)}
//                   key={item}
//                 >
//                   {item}
//                 </article>
//               ))}
//           </section>
//         </section>
//       );
//     } else {
//       return (
//         <div
//           key={formInput.id}
//           className="flex justify-between box-border flex-col gap-3 md:gap-0 md:flex-row w-full md:w-[47%]"
//         >
//           <label
//             className="text-sm font-medium text-gray-600"
//             htmlFor={formInput.name}
//           >
//             {formInput.label}:<sup className=" text-red-600">*</sup>
//           </label>
//           <input
//             className="border border-menu rounded-md pl-1 w-full md:w-1/2 outline-none "
//             type={formInput.type}
//             id={formInput.name}
//             name={formInput.name}
//             onChange={onChange}
//           />
//         </div>
//       );
//     }
//   });
// };

// export default SearchInput;
