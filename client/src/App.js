import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./context/RequireAuth";
import VisitorAuth from "./context/VisitorRoute";
import NoAuth from "./context/NoAuth";
import { Layout } from "./Components/index";
import { Introduction } from "./Pages";
import {
  HDF,
  HDFormPage,
  Login,
  Main,
  Register,
  Vaccine,
  VaccineFormPage,
  QRScanner,
  UserQRSuccess,
  Result,
} from "./Pages/Authorized";
import {
  VisitorFormPage,
  VisitorMain,
  VisitorQR,
  VisitorQRSuccess,
} from "./Pages/Guest";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<NoAuth />}>
              <Route exact path="/" element={<Introduction />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Register />} />
              <Route
                exact
                path="/visitor/fillout"
                element={<VisitorFormPage />}
              />
            </Route>

            <Route element={<VisitorAuth />}>
              <Route exact path="/visitor/main" element={<VisitorMain />} />
              <Route exact path="/visitor/qr-scanner" element={<VisitorQR />} />
              <Route
                exact
                path="/visitor/qr-scanner/success"
                element={<VisitorQRSuccess />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route exact path="/main" element={<Main />} />
              <Route exact path="/hdf" element={<HDF />} />
              <Route exact path="/hdf/fillout" element={<HDFormPage />} />
              <Route exact path="/vaccine" element={<Vaccine />} />
              <Route
                exact
                path="/vaccine/update"
                element={<VaccineFormPage />}
              />
              <Route exact path="/qr-scanner" element={<QRScanner />} />
              <Route
                exact
                path="/qr-scanner/success"
                element={<UserQRSuccess />}
              />
              <Route exact path="/result" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
