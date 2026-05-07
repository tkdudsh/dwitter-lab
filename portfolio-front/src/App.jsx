import './App.css';
import { useState, useEffect } from 'react';
// import { fetchData } from './util/fetch.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [like, setLike] = useState(0);
  const [data, setData] = useState({});  
  useEffect(()=>{
    const loadData = async() => {
      const response = await fetch("http://localhost:5173/data/portfolio.json");
      const jsonData = await response.json();
      setData(jsonData);
    }
    loadData();
  }, []);
  
  return (
    <>
      <Header />
      <Outlet context={{ data: data?.content }}/> 
      <Footer />
    </>
  )
}


