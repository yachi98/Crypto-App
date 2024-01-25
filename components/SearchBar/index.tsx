// interface SearchBarProps {
//   text: string;
// }

const SearchBar = () => {
  return (
    <input
      type="text"
      className="w-full bg-zinc-900 p-2 rounded-xl outline-none placeholder-white text-xs pl-7 text-white font-light"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
