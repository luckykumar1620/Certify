import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import IssueCertificate from './pages/IssueCertificate'
import Verify from './pages/Verify'
import RegisterInsttuions from './pages/RegisterInsttuions'
import Institutions from './pages/Institutions'



function App() {
 

  return (
    <Router>
      <Navbar/>
     
      <Routes>
        <Route path="/" element={<Home/>}/> 
         <Route path="/issue" element={<IssueCertificate/>} />
         <Route path="/verify" element={<Verify/>}/>
         <Route path="/register" element={<RegisterInsttuions/>}/>
         <Route path="/instituions" element={<Institutions/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
