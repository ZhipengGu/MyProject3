import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import AboutMePage from "./pages/AboutMePage";
import SearchPage from "./pages/SearchPage";
import AddPostPage from "./pages/AddPostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SingleEventPage from "./pages/SingleEventPage";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./context/AppContextProvider";
import Loader from "./ui/Loader";
import { AnimatePresence } from "framer-motion";

function App() {
  const { user } = useContext(AppContext);
  const [loadingDisplay, setLoadingDisplay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDisplay(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <AnimatePresence>{loadingDisplay && <Loader />}</AnimatePresence>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            index
            element={<HomePage setLoadingDisplay={setLoadingDisplay} />}
          />
          <Route path="event/:eventId" element={<SingleEventPage />} />
          <Route path="map" element={<MapPage />} />
          <Route
            path="add"
            element={user ? <AddPostPage /> : <Navigate to="/login" />}
          />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="me"
            element={user ? <AboutMePage /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="signup"
            element={user ? <Navigate to="/me" /> : <SignupPage />}
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
