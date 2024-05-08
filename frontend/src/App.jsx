import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cvs from "./pages/Cvs";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./components/private_routes/AuthRoute";
import CompanyRoute from "./components/private_routes/CompanyRoute";
import AdminRoute from "./components/private_routes/AdminRoute";
import CreateJob from "./pages/CreateJob";
import CreateCv from "./pages/CreateCv";
import Cv from "./pages/Cv";
import refresh from "./components/utils/axios_requests/auth/refresh";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    refresh(dispatch);
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cvs" element={<Cvs />}>
            <Route path="create" element={<CreateCv />} />
            <Route path=":cvId" element={<Cv />} />
          </Route>
        </Route>
        <Route element={<CompanyRoute />}>
          <Route path="/create-job" element={<CreateJob />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
