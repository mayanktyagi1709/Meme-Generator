import React, { useEffect, useState } from "react";
import styles from "./Meme.module.css";

const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [topDrag, setTopDrag] = useState(false);
  const [bottomDrag, setBottomDrag] = useState(false);
  const [topX, setTopX] = useState("10%");
  const [topY, setTopY] = useState("20%");
  const [bottomX, setBottomX] = useState("50%");
  const [bottomY, setBottomY] = useState("90%");

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const topTextChange = (event) => {
    setTopText(event.target.value);
  };
  const bottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        console.log(res.data);
        const _memes = res.data.memes;
        let images = [];
        for (let i = 0; i < _memes.length; i++) {
          if (_memes[i].box_count === 2) {
            images.push(_memes[i]);
          }
        }
        shuffleMemes(images);
        setMemes(images);
      });
    });
  }, []);

  const handleClick = () =>
  {
    setMemeIndex(memeIndex + 1)
    setTopText("");
    setBottomText("");
  }

  return memes.length ? (
    <div className={styles.container}>
      <button
        onClick={handleClick}
        className={styles.button}
      >
        Next Template
      </button>

      <input
        type="text"
        onChange={topTextChange}
        // key={index}
        value={topText}
        placeholder="Top Text"
      />
      <input
        type="text"
        onChange={bottomTextChange}
        // key={index}
        value={bottomText}
        placeholder="Bottom Text"
      />
      <div className = {styles.meme}>
        <img alt="meme" src={memes[memeIndex].url} />
        <h2 className={styles.top}>{topText}</h2>
        <h2 className={styles.bottom}>{bottomText}</h2>

      </div>
    </div>
  ) : (
    <></>
  );
};

export default Meme;
