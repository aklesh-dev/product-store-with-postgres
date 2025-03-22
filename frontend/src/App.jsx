import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";

const App = () => {
  const {theme} = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <section className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
      
      <Toaster/>
    </section>
  )
}

export default App;