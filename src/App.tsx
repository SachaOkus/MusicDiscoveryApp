import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import TrackDetails from "./components/Track/TrackDetails";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/track/:id" element={<TrackDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
