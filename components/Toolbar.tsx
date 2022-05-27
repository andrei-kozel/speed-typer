import styles from "../styles/Toolbar.module.scss";
import Hidden from "./icons/Hidden";
import Refresh from "./icons/Refresh";
import Visible from "./icons/Visible";

type ToolbarType = {
  handleReset: () => void;
  handleVisibility: () => void;
  visible: boolean;
};

const Toolbar: React.FC<ToolbarType> = ({
  handleReset,
  handleVisibility,
  visible,
}) => {
  return (
    <div className={styles.container}>
      {visible ? (
        <Visible width={24} height={24} handleClick={handleVisibility} />
      ) : (
        <Hidden width={24} height={24} handleClick={handleVisibility} />
      )}
      <Refresh width={24} height={24} handleClick={handleReset} />
    </div>
  );
};

export default Toolbar;
