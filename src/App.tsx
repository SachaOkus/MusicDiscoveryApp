import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated for React Router v6
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import TrackDetails from "./components/Track/TrackDetails"; // Ensure this is the correct import

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {" "}
        {/* Routes replaces Switch in React Router v6 */}
        <Route path="/" element={<Home />} />{" "}
        {/* Use element instead of component */}
        <Route path="/discover" element={<Discover />} />
        <Route path="/track/:id" element={<TrackDetails />} />{" "}
        {/* Make sure TrackDetails is correctly exported */}
      </Routes>
    </Router>
  );
};

export default App;
