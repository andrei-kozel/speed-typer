import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Preview from "../components/Preview";
import Textarea from "../components/TextArea";
import Stats from "../components/Stats";
import Toolbar from "../components/Toolbar";
import styles from "../styles/Home.module.scss";
import axios from "axios";

type HomeProps = {
  text: string;
};

const URI = "https://api.quotable.io/random?minLength=200&maxLength=500";

const Home: NextPage<HomeProps> = (props) => {
  const [text, setText] = useState(props.text);
  const [inputText, setInputText] = useState("");
  const [timer, setTimer] = useState({
    started: false,
    sec: 0,
  });
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();
  const [visible, setVisible] = useState(true);

  const onInputChange = (str: string): void => {
    setInputText(str);
    timerSetup();

    const _correct = inputText
      .split("")
      .filter((s, i) => s.toLowerCase() === text[i].toLowerCase()).length;
    setStats({
      correct: _correct,
      incorrect: inputText.length - _correct,
      total: inputText.length,
    });
  };

  const timerSetup = (): void => {
    if (!timer.started) {
      setTimer({
        started: true,
        sec: 0,
      });
      setTimerInterval(
        setInterval(() => {
          setTimer((prev) => ({ ...prev, sec: prev.sec + 1 }));
        }, 1000)
      );
    }
  };

  const loadNewText = async (): Promise<void> => {
    const newText = await axios.get(URI);
    setText(newText.data.content);
  };

  const reset = (): void => {
    clearInterval(timerInterval);
    loadNewText();
    setInputText(() => "");
    setTimer(() => ({ started: false, sec: 0 }));
    setStats(() => ({
      correct: 0,
      incorrect: 0,
      total: 0,
    }));
  };

  const handleVisibility = (): void => {
    setVisible(!visible);
  };

  return (
    <div>
      <Head>
        <title>Speedy Typing App</title>
      </Head>

      <main className={styles.homeContainer}>
        <Toolbar
          handleReset={reset}
          visible={visible}
          handleVisibility={handleVisibility}
        />
        {visible && <Stats stats={stats} sec={timer.sec} />}
        <Preview text={text} inputText={inputText} />
        <Textarea inputText={inputText} onInputChange={onInputChange} />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const text = await axios.get(URI);

  return {
    props: {
      text: text.data.content,
    },
  };
};

export default Home;
