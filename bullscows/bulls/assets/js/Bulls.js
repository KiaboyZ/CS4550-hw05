import React, { useState, useEffect } from 'react';
import { ch_join, ch_start, ch_guess } from './socket';


function Bulls() {
  const [state, setState] = useState({
    guesses: [],
    results: [],
    caption: "Try submitting a 4 digit number with no repeating values.",
    disabled: false
  });
  const [guess, setGuess] = useState("");
  
  useEffect(() => {
    ch_join(setState);
  }, []);

  function start_game() {
    ch_start();
    setGuess("");
  }
  
  function send_guess() {
    ch_guess({ letter: guess });
    setGuess("");
  }

  function update_guess(input) {
    setGuess(input.target.value);
  }
  
  return (
    <div className="Bulls" id="root">
        <h1>Bulls and Cows</h1>
        <form>
          <table>
            <caption>{state.caption}</caption>
            <thead>
              <tr>
                <th><input type="text" maxLength="4" minLength="4" name="guess" onChange={update_guess} placeholder="####" value={guess} disabled={state.disabled} /></th>
                <th><input type="submit" onClick={send_guess} value="Submit Guess" disabled={state.disabled} /></th>
                <th><input type="reset" onClick={start_game} value="Reset"/></th>
              </tr>
              <tr>
                <th></th>
                <th>Guess</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>{state.guesses[0]}</td>
                <td>{state.results[0]}</td>
              </tr>
              <tr>
                <th>2</th>
                <td>{state.guesses[1]}</td>
                <td>{state.results[1]}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>{state.guesses[2]}</td>
                <td>{state.results[2]}</td>
              </tr>
              <tr>
                <th>4</th>
                <td>{state.guesses[3]}</td>
                <td>{state.results[3]}</td>
              </tr>
              <tr>
                <th>5</th>
                <td>{state.guesses[4]}</td>
                <td>{state.results[4]}</td>
              </tr>
              <tr>
                <th>6</th>
                <td>{state.guesses[5]}</td>
                <td>{state.results[5]}</td>
              </tr>
              <tr>
                <th>7</th>
                <td>{state.guesses[6]}</td>
                <td>{state.results[6]}</td>
              </tr>
              <tr>
                <th>8</th>
                <td>{state.guesses[7]}</td>
                <td>{state.results[7]}</td>
              </tr>
            </tbody>
          </table>
        </form>
    </div>
  );
}


export default Bulls;
