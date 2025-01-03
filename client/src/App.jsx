import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Update from './components/Update'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>

  
      <Route path='/create'  element={<Create/>}/>
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
