# inspired by Professor Tuck's lecture 07-phoenix notes
defmodule Bulls.Game do

    def validate_guess(state, guess) do
        if (String.length(guess) != 4) do
            %{state | caption: "ERROR: Guess must be 4 characters long." }
            false
        end

        if (not validate_loop(state, guess, 0)) do
            false
        end

        guess_list = String.graphemes(guess)
        unique_list = Enum.uniq(guess_list)
        if (Enum.count(unique_list) != 4) do
            %{state | caption: "ERROR: No duplicate characters allowed." }
            false
        end
        
        if (Enum.member?(state.guesses, guess)) do
            %{state | caption: "ERROR: No duplicate guesses allowed." }
            false
        end

        %{state | caption: "Try submitting a 4 digit number with no repeating values." }
        true
    end

    def validate_loop(state, guess, index) do
        numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

        if (index == 4) do
            true
        end

        current_char = String.at(guess, index)

        if (not Enum.member?(numbers, current_char)) do
            %{state | caption: "ERROR: Characters must be digits 0-9." }
            false
        end

        validate_loop(state, guess, index + 1)
    end

    def get_result(state, guess) do
        secret = state.secret
        get_result_loop(secret, guess, 0, 0, 0)
    end

    def get_result_loop(secret, guess, index, bulls, cows) do
        if (index == 4) do
            result = Integer.to_string(bulls) <> "B" <> Integer.to_string(cows) <> "C"
        end

        secret_at_i = String.at(secret, index)
        guess_at_i = String.at(guess, index)

        if (secret_at_i == guess_at_i) do
            get_result_loop(secret, guess, index + 1, bulls + 1, cows)
        end

        if (String.contains?(secret, guess_at_i)) do
            get_result_loop(secret, guess, index + 1, bulls, cows + 1)
        end

        get_result_loop(secret, guess, index + 1, bulls, cows)
    end

    def submit_guess(state, guess) do
        if (validate_guess(state, guess)) do
            %{state | guesses: Enum.concat(state.guesses, [guess]) }

            result = get_result(state, guess)
            %{state | results: Enum.concat(state.results, [result]) }

            if (result == "4B0C") do
                %{state | caption: "You won! Press Reset if you want to restart." }
                %{state | disabled: true }
            end

            if (Enum.count(state.guesses == 8)) do
                %{state | caption: "You lost. Press Reset if you want to restart." }
                %{state | disabled: true }
            end
        end
    end

    def random_secret() do
        numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        shuffled = Enum.shuffle(numbers)
        String.slice(Enum.join(shuffled), 0, 4)
    end

    def start() do
        %{
            secret: random_secret(),
            guesses: [],
            results: [],
            caption: "Try submitting a 4 digit number with no repeating values.",
            disabled: false
        }
    end

    def view(state) do
        %{
            guesses: state.guesses,
            results: state.results,
            caption: state.caption,
            disabled: state.disabled
        }
    end
end