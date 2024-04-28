import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cvs from "./pages/Cvs";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/cvs" element={<Cvs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
