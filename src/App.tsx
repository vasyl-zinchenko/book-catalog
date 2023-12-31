import "./App.css";

import { SignIn } from "./pages/SignIn";
import { BooksList } from "./pages/BookList";
import { Cart } from "./pages/Cart";
import { BookDetail } from "./pages/BookDetail";
import { Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";

import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./utils/PrivateRoute";
import { Footer } from "./components/layout/Footer";
import { NotFound } from "./pages/NotFound";
import { Router } from "./types/enums";
<link
  rel='stylesheet'
  href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
></link>;

function App() {
  return (
    <>
      <Header />
      <div className='App'>
        <div className='container'>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='*' element={<NotFound />} />
              <Route
                path={Router.HOME}
                element={<Navigate to={Router.BOOKS} replace />}
              />
              <Route path={Router.BOOKS}>
                <Route index element={<BooksList />} />
                <Route path={Router.BOOK_DETAIL} element={<BookDetail />} />
              </Route>
              <Route path={Router.CART} element={<Cart />} />
            </Route>
            <Route path={Router.SIGNIN} element={<SignIn />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
