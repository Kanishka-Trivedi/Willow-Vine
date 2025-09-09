import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; 
import Home from './pages/Home';
import Succulents from './pages/Succulents';
import HerbalPlants from './pages/HerbalPlants';
import Bonsai from './pages/Bonsai';
import FloweringPlants from './pages/FloweringPlants';
import AirPurifyingPlants from './pages/AirPurifyingPlants';
import Cactus from './pages/Cactus';
import HangingPlants from './pages/HangingPlants';
import Ornamental from './pages/Ornamental';
import ClimbersAndCreepers from './pages/ClimbersAndCreepers';
import FruitPlants from './pages/FruitPlants';
import VegetablePlants from './pages/VegetablePlants';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main application routes with Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/succulents" element={<Succulents />} />
          <Route path="/herbal" element={<HerbalPlants />} />
          <Route path="/bonsai" element={<Bonsai />} />
          <Route path="/flowering" element={<FloweringPlants />} />
          <Route path="/air-purifying" element={<AirPurifyingPlants />} />
          <Route path="/cactus" element={<Cactus />} />
          <Route path="/hanging" element={<HangingPlants />} />
          <Route path="/ornamental" element={<Ornamental />} />
          <Route path="/climbers" element={<ClimbersAndCreepers />} />
          <Route path="/fruit-plants" element={<FruitPlants />} />
          <Route path="/vegetable-plants" element={<VegetablePlants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
