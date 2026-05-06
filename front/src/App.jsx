import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CompGet from './components/CompGet'
import CompGetParam from './components/compGetParam'
import CompLogin from './components/CompLogin'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CompGet></CompGet>
    <CompGetParam/>
    

    </>
  )
}

export default App
