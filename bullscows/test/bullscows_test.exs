defmodule BullscowsTest do
  use ExUnit.Case
  doctest Bullscows

  test "greets the world" do
    assert Bullscows.hello() == :world
  end
end
