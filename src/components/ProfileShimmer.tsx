function ProfileShimmer() {
  return (
    <div className="flex h-full w-full text-transparent">
      <div className="h-full">
        <div id="shimmerItem">
          <div
            id="shimmerItem"
            className="bg-zinc-900 min-w-full px-6 py-2 flex items-start"
          >
            <img className="w-20 h-20 rounded-full border-gray-800 border" />
            <div id="shimmerItem" className="flex flex-col mt-2">
              <h1 className="text-gray-800" id="shimmerItem">
                Default Name
              </h1>
              <h1 className="text-gray-500" id="shimmerItem">
                @{" "}
              </h1>
              <h1 className="text-gray-400" id="shimmerItem">
                ? Subscribers
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1
            className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-teal-300 my-1 pb-1"
            id="shimmerItem"
          >
            Videos by @
          </h1>
          <div className="flex items-start justify-start w-full h-full flex-wrap space-y-2 space-x-1">
            {Array(10)
              .fill("")
              .map((e, index) => (
                <h1
                  key={index}
                  id="shimmerItem"
                  className="h-[220px] w-[280px]"
                >
                  !
                </h1>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  {
    /* <div className="flex-col w-full">
        <div className=" h-1/6" id="shimmerItem"></div>
        <div
          className="flex items-center mt-1 justify-start ml-2"
          id="shimerItem"
        >
          <img className=" w-32 h-32 rounded-full" id="shimmerItem" />
          <div className="flex items-between justify-between w-2/3 ml-7">
            {Array(5)
              .fill("")
              .map((e, index) => (
                <h1 key={index} id="shimmerItem" className="w-[80px]">
                  !
                </h1>
              ))}
          </div>
        </div>
      </div>
      <div className="w-1/4 flex-col">
        <div className="flex-col items-between justify-between h-full">
          {Array(3)
            .fill("")
            .map((e, index) => (
              <h1 key={index} id="shimmerItem" className="w-full h-1/3 m-1">
                !
              </h1>
            ))}
        </div>
      </div>
    </div>
  ); */
  }
}
export default ProfileShimmer;
