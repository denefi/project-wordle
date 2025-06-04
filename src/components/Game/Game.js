import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import Input from '../Input/Input';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils';
import { checkGuess } from '../../game-helpers';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
const emptyGuessList = range(NUM_OF_GUESSES_ALLOWED).map(() => {
    return {
        key: Math.random(),
        guess: range(5).map(() => {
            return { key: Math.random(), char: '', status: '' };
        }),
    };
});
console.log(emptyGuessList);

function Game() {
    const [numOfGuess, setNumOfGuess] = useState(0);
    const [guessList, setGuessList] = useState(emptyGuessList);
    const [gameResult, setGameResult] = useState('unfinished');
    function submitGuess(input) {
        if (gameResult !== 'unfinished') {
            return;
        }
        console.log('guess', input);
        console.log(input === answer);
        const nxtGuessList = [...guessList];
        checkGuess(input, answer).forEach(({ letter, status }, index) => {
            nxtGuessList[numOfGuess].guess[index].char = letter;
            nxtGuessList[numOfGuess].guess[index].status = status;
        });
        setGuessList(nxtGuessList);
        if (input === answer) {
            setGameResult('win');
            return;
        }
        const nextNumOfGuess = numOfGuess + 1;
        setNumOfGuess(nextNumOfGuess);
        if (nextNumOfGuess === NUM_OF_GUESSES_ALLOWED) {
            setGameResult('loose');
        }
    }
    return (
        <>
            <div className="guess-results">
                {guessList.map(({ guess, key }) => (
                    <p className="guess" key={key}>
                        {guess.map(({ char, key, status }) => (
                            <span key={key} className={`cell ${status}`}>
                                {char}
                            </span>
                        ))}
                    </p>
                ))}
            </div>
            <Input submitGuess={submitGuess}></Input>
            {gameResult === 'win' && (
                <div className="happy banner">
                    <p>
                        <strong>Congratulations!</strong> Got it in
                        <strong>{numOfGuess} guesses</strong>.
                    </p>
                </div>
            )}
            {gameResult === 'lose' && (
                <div className="sad banner">
                    <p>
                        Sorry, the correct answer is <strong>{answer}</strong>.
                    </p>
                </div>
            )}
        </>
    );
}

export default Game;
