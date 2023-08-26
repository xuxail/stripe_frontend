import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./components/Subscription";
import Subscriptionsuccess from "./components/Subscriptionsuccess";
import Home from "./components/Home";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-100 flex flex-col">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/subscription/success" element={<Subscriptionsuccess />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
