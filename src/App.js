import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RandomGenerator } from './pages/RandomGenerator';
import { ThisSeason } from './pages/ThisSeason';
import { Search } from './pages/Search';
import { Anime } from './pages/Anime';
import { Manga } from './pages/Manga';
import './static/Global/global.css'
import { Top } from './pages/Top';
import { Index } from './pages/Index';
import { Character } from './pages/Character';
import { NoSeacrhPage } from './pages/NoSeacrhPage';
import { Schedule } from './pages/Schedule';
import { RankingPage } from './pages/RankingPage'
import { CurrentPath } from './components/CurrentPath';
import { NotFoundPage } from './pages/NotFoundPage';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Favorite } from './pages/Favorite';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      color: mode('#000000', '#FAFAFA')(props),
      bg: mode('#FAFAFA', '#121212')(props),
      lineHeight: 'base',
      fontWeight: 'semibold'
    },
  }),
};

const components = {
  Button: {
    variants: {
      solid: props => ({
        bg: mode('yellow', 'yellow')(props),
        color: 'black'
      }),
    },
    defaultProps: {
      size: ['xs', 'xs', 'md', 'md'],
      variant: 'solid',
    },
  },
  Drawer : {
    baseStyle: props => ({
      dialog: {
        bg: mode('#FAFAFA', '#121212')(props),
        color: mode('#121212', '#FAFAFA')(props)
      },
    }),
  },
};

const theme = extendTheme({
  components,
  styles,
});


const App = () => {

  return (
    <ChakraProvider theme={theme} >
      <BrowserRouter>
        <NavBar />
        <CurrentPath />
        <Routes>
          <Route path='/' element={<Index />} exact />
          <Route path='/ranking' element={<Top />} />
          <Route path='/random-generator' element={<RandomGenerator />} />
          <Route path='/this-season' element={<ThisSeason />} />
          <Route path='/search' element={<NoSeacrhPage />} />
          <Route path='/search/:q' element={<Search />} />
          <Route path='/anime/:id' element={<Anime />} />
          <Route path='/manga/:id' element={<Manga />} />
          <Route path='/character/:id' element={<Character />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/ranking/:category' element={<RankingPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/favorites' element={<Favorite />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
