import styles from "./styles/Shimmer.module.css";
const Shimmer = () => {
  return (
    <>
      {Array(18)
        .fill(" ")
        .map((element, index) => {
          return (
            <div id={styles.shimmerItem} key={index} className="w-dvw">
              <img />
              <h3></h3>
              <h5></h5>
              <h6></h6>
            </div>
          );
        })}
    </>
  );
};
export default Shimmer;
