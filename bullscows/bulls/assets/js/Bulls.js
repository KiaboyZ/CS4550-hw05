import React, { useState, useEffect } from 'react';


function Bulls() {
  const [digits, setDigits] = useState(gen_digits());
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [guess, setGuess] = useState("");
  const [caption, setCaption] = useState("Try submitting a 4 digit number with no repeating values.");
  const [disabled, setDisabled] = useState(false);
  
  //based on https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
  function update_guess(input) {
    setGuess(input.target.value);
  }
  
  //based on https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
  function submit_guess() {
    event.preventDefault();
    var res;
    
    if (validate_guess()) {
      setGuesses(guesses.concat(guess));
      res = get_result();
      setResults(results.concat(res));
      setGuess("");
      
      if (res === "4B0C") {
        let msg = "YOU WIN: Secret number was " + digits + ". Press Reset to play again.";
        setCaption(msg);
        setDisabled(true);
        return;
      }
      
      if (results.length === 7) {
        let msg = "YOU LOSE: Secret number was " + digits + ". Press Reset to play again.";
        setCaption(msg);
        setDisabled(true);
        return;
      }
    }
  }
  
  function validate_guess() {
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    if (guess.length !== 4) {
      setCaption("ERROR: Guess must be 4 characters long.");
      return false;
    }
    
    for (let i = 0; i < 4; i++) {
      if (!numbers.includes(guess[i])) {
        setCaption("ERROR: Characters must be digits 0-9.");
        return false;
      }
      
      if (guess.lastIndexOf(guess[i]) !== i) {
        setCaption("ERROR: No duplicate characters allowed.");
        return false;
      }
    }
    
    if (guesses.includes(guess)) {
      setCaption("ERROR: Guesses can not be reused.");
      return false;
    }
    
    setCaption("Try submitting a 4 digit number with no repeating values.");
    return true;
  }
  
  function get_result() {
    var b = 0;
    var c = 0;
    for (let i = 0; i < 4; i++) {
      if (digits[i] === guess[i]) {
        b++;
      } else if (digits.includes(guess[i])) {
        c++;
      }
    }
    var r = b.toString() + "B" + c.toString() + "C";
    return r;
  }
  
  function reset_game() {
	  setDigits(gen_digits());
    setGuesses([]);
    setResults([]);
    setGuess("");
    setCaption("Try submitting a 4 digit number with no repeating values.");
    setDisabled(false);
  }
  
  return (
    <div className="Bulls">
      <body>
        <h1>Bulls and Cows</h1>
        <form>
          <table>
            <caption>{caption}</caption>
            <thead>
              <tr>
                <th><input type="text" maxlength="4" minlength="4" name="guess" onChange={update_guess} placeholder="####" value={guess} disabled={disabled} /></th>
                <th><input type="submit" onClick={submit_guess} value="Submit Guess" disabled={disabled} /></th>
                <th><input type="reset" onClick={reset_game} value="Reset"/></th>
              </tr>
              <br/><tr>
                <th></th>
                <th>Guess</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>{guesses[0]}</td>
                <td>{results[0]}</td>
              </tr>
              <tr>
                <th>2</th>
                <td>{guesses[1]}</td>
                <td>{results[1]}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>{guesses[2]}</td>
                <td>{results[2]}</td>
              </tr>
              <tr>
                <th>4</th>
                <td>{guesses[3]}</td>
                <td>{results[3]}</td>
              </tr>
              <tr>
                <th>5</th>
                <td>{guesses[4]}</td>
                <td>{results[4]}</td>
              </tr>
              <tr>
                <th>6</th>
                <td>{guesses[5]}</td>
                <td>{results[5]}</td>
              </tr>
              <tr>
                <th>7</th>
                <td>{guesses[6]}</td>
                <td>{results[6]}</td>
              </tr>
              <tr>
                <th>8</th>
                <td>{guesses[7]}</td>
                <td>{results[7]}</td>
              </tr>
            </tbody>
          </table>
        </form>
      </body>
    </div>
  );
}

// I am allowing the number to start with 0.
function gen_digits() {
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var digits = "";
  var random;

  while (digits.length < 4) {
    random = Math.floor(Math.random() * numbers.length);
    digits += numbers[random];
    numbers.splice(random, 1);
  }
  
  return digits;
}

useEffect(() => {
  cb_join(setState);
});

function makeGuess(guess) {
  cb_push(guess);
}

export default Bulls;
