import styles from "../styles/Stats.module.scss";

type Statstype = {
  stats: {
    correct: number;
    incorrect: number;
    total: number;
  };
  sec: number;
};

const Stats: React.FC<Statstype> = ({ stats, sec }) => {
  const { correct, incorrect, total } = stats;

  // Gross, or Raw WPM (Words Per Minute) is a calculation of exactly how fast you type with no error penalties.
  const getGrossWPM = (): number => {
    return correct / 5 / (sec / 60);
  };

  // Net WPM (Words Per Minute) is a calculation of exactly how fast you type with error penalties.
  const getNetWPM = (): number => {
    const result = (total / 5 - incorrect) / (sec / 60);
    return result > 0 ? result : 0;
  };

  return (
    <div className={styles.container}>
      <p>GrossWPM: {sec || sec > 0 ? Math.round(getGrossWPM()) : "0"}</p>
      <p>NetWPM: {sec || sec > 0 ? Math.round(getNetWPM()) : "0"}</p>
      <p>Time: {sec}s</p>
    </div>
  );
};

export default Stats;
