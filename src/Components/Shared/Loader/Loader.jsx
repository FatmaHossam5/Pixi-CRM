import style from "./Loader.module.css";

const Loader = () => {
  return (
    <span className={`${style.loader} m-auto`}></span>

    // <div>
    //   <span className={`${style.loader} m-auto`}></span>
    // </div>
  );
};

export default Loader;