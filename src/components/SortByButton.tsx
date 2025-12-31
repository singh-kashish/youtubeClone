import { useDispatch, useSelector } from "react-redux";
import { typeOfList } from "../types/VideoLoadTypes";
import { changeDisplayList } from "../../reduxReducers/suggestedVideoSlice";
import { rootState } from "../../store";
import { useState, useEffect } from "react";

interface Props {
  setSortOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortByButton: React.FC<Props> = ({ setSortOrder }) => {
  const dispatch = useDispatch();
  const displayList = useSelector(
    (state: rootState) => state.suggestedVideo.displayList
  );

  const [selectedValue, setSelectedValue] = useState(displayList);

  const changeFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as typeOfList;
    setSelectedValue(value);

    switch (value) {
      case "viewCount_desc":
        setSortOrder(false);
        break;
      case "viewCount_asc":
        setSortOrder(true);
        break;
      case "created_at_desc":
        setSortOrder(false);
        break;
      case "created_at_asc":
        setSortOrder(true);
        break;
      case "likes_desc":
        setSortOrder(false);
        break;
    }

    dispatch(changeDisplayList(value));
  };

  useEffect(() => {
    setSelectedValue(displayList);
  }, [displayList]);

  return (
    <select value={selectedValue} onChange={changeFunction} className="bg-slate-800 text-white w-1/6">
      <option value="id">Sort By</option>
      <option value="viewCount_desc">High to Low Views</option>
      <option value="viewCount_asc">Low to High Views</option>
      <option value="created_at_desc">Recent</option>
      <option value="created_at_asc">Older</option>
      <option value="likes_desc">More Likes</option>
    </select>
  );
};

export default SortByButton;
