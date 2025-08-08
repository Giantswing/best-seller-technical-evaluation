import useStore from "@/store";
import { postCategories } from "@/types";
import Select from "react-select";

const SearchPostsBar = () => {
  const { textSearch, selectedCategory } = useStore();

  const options: { value: string; label: string }[] = postCategories.map((category) => ({
    value: category,
    label: category,
  }));

  const selectedOption = options.find((option) => option.value === selectedCategory);

  return (
    <div className="flex items-center gap-2 sticky top-0 bg-white z-10 pb-4 z-20">
      <input
        className="border border-gray-300 rounded-md px-2 h-[38px] w-full"
        type="text"
        placeholder="Search"
        value={textSearch}
        onChange={(e) => {
          useStore.setState({ textSearch: e.target.value });
        }}
      />

      <Select<{ value: string; label: string }>
        className="w-1/3"
        options={options}
        value={selectedOption}
        onChange={(option) => {
          if (option) {
            useStore.setState({ selectedCategory: option.value });
          }
        }}
      />
    </div>
  );
};

export default SearchPostsBar;
