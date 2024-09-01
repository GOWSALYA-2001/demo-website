import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Navpage from "./components/Navpage.js";
import Homepgae from "./components/Homepgae.js";
import Clothespage from "./components/Clothespage.js";
import ProductDetailpage from "./components/ProductDetailpage.js";
import Adminpage from "./components/Adminpage.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js"

const isAuthenticated = true;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navpage />
              <Homepgae />
            </>
          }
        />
        <Route path="/clothespage" element={<Clothespage />} />
        <Route path="/product/:id" element={<ProductDetailpage />} />
    
        <Route
          path="/admin"
          element={isAuthenticated ? <Adminpage/> : <Navigate to="/signin" />}
        />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
