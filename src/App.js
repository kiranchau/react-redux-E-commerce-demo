import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/Cart";
import CardDetails from "./components/CardDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </>
  );
}

export default App;
