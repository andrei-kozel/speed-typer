import styles from "../styles/TextArea.module.scss";

type TextAreaProps = {
  inputText: string;
  onInputChange: (str: string) => void;
};

const Textarea: React.FC<TextAreaProps> = ({ inputText, onInputChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onInputChange(e.target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={inputText}
      onChange={handleChange}
      placeholder="Start typing ..."
      rows={5}
    />
  );
};

export default Textarea;
