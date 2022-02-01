import React, { useEffect, useState } from "react";
import styles from "./Meme.module.css";

const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        console.log(res.data);
        // let images = data.collection.items.filter(i => i.data.filter(d => d.media_type == 'image').length > 0)

        // _memes[i].box_count
        const _memes = res.data.memes;
        let images = [];
        for(let i = 0; i<_memes.length; i++)
        {
          if(_memes[i].box_count === 2)
          {
            images.push(_memes[i]);
          }
          //console.log(images);
        }
        shuffleMemes(images);
        setMemes(images);
      });
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div className={styles.container}>
      <button
        onClick={() => setMemeIndex(memeIndex + 1)}
        className={styles.button}
      >
        Next Template
      </button>
      {captions.map((c, index) => (
        <input
          onChange={(e) => updateCaption(e, index)}
          key={index}
          placeholder={`Text ${index}`}
        />
      ))}
      <img alt="meme" src={memes[memeIndex].url} />
    </div>
  ) : (
    <></>
  );
};

export default Meme;
