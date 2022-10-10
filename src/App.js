import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Index } from './pages/Index';
import { RandomGenerator } from './components/RandomGenerator';
import { AnimeRecommendations } from './components/AnimeRecommendations';
import { Search } from './components/Search';
import { Anime } from './pages/Anime';
import { Manga } from './pages/Manga';


const App = () => {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/random-generator' element={<RandomGenerator />} />
          <Route path='/anime-recommendation' element={<AnimeRecommendations />} />
          <Route path='/search/:q' element={<Search  />}/>
          <Route path='/anime/:id' element={<Anime  />}/>
          <Route path='/manga/:id' element={<Manga  />}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
