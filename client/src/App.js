import React from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import TravelsDetails from "./TravelsDetails";
import EditTravel from "./EditTravel";
import AddTravel from "./AddTravel";
import ListUsers from "./ListUsers";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/add" element={<AddTravel />} />
        <Route path="/home/:id" element={<TravelsDetails />} />
        <Route path="/home/edit/:id" element={<EditTravel />} />
        <Route path="/users" element={<ListUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
