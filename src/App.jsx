import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3b82f6] animate-spin"></div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;