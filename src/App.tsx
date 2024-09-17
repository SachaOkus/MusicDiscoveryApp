import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import TrackDetails from "./components/Track/TrackDetails";

const App = () => {
  return (
    <BrowserRouter basename="/MusicDiscoveryApp/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/track/:id" element={<TrackDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
