import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PriceCounter } from "./components/PriceCounter";
import { BookDetailActions } from "./components/BookDetail/BookDetailActions";
import userEvent from "@testing-library/user-event";
import type { Book } from "./types/books";

describe("PriceCounter", () => {
  const setCount = jest.fn();

  it("should increase by 1", async () => {
    render(<PriceCounter setCount={setCount} />);
    const increaseButton = screen.getByText("▲");
    const basicCounter = screen.getByRole("spinbutton");

    userEvent.click(increaseButton);

    await waitFor(() => {
      expect(basicCounter).toHaveValue(2);
    });
  });

  it("should decrease by 1", async () => {
    render(<PriceCounter setCount={setCount} />);
    const increaseButton = screen.getByText("▲");
    const decreaseButton = screen.getByText("▼");
    const basicCounter = screen.getByRole("spinbutton");

    userEvent.click(increaseButton);
    userEvent.click(decreaseButton);

    await waitFor(() => {
      expect(basicCounter).toHaveValue(1);
    });
  });

  it("should not decrease to less than 1", () => {
    render(<PriceCounter setCount={setCount} />);
    const decreaseButton = screen.getByText("▼");
    const basicCounter = screen.getByRole("spinbutton");

    userEvent.click(decreaseButton);
    expect(basicCounter).toHaveValue(1);
  });

  it("should not increase to more than 42", async () => {
    render(<PriceCounter setCount={setCount} />);
    const increaseButton = screen.getByText("▲");
    const basicCounter = screen.getByRole("spinbutton");

    for (let i = 1; i <= 42; i++) {
      userEvent.click(increaseButton);
      await waitFor(() => {
        expect(basicCounter).toHaveValue(i <= 41 ? i + 1 : 42);
      });
    }
  });
});

describe.each([2, 5, 10])(
  "Calculation of total price with different count values",
  (countValue) => {
    const book = {
      id: 1,
      price: 20,
    };

    it(`correctly calculates the total price based on the input value ${countValue}`, async () => {
      render(
        <BookDetailActions
          currentBook={book as Book}
          count={1}
          setCount={() => {}}
          setIsOpenCartModal={() => {}}
        />
      );

      const countInput = screen.getByTestId("input-price-counter");
      const totalPriceElement = screen.getByTestId("total-price-element");

      fireEvent.change(countInput, {
        target: { value: countValue.toString() },
      });

      await waitFor(() => {
        expect(totalPriceElement).toHaveTextContent(
          (book.price * countValue).toString()
        );
      });
    });
  }
);
