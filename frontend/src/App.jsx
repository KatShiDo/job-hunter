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
import HasCompanyRoute from "./components/private_routes/HasCompanyRoute";
import AdminRoute from "./components/private_routes/AdminRoute";
import CreateJob from "./pages/CreateJob";
import CreateCv from "./pages/CreateCv";
import Cv from "./pages/Cv";
import refresh from "./components/utils/axios_requests/auth/refresh";
import { useDispatch } from "react-redux";
import CreateCompany from "./pages/CreateCompany";
import NotAuthRoute from "./components/private_routes/NotAuthRoute";
import HasNotCompanyRoute from "./components/private_routes/HasNotCompanyRoute";
import Cookies from "js-cookie";

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
        <Route path="/about" element={<About />} />

        <Route element={<NotAuthRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route element={<HasCompanyRoute />}>
            <Route path="/job/create" element={<CreateJob />} />
          </Route>

          <Route element={<HasNotCompanyRoute />}>
            <Route path="/company/create" element={<CreateCompany />} />
            <Route path="/cvs" element={<Cvs />} />
            <Route path="/cvs/create" element={<CreateCv />} />
            <Route path="/cvs/:cvId" element={<Cv />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
