interface ButtonStyle {
  text: string;
  backgroundColor: string;
  textColor: string;
}

interface Shop {
  title: string;
  user: string;
}

export enum ErrorMessages {
  LOAD_BOOKS = "Failed to load books",
}

export enum WarningMessages {
  MORE_THAN_ALLOWED = "It is not possible to order more books than are in stock",
  LESS_THAN_ALLOWED = "It is not possible to order less than 1 unit of the book",
  NO_MORE = "There are no more products left",
  LOGIN_SIZE = "Your username should contain between 4 and 16 characters",
}

export enum OptionType {
  ALL = "all",
  FROM_0_TO_15 = "from_0_to_15",
  FROM_15_TO_30 = "from_15_to_30",
  FROM_30 = "from_30",
}

export enum Router {
  HOME = "/",
  BOOKS = "/books",
  BOOK_DETAIL = ":bookId",
  CART = "/cart",
  SIGNIN = "/signin",
}

export enum SuccesMessages {
  PURCHASE_BOOKS = "Purchase was successful",
  ADD_BOOKS = "Comment added successfully",
}

export const SHOP: Shop = {
  title: "JS BAND STORE",
  user: "Vasyl Zinchenko",
};

export const Buttons: { [key: string]: ButtonStyle } = {
  ADD: {
    text: "Add to cart",
    backgroundColor: "#43b02a",
    textColor: "white",
  },
  SIGN_IN: {
    text: "Sign-In",
    backgroundColor: "#f0f0f0",
    textColor: "black",
  },
  SIGN_OUT: {
    text: "Sign-Out",
    backgroundColor: "#f0f0f0",
    textColor: "black",
  },
  VIEW: {
    text: "View",
    backgroundColor: "#f0f0f0",
    textColor: "black",
  },
  PROCEED: {
    text: "Proceed to checkout",
    backgroundColor: "#6ab02a",
    textColor: "white",
  },
  OK: {
    text: "Ok",
    textColor: "white",
    backgroundColor: "#43b02a",
  },
  PURCHASE: {
    text: "Purchase",
    textColor: "white",
    backgroundColor: "#43b02a",
  },
  PUT_BOOKS: {
    text: "Put some books",
    textColor: "white",
    backgroundColor: "#4895ff",
  },
};
