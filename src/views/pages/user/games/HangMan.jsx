import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Header from '../../components/HangMan/Header';
// import Footer from './components/Footer';
import Figure from '../../components/HangMan/Figure';
import WrongLetters from '../../components/HangMan/WrongLetters';
import Word from '../../components/HangMan/Word';

import { animals } from '../../components/HangMan/words/Animals';
import { fruits } from '../../components/HangMan/words/Fruits';
import { things } from '../../components/HangMan/words/Things';
import { colors } from '../../components/HangMan/words/Colors';
import { countries } from '../../components/HangMan/words/Countries';

import '../../../../assets/styles/css/hang-man/HangMan.css';

const topicsList = ['animals', 'fruits', 'things', 'colors', 'countries'];
const wordsList = [animals, fruits, things, colors, countries];

let randomF = Math.floor(Math.random() * topicsList.length);

let topic = topicsList[randomF];
let words = wordsList[randomF];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let previousWord = selectedWord;

function HangMan() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  // console.log(selectedWord)

  const youChoked = () => {
    swal({
      text: 'You have already entered this letter!',
      buttons: false,
      timer: 600
    })
  }

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) setCorrectLetters(currentLetters => [...currentLetters, letter]);
          else youChoked()
        }
        else {
          if (!wrongLetters.includes(letter)) setWrongLetters(currentLetters => [...currentLetters, letter]);
          else youChoked()
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [correctLetters, wrongLetters, playable]);

  const youWin = () => {
    swal("The word is: " + previousWord, {
      title: 'Congratulations! You won!',
      icon: 'success'
    }).then(() => {
      previousWord = selectedWord;
      setPlayable(true)
    })
  }

  const youLose = () => {
    swal("The word is: " + previousWord, {
      title: 'Unfortunately you lost...',
      icon: 'error'
    }).then(() => {
      previousWord = selectedWord;
      setPlayable(true)
    })
  }

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    // selectedWord = words[Math.floor(Math.random() * words.length)];
    randomF = Math.floor(Math.random() * topicsList.length);

    topic = topicsList[randomF];
    words = wordsList[randomF];
    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  const checkWinOrLose = (correct, wrong, word) => {
    let status = 'win';
    word.split('').forEach(letter => {if (!correct.includes(letter)) status = ''})
    if (wrong.length === 7) status = 'lose';
    return status;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const status = checkWinOrLose(correctLetters, wrongLetters, selectedWord);
    let play = true;
    if (status === 'win' || status === 'lose') play = false

    if (play === false) {
      playAgain();
      setPlayable(false)
      if (status === 'win') youWin();
      else youLose();
    }
  })

  return (
    <div>
      <Header livesLeft={7 - wrongLetters.length} topic={topic}/>
      <div className="game-container">
        <div className='Hmm'>
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
        </div>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HangMan;
