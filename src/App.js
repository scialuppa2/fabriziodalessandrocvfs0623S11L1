import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainSearch from "./components/MainSearch";
import CompanySearchResults from "./components/CompanySearchResults";
import FavoritesPage from "./components/FavoritesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/:company" element={<CompanySearchResults />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
