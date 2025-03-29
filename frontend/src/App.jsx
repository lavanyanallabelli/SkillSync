import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SkillCatalog from "./pages/SkillCatalog";

// import Quiz from "./pages/Quiz";

//import SessionScheduling from "./pages/SessionScheduling";
// import Safety from "./pages/Safety";
// import ReviewRating from "./pages/ReviewRating";
//import Messaging from "./pages/Messaging";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/profile/:userId?" element={<Profile />} />

        <Route path="/skills" element={<SkillCatalog />} />

        {/* <Route path="/sessions" element={<SessionScheduling />} /> */}
        {/* <Route path="/reviewRating" element={<ReviewRating />} />
        <Route path="/safety" element={<Safety />} />  */}
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        {/* <Route path="/messaging" element={<Messaging />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
