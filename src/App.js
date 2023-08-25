import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import DetailsPage from "./Components/DetailsPage/DetailsPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NewQuestion from "./Components/NewQuestion/NewQuestion";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="detailsPage/:id" element={<DetailsPage />}></Route>
            <Route path="new" element={<NewQuestion />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
