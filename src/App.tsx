import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
//page components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'

import './App.css'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'

function App() {
  const [count, setCount] = useState(0)

  const {mode}:any = useTheme();

  return (
    <div className={`App ${mode}`}>
      <Navbar />
      <ThemeSelector />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/recipes/:id" element={<Recipe />}/>
      </Routes>
    </div>
  )
}

export default App
