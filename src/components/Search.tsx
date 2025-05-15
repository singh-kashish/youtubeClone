import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { MouseEventHandler } from "react";
import styles from "./styles/Search.module.css";
type SearchProps = {
  handleSubmit: Function;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  where: string;
};
function Search({
  handleSubmit,
  searchText,
  setSearchText,
  where,
}: SearchProps) {
  return (
    <div
      className={` ${
        where === "header"
          ? "hidden xl:flex items-center justify-between max-w-fit"
          : ""
      } ${
        where === "leftHeader"
          ? "flex m-2 items-center justify-start w-full lg:hidden"
          : "flex"
      }`}
    >
      <form
        className="flex flex-2 w-full items-center jutify-between space-x-2 rounded-full border focus-within:bg-[#291f2b] focus-within:border-blue-400 xl:border-[#141414] px-0 py-0"
        onSubmit={(e: any) => {
          handleSubmit(e);
        }}
      >
        <div className="w-[90%]">
          <input
            type="text"
            placeholder="Search by hitting enter or the searchIcon on right"
            className={styles.input}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button type="submit" hidden />
        </div>
        <div
          onClick={(e) => {
            handleSubmit(e);
          }}
          id={styles.searchDiv}
          className="shadow-md hover:cursor-pointer px-0 py-[7px] mt-0 no-underline rounded-r-full"
        >
          <SearchRoundedIcon
            id={styles.search}
            className="py-1  mr-0 no-underline rounded-full"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </div>
      </form>
      <MicRoundedIcon className={styles.mic} />
    </div>
  );
}
export default Search;
