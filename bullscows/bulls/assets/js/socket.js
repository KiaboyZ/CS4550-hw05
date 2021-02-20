import {Socket} from "phoenix";

let socket = new Socket("/socket", {params: {token: ""}});
socket.connect();

let channel = socket.channel("game:1", {});

let state = {
  guesses: [],
  results: [],
  caption: "Try submitting a 4 digit number with no repeating values.",
  disabled: false
};

let callback = null;

function state_update(st) {
  console.log("New state", st);
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(ch) {
  console.log("ch_join: ", ch);
  callback = ch;
  callback(state);
}

export function ch_start() {
  console.log("STARTING");
  channel.push("start", {})
         .receive("ok", state_update)
         .receive("error", resp => { console.log("Unable to push start", resp) });
}

export function ch_guess(guess) {
  console.log("guess: ", guess);
  channel.push("guess", guess)
         .receive("ok", state_update)
         .receive("error", resp => { console.log("Unable to push guess", resp) });
}

channel.join()
       .receive("ok", state_update)
       .receive("error", resp => { console.log("Unable to join", resp) });

export default socket
