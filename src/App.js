import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RandomGenerator } from './pages/RandomGenerator';
import { AnimeRecommendations } from './pages/AnimeRecommendations';
import { Search } from './pages/Search';
import { Anime } from './pages/Anime';
import { Manga } from './pages/Manga';
import './static/Global/global.css'
import { Top } from './pages/Top';
import { Index } from './pages/Index';
import { Character } from './pages/Character';


const App = () => {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/top-all' element={<Top />} />
          <Route path='/random-generator' element={<RandomGenerator />} />
          <Route path='/anime-recommendation' element={<AnimeRecommendations />} />
          <Route path='/search/:q' element={<Search  />}/>
          <Route path='/anime/:id' element={<Anime  />}/>
          <Route path='/manga/:id' element={<Manga  />}/>
          <Route path='/character/:id' element={<Character />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
