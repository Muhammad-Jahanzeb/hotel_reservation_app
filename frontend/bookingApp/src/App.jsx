
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Lists from './Pages/List/Lists'
import Hotel from './Pages/Hotel/Hotel'
import Login from './Pages/Login/Login'


function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<Lists/>}/>
        <Route path ='/hotel/:id' element={<Hotel/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
