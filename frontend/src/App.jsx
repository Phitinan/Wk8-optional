import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddEventPage from "./pages/AddEvevntPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import EventPage from "./pages/EventPage";
import EditPage from "./pages/EditPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user && user.token ? true : false;
  })


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signup"  />} />
            <Route path="/add-events" element={isAuthenticated ? <AddEventPage /> : <Navigate to="/signup" />} />
            <Route path="/events/:id" element={<EventPage isAuthenticated={isAuthenticated} />} />
            <Route path="/edit/:id" element={isAuthenticated ? <EditPage  /> : <Navigate to="/signup" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
