import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Dashboard from "../src/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
