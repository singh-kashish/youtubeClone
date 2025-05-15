import { useDispatch } from "react-redux";
import { typeOfList } from "../types/VideoLoadTypes";
import { loadVideos, changeDisplayList } from "../../reduxReducers/suggestedVideoSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../store";

interface sortByVideoProps {
  className?: string;
  setSortOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortByButton: React.FunctionComponent<sortByVideoProps> = ({
  className,
  setSortOrder,
}) => {
  const dispatch = useDispatch();
  const displayListType:typeOfList = useSelector((store:rootState)=>store.suggestedVideo.displayList);
  const [selectedValue, setSelectedValue] = useState(displayListType || "Sort By"||"viewCount_true"||"viewCount_false"||"likes"||"created_at"||"created_at_old");
  const changeFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedValue(value);

    switch (value) {
      case "viewCount_true":
        dispatch(changeDisplayList("viewCount"));
        setSortOrder(false);
        break;
      case "viewCount_false":
        dispatch(changeDisplayList("viewCount"));
        setSortOrder(true);
        break;
      case "likes":
        dispatch(changeDisplayList("likes"));
        setSortOrder(true);
        break;
      case "created_at":
        dispatch(changeDisplayList("created_at"));
        setSortOrder(false);
        break;
      case "created_at_old":
        dispatch(changeDisplayList("created_at"));
        setSortOrder(true);
        break;
      default:
        console.warn("Unexpected value:", value);
    }
  };

  useEffect(() => {
    // Any side effects based on selectedValue can be handled here
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <select
      className="{`${className} bg-zinc-700 p-1 rounded-lg shadow-md mr-4 text-gray-200`}"
      onChange={changeFunction}
      value={selectedValue}
    >
      <option value="id">Sort By</option>
      <option value="viewCount_true">High to Low Views</option>
      <option value="viewCount_false">Low to High Views</option>
      <option value="created_at">Recent</option>
      <option value="likes">More Likes</option>
      <option value="created_at_old">Older</option>
    </select>
  );
};

export default SortByButton;