# inspired by Professor Tuck's lecture 07-phoenix notes
defmodule Bulls.Game do
    def new do
        %{
            secret: random_secret(),
            guesses: MapSet.new,
        }
    end

    def guess(state, digits) do
        %{state | guesses: MapSet.put(state.guesses, digits) }
    end

    def view(state) do
        word = state.secret
        |> String.graphemes
        |> Enum.map(fn x ->
            if MapSet.member?(state.guesses, x) do
                x
            else
                "____"
            end
        end)
        |> Enum.join("")

        %{
            word: view,
            guesses: MapSet.to_list(state.guesses)
        }

        %{
            word: word,
            guesses: MapSet.to_list(state.guesses)
        }
    end

    def random_secret do
        numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        shuffled = Enum.shuffle(numbers)
        secret = String.slice(Enum.join(shuffled), 0, 3)
    end
end