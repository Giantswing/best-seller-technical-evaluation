import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreCounter from "./pages/StoreCounter";
import Test from "./pages/Test";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreCounter />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
