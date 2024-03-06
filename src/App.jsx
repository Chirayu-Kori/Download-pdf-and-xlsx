import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Download from "./components/Download";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-slate-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </div>
  );
};

export default App;
