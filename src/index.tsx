import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { BookProvider } from "./context/BooksContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <UserProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </UserProvider>
  </HashRouter>
);

reportWebVitals();
