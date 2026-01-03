import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPagination,
  setSortBy,
} from "../../reduxReducers/suggestedVideoSlice";
import { rootState } from "../../store";

const SortByButton = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(
    (state: rootState) => state.suggestedVideo.sortBy
  );

  const handleChange = (value: any) => {
    dispatch(resetPagination());
    dispatch(setSortBy(value));
  };

  return (
    <select
      value={sortBy}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-black text-white px-3 py-1 rounded"
    >
      <option value="recent">Recent</option>
      <option value="older">Older</option>
      <option value="high">High → Low</option>
      <option value="low">Low → High</option>
    </select>
  );
};

export default SortByButton;
