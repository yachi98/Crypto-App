// interface SearchBarProps {
//   text: string;
// }

const SearchBar = () => {
  return (
    <input
      type="text"
      className="w-full backdrop-filter bg-black bg-opacity-40 p-2 rounded-xl outline-none placeholder-white text-xs pl-7 text-white font-light"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
