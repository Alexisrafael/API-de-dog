import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import DogDetail from './Component/DogDetail';
import CreateDog from './Component/CreateDog'
import Landingpage from './Component/LandingPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Landingpage/>}/>
        <Route path='/dog' element={<CreateDog/>}/>
        <Route path='/dogs' element={<Home/>}/>
        <Route path='/dogs/:id' element={<DogDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
