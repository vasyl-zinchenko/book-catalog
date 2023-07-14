import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BookDetailActions } from "./components/BookDetail/BookDetailActions";
import userEvent from "@testing-library/user-event";
import type { Book } from "./types/books";

describe("Price сounter", () => {
  const book = {
    id: 1,
    price: 20,
  };
  let mockSetCount;
  let mockSetIsOpenCartModal;

  beforeEach(() => {
    mockSetCount = jest.fn();
    mockSetIsOpenCartModal = jest.fn();
    render(
      <BookDetailActions
        currentBook={book as Book}
        count={1}
        setCount={mockSetCount}
        setIsOpenCartModal={mockSetIsOpenCartModal}
      />
    );
  });

  it("should increase by 1", async () => {
    const increaseButton = screen.getByText("▲");
    const basicCounter = screen.getByRole("spinbutton");

    userEvent.click(increaseButton);

    await waitFor(() => {
      expect(basicCounter).toHaveValue(2);
    });
  });

  it("should decrease by 1", async () => {
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
    const decreaseButton = screen.getByText("▼");
    const basicCounter = screen.getByRole("spinbutton");

    userEvent.click(decreaseButton);
    expect(basicCounter).toHaveValue(1);
  });

  it("should not increase to more than the stock count", async () => {
    const stockCount = Number(screen.getByTestId("stock"));
    const increaseButton = screen.getByText("▲");
    const basicCounter = screen.getByRole("spinbutton");

    for (let i = 1; i <= stockCount; i++) {
      userEvent.click(increaseButton);
      await waitFor(() => {
        expect(basicCounter).toHaveValue(i < stockCount ? i + 1 : stockCount);
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
    let mockSetCount;
    let mockSetIsOpenCartModal;

    beforeEach(() => {
      mockSetCount = jest.fn();
      mockSetIsOpenCartModal = jest.fn();
      render(
        <BookDetailActions
          currentBook={book as Book}
          count={1}
          setCount={mockSetCount}
          setIsOpenCartModal={mockSetIsOpenCartModal}
        />
      );
    });

    it(`correctly calculates the total price based on the input value ${countValue}`, async () => {
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
