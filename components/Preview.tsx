import { NextPage } from "next";
import styles from "../styles/Preview.module.scss";

type PreviewProps = {
  text: string;
  inputText: string;
};

const Preview: React.FC<PreviewProps> = ({ text, inputText }) => {
  const arrText = text.split("");
  const arrInputText = inputText.split("");

  return (
    <div className={styles.container}>
      {arrText.map((char, index) => {
        if (index < arrInputText.length) {
          if (arrInputText[index].toLowerCase() === char.toLowerCase()) {
            return (
              <span key={index} className={styles.correct}>
                {char}
              </span>
            );
          } else {
            return (
              <span key={index} className={styles.incorrect}>
                {char}
              </span>
            );
          }
        } else {
          return <span key={index}>{char}</span>;
        }
      })}
    </div>
  );
};

export default Preview;
