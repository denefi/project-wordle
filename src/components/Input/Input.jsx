import { useState } from 'react';

function Input({ submitGuess }) {
    const [wordInput, setWordInput] = useState('');
    return (
        <form
            className="guess-input-wrapper"
            onSubmit={(event) => {
                event.preventDefault();
                if (/[a-zA-Z]{5}/.test(wordInput)) {
                    submitGuess(wordInput);
                    setWordInput('');
                    return;
                }
                alert('Input must be 5 characters');
            }}
        >
            <label htmlFor="guess-input">Submit Guess</label>
            <input
                id="guess-input"
                type="text"
                value={wordInput}
                onChange={(event) => setWordInput(event.target.value.toUpperCase())}
                required
                maxLength={5}
                minLength={5}
            />
        </form>
    );
}

export default Input;
