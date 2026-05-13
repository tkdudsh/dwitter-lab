import './App.css';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [like, setLike] = useState(0);
  const [data, setData] = useState({});  

  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  )
}


