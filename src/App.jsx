import Header from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Succulents from './pages/Succulents';
import HerbalPlants from './pages/HerbalPlants';
import Bonsai from './pages/Bonsai';
import FloweringPlants from './pages/FloweringPlants';
import AirPurifyingPlants from './pages/AirPurifyingPlants';
import Cactus from './pages/Cactus';
import HangingPlants from './pages/HangingPlants';


function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = {"/"} element={<Home/>} />
        <Route path="/succulents" element={<Succulents />} />
        <Route path="/herbal" element={<HerbalPlants />} />
        <Route path="/bonsai" element={<Bonsai />} />
        <Route path="/flowering" element={<FloweringPlants />} />
        <Route path="/air-purifying" element={<AirPurifyingPlants />} />
        <Route path="/cactus" element={<Cactus />} />
        <Route path="/hanging" element={<HangingPlants />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
