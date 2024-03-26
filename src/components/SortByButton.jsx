import { useDispatch } from "react-redux";
import { sortVideos } from "../../reduxReducers/suggestedVideoSlice";
const SortByButton = () =>{
    const dispatch = useDispatch();
    return(
        <select className="bg-zinc-700 p-1 rounded-lg shadow-md mr-4 text-gray-200" onChange={(e)=>{
            e.preventDefault();
            dispatch(sortVideos(e.target.value));
        }}>
        <option value="">Sort By</option>
        <option value="descViews">High to Low Views</option>
        <option value="asscViews">Low to High Views</option>
        </select>
    )
}
export default SortByButton;