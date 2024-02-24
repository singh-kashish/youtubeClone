const VideoShimmer = () => {
  return (
    <div className="flex h-screen w-full text-transparent m-1">
      <div className="flex-col w-3/4">
        <div className=" h-2/3" id="shimmerItem"></div>
        <div
          className="flex items-center mt-1 justify-start ml-2"
          id="shimerItem"
        >
          <p
            className=" w-32 h-32"
            id="shimmerItem"
            style={{ borderRadius: "70px" }}
          >
            a
          </p>
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
  );
};
export default VideoShimmer;
