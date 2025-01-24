import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { NavBar } from './NavBar/NavBar.jsx'
import { auth, db, provider } from './Firebase/firebase.js'
import { signInWithPopup } from 'firebase/auth'
import { MainRoutes } from './Routes/MainRoutes'

function App() {

  return (
    <>
      <NavBar />
        <MainRoutes />
    </>
  )
}

export default App
